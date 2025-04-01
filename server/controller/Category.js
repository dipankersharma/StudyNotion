const Category = require("../model/category");
const Course = require("../model/courses");
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

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
      .populate({
        path: "courses",
        match: { state: "published" },
        populate: "ratingAndReviews",
      })
      .exec();
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Handle the case when there are no courses
    if (category.courses.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    // find courses for different categories
    const differentCategory = await Category.find({ _id: { $ne: categoryId } })
      .populate("courses")
      .exec();

    const randomCategory = await Category.findOne(
      differentCategory[getRandomInt(differentCategory.length)]._id
    ).populate({
      path: "courses",
      match: { status: "Published" },
    });

    if (!randomCategory) {
      return res.status(404).json({
        success: false,
        message: "No different category found",
      });
    }
    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);
    // console.log("mostSellingCourses COURSE", mostSellingCourses)
    res.status(200).json({
      success: true,
      data: {
        category,
        differentCategory,
        mostSellingCourses,
      },
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
