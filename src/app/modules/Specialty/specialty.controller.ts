import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";

const createSpecialty = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await SpecialtyService.createSpecialty(payload);

    return res.status(201).json({
      success: true,
      message: "Specialty created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create specialty",
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
};

const getAllSpecialties = async (req: Request, res: Response) => {
    try {
        const specialties = await SpecialtyService.getAllSpecialties();
        return res.status(200).json({
            success: true,
            message: "Specialties fetched successfully",
            data: specialties,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch specialties",
            error:
                error instanceof Error ? error.message : "An unexpected error occurred",
        });
    }
}


const updateSpecialty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const payload = req.body; 
        const result = await SpecialtyService.updateSpecialty(id as string, payload); 
        return res.status(200).json({
            success: true, 
            message: "Specialty update successfully", 
            data: result
        }); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "Failed to update specialty", 
            error: error instanceof Error ? error.message : "An unexpected error occurred"
        })
    }
}

const deleteSpecialty = async ( req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        const result = await SpecialtyService.deleteSpecialty(id as string); 
        return res.status(200).json({
            success: true, 
            message: "Specialty deleted successfully", 
            data: result
        }); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "Failed to delete specialty", 
            error: error instanceof Error ? error.message : "An unexpected error occurred"
        });
    }
}




export const SpecialtyController = {
  createSpecialty,
  getAllSpecialties, 
  deleteSpecialty, 
  updateSpecialty
};
