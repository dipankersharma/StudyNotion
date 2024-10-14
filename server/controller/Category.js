const Category = require("../model/category");
const Course = require("../model/courses");

exports.createCategory = async (req, res) => {
  try {
    // fetch data
    const { name, description } = req.body;
    // validate data
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // create new tag
    const category = await Category.create({
      name: name,
      description: description,
    });

    console.log(category);

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error in creating tag", error);
    return res.status(500).json({
      success: false,
      message: "Server Error while creating Category",
      error: error.message,
    });
  }
};

// get all tags

exports.getAllcategories = async (req, res) => {
  try {
    const categories = await Category.find(
      {},
      { name: true, description: true }
    );
    return res.status(200).json({
      success: true,
      message: "Tags fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error("Error in fetching tags", error);
    return res.status(500).json({
      success: false,
      message: "Server Error while fetching tags",
      error: error.message,
    });
  }
};

// categories page details

exports.getCategoryDetails = async (req, res) => {
  try {
    const { categoryId } = req.params;
    // const _id = req.body;
    const category = await Category.findById(categoryId)
      .populate("courses")
      .exec();
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // find courses for different categories
    const differentCategory = await Category.find({ _id: { $ne: _id } })
      .populate("courses")
      .exec();

    if (!differentCategory) {
      return res.status(404).json({
        success: false,
        message: "No different category found",
      });
    }
    // most seller courses
    const mostPopularCourses = await Course.find({})
      .sort({ studentsEnroll: -1 })
      .limit(10);

    if (!mostPopularCourses) {
      return res.status(404).json({
        success: false,
        message: "No most popular courses found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category details fetched successfully",
      data: { category, differentCategory, mostPopularCourses },
    });
  } catch (error) {
    console.error("Error in fetching category details", error);
    return res.status(500).json({
      success: false,
      message: "Server Error while fetching category details",
      error: error.message,
    });
  }
};
