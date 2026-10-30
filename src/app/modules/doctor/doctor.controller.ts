import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { doctorService } from "./doctor.service";
import sendResponse from "../../shared/sendResponse";
import status from "http-status";
import { IUpdateDoctorsPayload } from "./doctor.interface";

const getAllDoctors = catchAsync(async(req: Request, res: Response) => {
    const result = await doctorService.getAllDoctors(); 

    sendResponse(res, {
        httpStatusCode: status.OK, 
        message: "all doctors fetched successfully", 
        success: true, 
        data: result
    })
}); 

const getDoctorById = catchAsync(async(req: Request, res: Response) => {
    const {id } = req.params; 
    const result = await doctorService.getDoctorById(id as string); 

    sendResponse(res, {
        httpStatusCode: status.OK, 
        message: "doctor fetched successfully", 
        success: true, 
        data: result
    })
}); 

const updateDoctorId = catchAsync(async(req: Request, res: Response) => {
    const {id } = req.params; 
    const payload : IUpdateDoctorsPayload = req.body; 
    const result = await doctorService.updateDoctorById(id as string, payload); 

    sendResponse(res, {
        httpStatusCode: status.OK, 
        message: "Doctor Update Successfully", 
        success: true, 
        data: result
    })
});

const deleteDoctorById = catchAsync(async(req: Request, res: Response) => {
    const {id } = req.params; 
    const result = await doctorService.deleteDoctorById(id as string); 

    sendResponse(res, {
        httpStatusCode: status.OK, 
        message: "doctor delete successfully", 
        success: true, 
        data: result
    })
}); 

export const doctorsController = {
    getAllDoctors, 
    getDoctorById, 
    updateDoctorId, 
    deleteDoctorById
}