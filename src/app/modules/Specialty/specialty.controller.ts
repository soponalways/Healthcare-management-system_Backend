import { NextFunction, Request, RequestHandler, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import catchAsync from "../../shared/catchAsync";

const createSpecialty = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await SpecialtyService.createSpecialty(payload);

    return res.status(201).json({
      success: true,
      message: "Specialty created successfully",
      data: result,
    });
})


const getAllSpecialties = catchAsync(async (req: Request, res: Response) => {
        const result = await SpecialtyService.getAllSpecialties(); 
        return res.status(200).json({
            success: true, 
            message: "Specialties fetched successfully", 
            data: result
        })
    })


const updateSpecialty = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
        const payload = req.body; 
        const result = await SpecialtyService.updateSpecialty(id as string, payload); 
        return res.status(200).json({
            success: true, 
            message: "Specialty update successfully", 
            data: result
        }); 
})

const deleteSpecialty = catchAsync(async ( req: Request, res: Response) => {
    const { id } = req.params; 
        const result = await SpecialtyService.deleteSpecialty(id as string); 
        return res.status(200).json({
            success: true, 
            message: "Specialty deleted successfully", 
            data: result
        }); 
}
)



export const SpecialtyController = {
  createSpecialty,
  getAllSpecialties, 
  deleteSpecialty, 
  updateSpecialty
};
