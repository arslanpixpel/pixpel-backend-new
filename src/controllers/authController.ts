import crypto from "crypto";
// import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import * as OTPAuth from "otpauth";
import { encode } from "hi-base32";
import * as Authentication from "../models/Authentication";
import { handleError } from "../helper/Responses";

// const prisma = new PrismaClient();

// const RegisterUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { name, email, password } = req.body;

//     await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: crypto.createHash("sha256").update(password).digest("hex"),
//       },
//     });

//     res.status(201).json({
//       status: "success",
//       message: "Registered successfully, please login",
//     });
//   } catch (error) {
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       if (error.code === "P2002") {
//         return res.status(409).json({
//           status: "fail",
//           message: "Email already exist, please use another email address",
//         });
//       }
//     }
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };

// const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { email, password } = req.body;

//     const user = await prisma.user.findUnique({ where: { email } });

//     if (!user) {
//       return res.status(404).json({
//         status: "fail",
//         message: "No user with that email exists",
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         otp_enabled: user.otp_enabled,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };

const generateRandomBase32 = () => {
  const buffer = crypto.randomBytes(15);
  const base32 = encode(buffer).replace(/=/g, "").substring(0, 24);
  return base32;
};

// const GenerateOTP = async (req: Request, res: Response) => {
//   try {
//     const { user_id } = req.body;

//     const user = await prisma.user.findUnique({ where: { id: user_id } });

//     if (!user) {
//       return res.status(404).json({
//         status: "fail",
//         message: "No user with that email exists",
//       });
//     }

//     const base32_secret = generateRandomBase32();

//     let totp = new OTPAuth.TOTP({
//       issuer: "codevoweb.com",
//       label: "CodevoWeb",
//       algorithm: "SHA1",
//       digits: 6,
//       secret: base32_secret,
//     });

//     let otpauth_url = totp.toString();

//     await prisma.user.update({
//       where: { id: user_id },
//       data: {
//         otp_auth_url: otpauth_url,
//         otp_base32: base32_secret,
//       },
//     });

//     res.status(200).json({
//       base32: base32_secret,
//       otpauth_url,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };

// const VerifyOTP = async (req: Request, res: Response) => {
//   try {
//     const { user_id, token } = req.body;

//     const message = "Token is invalid or user doesn't exist";
//     const user = await prisma.user.findUnique({ where: { id: user_id } });
//     if (!user) {
//       return res.status(401).json({
//         status: "fail",
//         message,
//       });
//     }

//     let totp = new OTPAuth.TOTP({
//       issuer: "codevoweb.com",
//       label: "CodevoWeb",
//       algorithm: "SHA1",
//       digits: 6,
//       secret: user.otp_base32!,
//     });

//     let delta = totp.validate({ token });

//     if (delta === null) {
//       return res.status(401).json({
//         status: "fail",
//         message,
//       });
//     }

//     const updatedUser = await prisma.user.update({
//       where: { id: user_id },
//       data: {
//         otp_enabled: true,
//         otp_verified: true,
//       },
//     });

//     res.status(200).json({
//       otp_verified: true,
//       user: {
//         id: updatedUser.id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         otp_enabled: updatedUser.otp_enabled,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };

// const ValidateOTP = async (req: Request, res: Response) => {
//   try {
//     const { user_id, token } = req.body;
//     const user = await prisma.user.findUnique({ where: { id: user_id } });

//     const message = "Token is invalid or user doesn't exist";
//     if (!user) {
//       return res.status(401).json({
//         status: "fail",
//         message,
//       });
//     }
//     let totp = new OTPAuth.TOTP({
//       issuer: "codevoweb.com",
//       label: "CodevoWeb",
//       algorithm: "SHA1",
//       digits: 6,
//       secret: user.otp_base32!,
//     });

//     let delta = totp.validate({ token, window: 1 });

//     if (delta === null) {
//       return res.status(401).json({
//         status: "fail",
//         message,
//       });
//     }

//     res.status(200).json({
//       otp_valid: true,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };

// const DisableOTP = async (req: Request, res: Response) => {
//   try {
//     const { user_id } = req.body;

//     const user = await prisma.user.findUnique({ where: { id: user_id } });
//     if (!user) {
//       return res.status(401).json({
//         status: "fail",
//         message: "User doesn't exist",
//       });
//     }

//     const updatedUser = await prisma.user.update({
//       where: { id: user_id },
//       data: {
//         otp_enabled: false,
//       },
//     });

//     res.status(200).json({
//       otp_disabled: true,
//       user: {
//         id: updatedUser.id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         otp_enabled: updatedUser.otp_enabled,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };

export const createDeveloperAuth = async (req: Request, res: Response) => {
  try {
    const {
      developer_id,
      email,
      name,
      otp_enabled,
      otp_verified,
      otp_ascii,
      otp_hex,
      otp_base32,
      otp_auth_url,
    } = req.body;

    const developerAuthData = {
      developer_id,
      email,
      name,
      otp_enabled,
      otp_verified,
      otp_ascii,
      otp_hex,
      otp_base32,
      otp_auth_url,
    };

    const developerAuth = await Authentication.createDeveloperAuth(
      developerAuthData
    );

    res.status(201).json({
      status: "success",
      data: developerAuth,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const createPlayerAuth = async (req: Request, res: Response) => {
  try {
    const {
      player_id,
      email,
      name,
      otp_enabled,
      otp_verified,
      otp_ascii,
      otp_hex,
      otp_base32,
      otp_auth_url,
    } = req.body;

    const playerAuthData = {
      player_id,
      email,
      name,
      otp_enabled,
      otp_verified,
      otp_ascii,
      otp_hex,
      otp_base32,
      otp_auth_url,
    };

    // Creating player authentication record
    const playerAuth = await Authentication.createPlayerAuth(playerAuthData);

    res.status(201).json({
      status: "success",
      data: playerAuth,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const generateOTP = async (req: Request, res: Response) => {
  try {
    const { user_id, userType } = req.body;

    const tableName = userType === "developer" ? "developerauth" : "playerauth";

    const { id, otp_base32 } = await Authentication.getUserOTPInfo(
      user_id,
      tableName
    );

    if (!id) {
      return res.status(404).json({
        status: "fail",
        message: "No user with that id exists",
      });
    }

    const base32_secret = generateRandomBase32();

    let totp = new OTPAuth.TOTP({
      issuer: "codevoweb.com",
      label: "CodevoWeb",
      algorithm: "SHA1",
      digits: 6,
      secret: base32_secret,
    });

    let otpauth_url = totp.toString();

    await Authentication.updateOTPInfo(
      tableName,
      user_id,
      otpauth_url,
      base32_secret
    );

    res.status(200).json({
      base32: base32_secret,
      otpauth_url,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// Function to verify OTP for a user
export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { user_id, token, userType } = req.body;

    const tableName = userType === "developer" ? "developerauth" : "playerauth";

    const { id, otp_base32, otp_enabled, otp_verified } =
      await Authentication.getUserOTPInfo(user_id, tableName);

    if (!id) {
      return res.status(404).json({
        status: "fail",
        message: "No user with that id exists",
      });
    }

    let totp = new OTPAuth.TOTP({
      issuer: "codevoweb.com",
      label: "CodevoWeb",
      algorithm: "SHA1",
      digits: 6,
      secret: otp_base32,
    });

    let delta = totp.validate({ token });

    if (delta === null) {
      return res.status(401).json({
        status: "fail",
        message: "Token is invalid",
      });
    }

    if (!otp_enabled || !otp_verified) {
      await Authentication.updateOTPStatus(tableName, user_id, true, true);
    }

    res.status(200).json({
      otp_verified: true,
      user: {
        id,
        otp_enabled: true,
        otp_verified: true,
      },
    });
  } catch (error) {
    handleError(error, res);
  }
};

// Function to validate OTP for a user
export const validateOTP = async (req: Request, res: Response) => {
  try {
    const { user_id, token, userType } = req.body;

    const tableName = userType === "developer" ? "developerauth" : "playerauth";

    const { otp_base32 } = await Authentication.getUserOTPInfo(
      user_id,
      tableName
    );

    if (!otp_base32) {
      return res.status(404).json({
        status: "fail",
        message: "No user with that id exists",
      });
    }

    let totp = new OTPAuth.TOTP({
      issuer: "codevoweb.com",
      label: "CodevoWeb",
      algorithm: "SHA1",
      digits: 6,
      secret: otp_base32,
    });

    let delta = totp.validate({ token, window: 1 });

    if (delta === null) {
      return res.status(401).json({
        status: "fail",
        message: "Token is invalid",
      });
    }

    res.status(200).json({
      otp_valid: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// Function to disable OTP for a user
export const disableOTP = async (req: Request, res: Response) => {
  try {
    const { user_id, userType } = req.body;

    const tableName = userType === "developer" ? "developerauth" : "playerauth";

    const { id } = await Authentication.getUserOTPInfo(user_id, tableName);

    if (!id) {
      return res.status(404).json({
        status: "fail",
        message: "No user with that id exists",
      });
    }

    await Authentication.updateOTPStatus(tableName, user_id, false, false);

    res.status(200).json({
      otp_disabled: true,
      user: {
        id,
        otp_enabled: false,
      },
    });
  } catch (error) {
    handleError(error, res);
  }
};

export default {
  createDeveloperAuth,
  createPlayerAuth,
  generateOTP,
  verifyOTP,
  validateOTP,
  disableOTP,
};
