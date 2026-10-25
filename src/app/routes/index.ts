import { Router } from "express";
import { SpecialtyRoute } from "../modules/Specialty/specialty.route";

const router = Router(); 

router.use("/specialties", SpecialtyRoute); 

const IndexRoutes = router; 

export default IndexRoutes;