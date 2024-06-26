import express from "express";
import * as Developer from "../models/Developer";
import {
  successMessage,
  errorMessage,
  handleGetAllResponse,
  handleError,
} from "../helper/Responses";
import {
  handleReadResponse,
  handleUpdateResponse,
  handleDeleteResponse,
} from "../helper/Responses";
const jwt = require("jsonwebtoken");
const secretKey = "3650"; // Replace with your actual secret key
import { createSession } from "../controllers/sessionController";

export const updateDeveloperTwoFA = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { TwoFA } = req.body;
    const developer = await Developer.updateTwoFa(
      parseInt(req.params.id),
      TwoFA
    );
    handleUpdateResponse(res, developer, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const readDeveloper = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const developer = await Developer.readDeveloper(parseInt(req.params.id));
    handleReadResponse(res, developer, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const readDeveloperByWallet = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (req.body.zetawallet === "" && req.body.wallet === "") {
      throw new Error("EmptyWallet not Found");
    }
    // const developer = await Developer.readDeveloperByWallet(
    //   req.body.wallet,
    //   req.body.zetawallet
    // );
    const developer = await Developer.readDeveloperByWallet(
      req.body.wallet || null,
      req.body.zetawallet || null
    );
    handleReadResponse(res, developer, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const readDeveloperByEmail = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const developer = await Developer.readDeveloperByEmail(req.body.email);
    handleReadResponse(res, developer, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateDeveloperImg = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const developer = await Developer.updateDeveloperImage(
      parseInt(req.params.id),
      req.body
    );
    handleUpdateResponse(res, developer, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateDeveloper = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const developer = await Developer.updateDeveloper(
      parseInt(req.params.id),
      req.body
    );
    handleUpdateResponse(res, developer, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteDeveloper = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedCount = await Developer.deleteDeveloper(
      parseInt(req.params.id)
    );
    handleDeleteResponse(res, deletedCount, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllDevelopers = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const allDevelopers = await Developer.getAllDevelopers();
    handleGetAllResponse(res, allDevelopers, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const signupDeveloper = async (req: any, res: express.Response) => {
  try {
    const developer = await Developer.signupDeveloper(req.body);

    // Generate JWT token
    const token = jwt.sign(
      { userId: developer.id, email: developer.email },
      secretKey,
      { expiresIn: "30d" } // You can adjust the expiration time
    );

    req.session.regenerate(function (err: any) {
      if (err) handleError(err, res);

      // store user information in session, typically a user id
      req.session.token = token;

      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err: any) {
        if (err) return handleError(err, res);
        res.status(201).send({
          message: "Developer signed up successfully",
          data: { developer, token },
        });
      });
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const signinDeveloper = async (req: any, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const developer = await Developer.signinDeveloper(email, password);

    if (developer) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: developer.id, email: developer.email, role: "developer" },
        secretKey,
        { expiresIn: "30d" } // You can adjust the expiration time
      );

      req.session.regenerate(function (err: any) {
        if (err) handleError(err, res);

        // store user information in session, typically a user id
        req.session.token = token;

        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err: any) {
          if (err) return handleError(err, res);

          res.status(200).send({
            message: "Developer signed in successfully",
            data: { developer, token },
          });
        });
      });
    } else {
      res.status(401).send({ error: "Invalid email or password" });
    }
  } catch (err) {
    handleError(err, res);
  }
};

export const updatePlayerPasswordController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, newPassword } = req.body;
    const player = await Developer.updatePlayerPassword(email, newPassword);
    res.status(200).json({ message: "Password updated successfully", player });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkEmailController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email } = req.body;
    const emailExists = await Developer.checkEmail(email);

    res.status(200).json({ exists: emailExists });
  } catch (err) {
    console.error("Error checking email:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateDeveloperDisableStatusController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = parseInt(req.params.id);
    const isDisable = req.body.isDisable; // Assuming isDisable field is sent in the request body
    const updatedCount = await Developer.updateDeveloperDisableStatus(
      id,
      isDisable
    );
    handleUpdateResponse(res, updatedCount, successMessage, errorMessage); // Implement handleUpdateResponse function accordingly
  } catch (err) {
    handleError(err, res); // Implement handleError function accordingly
  }
};
