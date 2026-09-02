import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";
import {
    changePassword,
    login,
    logout,
    me,
    register,
    updateProfile,
    updateProfileImage
} from "../controller/auth.controller";

const router = Router();

router.post(
    "/register",
    upload.single("profileImage"),
    register
);
router.post("/login", login);
router.get("/me", authMiddleware, me);
router.post("/logout", authMiddleware, logout);
router.put("/profile", authMiddleware, updateProfile);
router.put("/change-password",
    authMiddleware,
    changePassword
);
router.put("/profile-image",
    authMiddleware,
    upload.single("profileImage"),
    updateProfileImage
);

export default router;