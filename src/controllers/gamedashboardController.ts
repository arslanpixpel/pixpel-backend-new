import express from "express";
import * as Gamedashboard from "../models/Gamedashboard";
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

export const createGamedashboard = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const gamedashboard = await Gamedashboard.createGamedashboard(req.body);
    res
      .status(201)
      .send({ message: "Created Dashboard successfully", data: gamedashboard });
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllGamedashboard = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const allGamedashboards = await Gamedashboard.getAllGamedashboard();
    res.status(200).send({ data: allGamedashboards });
  } catch (err) {
    res.status(500).send({ data: err });
  }
};

export const getGamedashboardByDeveloperId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { developerId } = req.params;
    const dataByDeveloperId = await Gamedashboard.getGamedashboardByDeveloperId(
      developerId
    );
    res.status(200).send({ data: dataByDeveloperId });
  } catch (err) {
    handleError(err, res);
  }
};

export const getGamedashboardByWallet = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { developerWallet } = req.params;
    const dataByWallet = await Gamedashboard.getGamedashboardByWallet(
      developerWallet
    );
    res.status(200).send({ data: dataByWallet });
  } catch (err) {
    handleError(err, res);
  }
};
