import { Router } from "express";
import { doctorsController } from "./doctor.controller";

const router = Router(); 

router.get("/", doctorsController.getAllDoctors); 
router.get("/:id", doctorsController.getDoctorById); 
router.patch("/:id", doctorsController.updateDoctorId); 
router.delete("/:id", doctorsController.deleteDoctorById); 


export const doctorsRoutes = router; 