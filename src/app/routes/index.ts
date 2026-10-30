import { Router } from "express";
import { SpecialtyRoute } from "../modules/Specialty/specialty.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { doctorsRoutes } from "../modules/doctor/doctor.route";

const router = Router(); 

router.use("/auth", AuthRoutes);
router.use("/specialties", SpecialtyRoute); 
router.use("/user", userRoutes); 
router.use("/doctors", doctorsRoutes)

const IndexRoutes = router; 

export default IndexRoutes;