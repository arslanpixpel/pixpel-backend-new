import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
require("dotenv").config();

export const checkCookieMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let jwtToken;
  const authAdminHeader = req.headers.authorization;
  if (authAdminHeader) {
    const bearer = authAdminHeader.split(" "); // for bearer auth
    jwtToken = bearer[1];
  }

  if (!jwtToken) {
    res.status(200).send({ message: "Token is expired" });
  }

  try {
    const decoded: any = jwt.verify(jwtToken, process.env.JWT_KEY);
    // console.log(decoded);
    next();
  } catch (error) {
    res.status(500).send({ error: error });
    // console.log(error);
  }
};
