import subCategory from '../models/subCategory.js';
import category from '../models/category.js';
import item from '../models/items.js';

// Create Sub Category
export const createItem = async (req, res) => {
    try {
        if (!req.body.category && !req.body.subCategory) {
            throw new Error("Category or SubCategory of item is required");
        }

        let subCat = req.body.subCategory;
        let cat = req.body.category;

        // creating subcategory object with the request body
        let createdItem = new item(req.body);

        if (subCat) {
            const subCategoryData = await subCategory.findById(subCat);

            if(!subCategoryData)
                throw new Error("SubCategory not found");

            // if category is not provided in the request body, set it as provided in subcategory
            if (!cat) {
                createdItem.category = subCategoryData.category;
            }


            // category of item and subCategory checking
            if (String(createdItem.category) != String(subCategoryData.category)) {
                throw new Error("Category of item and subCategory do not match");
            }

            // if taxApplicability is not provided in the request body, set it as of subCategory
            if (!req.body.taxApplicability) {
                createdItem.taxApplicability = subCategoryData.taxApplicability;
            }

            // if item is eligible for taxing and tax is not provided in the request body, set it as of subCategory
            if (createdItem.taxApplicability && !req.body.tax) {
                createdItem.tax = subCategoryData.tax;
            }
        }
        // if subcategory is not provided in the request body, set it as provided in category
        else {
            const categoryData = await category.findById(cat);

            if(!categoryData)
                throw new Error("Category not found");
            if (!req.body.taxApplicability) {
                createdItem.taxApplicability = categoryData.taxApplicability;
            }
            // if item is eligible for taxing and tax is not provided in the request body, set it as of subCategory
            if (createdItem.taxApplicability && !req.body.tax) {
                createdItem.tax = categoryData.tax;
            }
        }

        console.log(createdItem);


        const savedItem = await createdItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error encountered while adding Item data", error: err.message });
    }
};

// Search in Sub Categories
export const getItems = async (req, res) => {
    try {
        // storing item Id,item Name, subCategory Name and category Name from the request query

        const {page,limit,...more}= req.query;
        const { itemId, itemName, subCategoryName, categoryName } = more;

        // Conditional block to limit search fields
        if (Object.keys(more).length > 1)
            throw new Error("More than one search fields not allowed");

        let itemData;
        if (itemId) {
            itemData = await item.findById(itemId).populate('category').populate('subCategory');
        }
        else if (itemName) {
            itemData = await item.findOne({ name: itemName }).populate('category').populate('subCategory');

        }
        else if (subCategoryName) {
           const subCatId = await subCategory.findOne({ name: subCategoryName },{name:1});
            if(!subCatId)
                throw new Error("SubCategory not found");
            itemData = await item.find({ subCategory: subCatId },{name:1}).skip((page-1)*limit).limit(limit);
        }
        else if (categoryName) {
            console.log(categoryName);
            const catId = await category.findOne({ name: categoryName });
            if(!catId)
                throw new Error("Category not found");
            itemData = await item.find({ category: catId }, { name: 1 }).skip((page-1)*limit).limit(limit);
        }
        else {
            itemData = await item.find({}, { name: 1 }).skip((page-1)*limit).limit(limit);
        }

        if (!itemData) {
            throw new Error("Item not found");
        }

        res.status(200).json(itemData);
    } catch (err) {
        res.status(400).json({ message: "Error encountered while finding Item/s", error: err.message });
    }
};


// Edit Sub Category
export const editItem = async (req, res) => {
    try {

        // updating subCategory with the request body
        let {discount,baseAmount,totalAmount,updatedAt,createdAt,deletedAt,...rest} = req.body;

        const catId= rest.category;
        const subCatId = rest.subCategory;
        const itemData = await item.findById(req.params.itemId);

        // setting the update date as the request timing and date
        updatedAt = Date.now();
        
        // if catergory id or subCategory id is provided in the request body
        if((catId || subCatId) && (subCatId!=""))
        {
            const subCatData = await subCategory.findById(subCatId);
            if(!subCatData)
                throw new Error("SubCategory with this id not found");
            else if(!catId)
            {
                if(String(itemData.category) != String(subCatData.category))
                {
                    throw new Error("Subcategory added is not of the same category as the item, edit category as well");
                }
            }
            else if(String(subCatData.category) != String(catId))
                throw new Error("Category of item dosen't have any item with this subCategory");
            
        }

        if(discount || baseAmount || totalAmount)
        {
            discount = discount || itemData.discount;
            baseAmount = baseAmount || itemData.baseAmount;

            if(!totalAmount)
            {
                totalAmount = baseAmount - discount;
            }
            else if(totalAmount != baseAmount - discount)
                throw new Error("Total amount must be equal to baseAmount - discount");
        }

        // error handling if subCategory not found
        if (!itemData) {
            return res.status(404).json({ error: 'Sub Category not found' });
        }
        itemData.set({totalAmount,baseAmount,discount,...rest});
        const savedData = await itemData.save();

        res.status(200).json(savedData);
    } catch (err) {
        res.status(400).json({ message: "Error encountered while updating Item Data", error: err.message });
    }
};

export const searchItem = async(req,res)=>{
    try{
        const itemName = req.query.itemName;
        console.log(itemName)
        // using mongoDB pattern matching to search for item
        const foundResults = await item.find({name:{$regex: itemName, $options: 'i'}});


        // error handling if no item found
        if(!foundResults)
            throw new Error("No item found with this name");

        res.status(200).json({foundResults});
    }catch(err){
        res.status(400).json({ message: "Error encountered while searching Item Data", error: err.message });
    }
}
