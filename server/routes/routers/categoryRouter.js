import express from "express";
import {allowedTo, isAuth} from "../../middleware/auth.middleware.js";
import {USER_ROLES} from "../../constants/index.js";
import {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateSingleCategory,
    deleteSingleCategory,
    uploadCategoryImage,
    resizeCategoryImage,
} from "../../controller/categoryController.js";
import {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator,
} from "../../validators/category.validator.js";

const router = express.Router();

router
    .route("/")
    .get(getAllCategories)
    .post(
        isAuth,
        allowedTo(USER_ROLES.ADMIN),
        uploadCategoryImage,
        resizeCategoryImage,
        createCategoryValidator,
        createCategory
    );
router
    .route("/:id")
    .get(getCategoryValidator, getSingleCategory)
    .patch(
        isAuth,
        allowedTo(USER_ROLES.ADMIN),
        uploadCategoryImage,
        resizeCategoryImage,
        updateCategoryValidator,
        updateSingleCategory
    )
    .delete(
        isAuth,
        allowedTo(USER_ROLES.ADMIN),
        deleteCategoryValidator,
        deleteSingleCategory
    );

export default router;