import Category from '../models/category.js';

// Create Category
export const createCategory = async (req, res) => {
  try {

    // excluding timestamps field to avoid misuse
    const {createdAt,uodatedAt,deletedAt,...creationData} = req.body;
    const category = new Category(creationData);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: "Error encountered while creating category", error: err });
  }
};

// Get All Categories
export const getCategories = async (req, res) => {
  try {

    const { page,limit,...more } = req.query;

    const categoryName = more.categoryName;
    const categoryId = more.categoryId;

    // Conditional block to limit search fields
    if (Object.keys(more).length > 1) {
      throw new Error("More than one search fields not allowed");
    }
    let categories;
    if (categoryName) {
      categories = await Category.findOne({ name: categoryName });
      if(!categories)
        throw new Error("No category with such name exists");
    }
    else if (categoryId) {
      categories = await Category.findById( categoryId );
      if(!categories)
        throw new Error("No category with such ID exists");
    }
    else {
      // adding pagenation to increase the response speed
      categories = await Category.find({}, { "name": 1}).skip((page-1)*limit).limit(limit);
    }
    if (categories.length == 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({ message: "Error encountered while getting all categories", error: err.message });
  }
};



// Edit Category
export const EditCategory = async (req, res) => {
  try {

    let {createdAt,deltedAt,updatedAt,_v,...updateFields} = req.body;
console.log(updateFields);
    const category = await Category.findByIdAndUpdate(req.params.categoryId,updateFields, { new: true });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ message: "Error encountered while updating category", error: err.message });
  }
};
