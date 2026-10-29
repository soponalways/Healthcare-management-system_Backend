import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import status from "http-status";

const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body; 
    const data = await userService.createDoctor(payload); 
    return sendResponse(res, {
        httpStatusCode: status.CREATED, 
        message: "Successfully registerd Doctor to our platform ", 
        success: true, 
        data
    }); 
})