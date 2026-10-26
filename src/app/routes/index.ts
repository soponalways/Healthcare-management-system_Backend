import { Router } from "express";
import { SpecialtyRoute } from "../modules/Specialty/specialty.route";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router(); 

router.use("/auth", AuthRoutes);
router.use("/specialties", SpecialtyRoute); 

const IndexRoutes = router; 

export default IndexRoutes;