import { Request, Response, NextFunction } from "express";
import { query } from "../db";
import { getSessionByIp } from "../controllers/sessionController";
const jwt = require("jsonwebtoken");
require("dotenv").config();

// export const checkCookieMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   let jwtToken;
//   const authAdminHeader = req.headers.authorization;
//   if (authAdminHeader) {
//     const bearer = authAdminHeader.split(" "); // for bearer auth
//     jwtToken = bearer[1];
//   }

//   if (!jwtToken) {
//     res.status(200).send({ message: "Token is expired" });
//   }

//   try {
//     const decoded: any = jwt.verify(jwtToken, process.env.JWT_KEY);
//     // console.log(decoded);
//     next();
//   } catch (error) {
//     res.status(500).send({ error: error });
//     // console.log(error);
//   }
// };

export const checkCookieMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    let jwtToken;

    if (req.cookies.token) jwtToken = req.cookies.token;

    if (!jwtToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token is missing" });
    }

    // console.log("middleware working");

    const decoded: any = jwt.verify(jwtToken, process.env.JWT_KEY);
    // console.log("Decoded Token:", decoded); // Log decoded token

    const { email, role, exp } = decoded;

    if (!email || !role || !exp) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token payload" });
    }

    let queryTable;
    if (role === "player") {
      queryTable = "players";
    } else if (role === "developer") {
      queryTable = "developers";
    } else {
      return res.status(401).json({ message: "Unauthorized: Invalid role" });
    }

    // Check if the decoded email exists in the appropriate table
    const playerQuery = `SELECT * FROM ${queryTable} WHERE email = $1`;
    const { rows } = await query(playerQuery, [email]);
    // console.log(rows, "Player Query Rows");
    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid credentials" });
    }

    // Verify token expiry
    if (Date.now() >= exp * 1000) {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }

    req.user = rows[0];

    // Token is valid, proceed to next middleware
    next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return res.status(500).json({ "Error in middleware": error });
  }
};
