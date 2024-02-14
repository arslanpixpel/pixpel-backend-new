import express, { Request, Response, Router } from "express";
import nodemailer from "nodemailer";
import { query } from "../db";
import * as Developer from "../models/Developer";

// Nodemailer setup
const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // user: 'arslandev170@gmail.com',
    // pass: 'uevf bgmr efwc oczz',
    user: "support@pixpel.io",
    pass: "rbhh prlv qrdi mykh",
  },
});

const route = Router();

route.post("/verify-email", async (req: Request, res: Response) => {
  const { id, type } = req.body;

  try {
    const updatedDeveloper = await query(
      `UPDATE ${type}s SET verified = $1 WHERE id = $2 RETURNING *`,
      [true, id]
    );

    if (updatedDeveloper) {
      res.json({
        message: "Email verification successful",
        developer: updatedDeveloper,
      });
    } else {
      res.status(404).json({ error: "Developer not found" });
    }
  } catch (error) {
    console.error("Error verifying email", error);
    res.status(500).json({ error: "Error verifying email" });
  }
});

route.post("/send-otp", async (req: Request, res: Response) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const mailOptions = {
    from: "pixpelsupport@pixpel.io",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is: ${otp}`,
  };

  emailTransporter.sendMail(mailOptions, (error: any) => {
    if (error) {
      console.error("Error sending OTP email", error);
      return res.status(500).json({ error: "Error sending OTP email" });
    }
    res.json({ message: "OTP sent to email successfully", otp });
  });
});

export default route;
