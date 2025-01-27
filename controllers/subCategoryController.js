import subCategory from '../models/subCategory.js';
import category from '../models/category.js';

// Create Sub Category
export const createSubCategory = async (req, res) => {
    try {

        let cat;

        // creating subcategory object with the request body
        let subCat = new subCategory(req.body);

        // checking if category is provided in the request body and fetching its data
        if (!req.body.category)
            throw new Error("Category not provided");
        else {
            cat = await category.findById(req.body.category);
        }

        if (!req.body.taxApplicability) {
            console.log("Tax Applicability not provided, setting tax applicability as of category");
            subCat.taxApplicability = cat.taxApplicability;
        }
        if (!req.body.tax && subCat.taxApplicability) {
            console.log("Tax not provided, setting tax as of category");
            subCat.tax = cat.tax;
        }
        else if (subCat.taxApplicability == false) {
            subCat.tax = 0;
        }

        const savedSubCat = await subCat.save();
        res.status(201).json(savedSubCat);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error encountered while creating subCategory", error: err.message });
    }
};

// Search in Sub Categories
export const getSubCategories = async (req, res) => {
    try {
        // storing subCategory Id, subCategory Name and category Name from the request query
        
        const {page,limit,...more} = req.query;
        const subCategoryId = req.query.subCategoryId;
        const subCategoryName = req.query.subCategoryName;
        const categoryName = req.query.categoryName;

        // Conditional block to limit search fields
        if (Object.keys(more).length > 1)
            throw new Error("More than one search fields not allowed");

        // console.log(subCategoryId, subCategoryName, categoryName);

        let subCategories;

        // If no search field is provided then return all subCategories
        if (!subCategoryId && !subCategoryName && !categoryName) {
            subCategories = await subCategory.find({}, { "name": 1 }).skip((page-1)*limit).limit(limit);
            if(!subCategories)
                throw new Error("No subCategories found");
        }
        else {
            // search subCategory by category Name
            if (categoryName) {
                const cat = await category.findOne({ "name": categoryName },{_id:1});
                if (!cat)
                    throw new Error("No category with such name exists");
                else {
                    subCategories = await subCategory.find({ "category": cat._id }, { "name": 1 }).skip((page-1)*limit).limit(limit);
                }
            }
            // search subCategory by Sub Category Id
            else if (subCategoryId) {
                subCategories = await subCategory.find({ "_id": subCategoryId }).populate('category','name');
                if(!subCategories)
                    throw new Error("No subCategories found");
            }
            // search subCategory by Sub Category Name
            else {
                subCategories = await subCategory.find({ "name": subCategoryName }).populate('category','name');
                if(!subCategories)
                    throw new Error("No subCategories found");
            }
        }
        res.status(200).json(subCategories);
    } catch (err) {
        res.status(400).json({ message: "Error encountered while finding subCategories", error: err.message });
    }
};


// Edit Sub Category
export const editSubCategory = async (req, res) => {
    try {

        let {deletedAt,updatedAt,createdAt,...updateData} = req.body;

        updatedAt = Date.now();

        // updating subCategory with the request body
        const subCat = await subCategory.findByIdAndUpdate(req.params.subCategoryId, updateData, { new: true });
        
        // error handling if subCategory not found
        if (!subCat) {
            return res.status(404).json({ error: 'Sub Category not found' });
        }

        res.status(200).json(subCat);
    } catch (err) {
        res.status(400).json({ message: "Error encountered while updating Sub Category", error: err.message });
    }
};
