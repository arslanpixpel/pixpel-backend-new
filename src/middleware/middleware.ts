import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
require("dotenv").config();

export const checkCookieMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtToken = req.headers.jwtToken;

  if (!jwtToken) {
    res.status(200).send({ message: "Token is expired" });
  }

  try {
    const decoded: any = jwt.verify(jwtToken, process.env.JWT_KEY);
    // console.log(decoded);
    next();
  } catch (error) {
    console.log(error);
  }
};
