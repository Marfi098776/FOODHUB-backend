import express, { Router } from "express"
import auth, { UserRole } from "../../middleware/auth";
import { reviewController } from "./review.controller";

const router = express.Router();

router.post(
    "/",
    auth(UserRole.CUSTOMER),
    reviewController.createReview
);

router.get(
    "/meal/:mealId",
    reviewController.getMealReviews
);


export const reviewRouter: Router = router;