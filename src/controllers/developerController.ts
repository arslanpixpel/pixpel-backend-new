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
const jwt = require('jsonwebtoken');
const secretKey = "3650"; // Replace with your actual secret key

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
    const developer = await Developer.readDeveloperByWallet(req.body.wallet);
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

export const signupDeveloper = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const developer = await Developer.signupDeveloper(req.body);

    // Generate JWT token
    const token = jwt.sign(
      { userId: developer.id, email: developer.email },
      secretKey,
      { expiresIn: '1d' } // You can adjust the expiration time
    );

    res.status(201).send({
      message: "Developer signed up successfully",
      data: { developer, token },
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const signinDeveloper = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;
    const developer = await Developer.signinDeveloper(email, password);

    if (developer) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: developer.id, email: developer.email },
        secretKey,
        { expiresIn: '1d' } // You can adjust the expiration time
      );

      res.status(200).send({
        message: "Developer signed in successfully",
        data: { developer, token },
      });
    } else {
      res.status(401).send({ error: "Invalid email or password" });
    }
  } catch (err) {
    handleError(err, res);
  }
};
