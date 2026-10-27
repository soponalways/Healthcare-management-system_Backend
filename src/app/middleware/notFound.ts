import { Request, Response } from "express";
import status from "http-status";

export const notFound = async (req: Request, res: Response) => {
    return res.status(status.NOT_FOUND).json({
        success: false , 
        message: `Route ${req.originalUrl} not found`, 
        ipAddress: req.ip, 
        host: req.host, 
        subdomain: req.subdomains, 
        
    })
}