import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch",
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };
};

export default catchAsync;
