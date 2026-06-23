import express, { Router } from "express"
import auth, { UserRole } from "../../middleware/auth";
import { providerController } from "./providerProfile.controller";


const router = express.Router();

router.post(
    "/profile",
    auth(UserRole.PROVIDER),
    providerController.createProfile
)

router.get(
    "/profile",
    auth(UserRole.PROVIDER),
    providerController.getMyProfile
);
router.get(
    "/profile/:id",
    providerController.getSingleProvider
);

router.get(
    "/orders",
    auth(UserRole.PROVIDER),
    providerController.getProviderOrders
);

router.get(
    "/dashboard",
    auth(UserRole.PROVIDER),
    providerController.getDashboardStats
);

router.patch(
    "/profile",
    auth(UserRole.PROVIDER),
    providerController.updateProfile
);



export const ProviderRoute: Router = router;