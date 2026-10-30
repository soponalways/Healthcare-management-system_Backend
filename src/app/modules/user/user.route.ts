import { Router } from "express";
import { userController } from "./user.controller";

const router = Router(); 

router.post("/create-doctor", userController.createDoctor); 
// router.post("/create-admin", userController.createDoctor); 
// router.post("/create-superAdmin", userController.createDoctor); 


export const userRoutes = router; 
