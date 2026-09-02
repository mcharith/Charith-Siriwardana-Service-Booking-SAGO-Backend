import { Router } from "express";

import {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
} from "../controller/service.controller";

import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.get("/", getServices);

router.get("/:id", getServiceById);

router.post(
    "/",
    authMiddleware,
    createService
);

router.put(
    "/:id",
    authMiddleware,
    updateService
);

router.delete(
    "/:id",
    authMiddleware,
    deleteService
);

export default router;