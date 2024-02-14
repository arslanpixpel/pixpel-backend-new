import express from "express";
import * as TokenReleaseData from "../models/Tokenrelease";
import {
  handleCreateResponse,
  handleReadResponse,
  handleUpdateResponse,
  handleDeleteResponse,
  handleGetAllResponse,
  errorMessage,
  successMessage,
  handleError,
} from "../helper/Responses";

export const createTokenReleaseData = async (req: express.Request, res: express.Response) => {
  try {
    const data = await TokenReleaseData.createTokenReleaseData(req.body);
    handleCreateResponse(res, data, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const readTokenReleaseData = async (req: express.Request, res: express.Response) => {
  try {
    const foundData = await TokenReleaseData.readTokenReleaseData(parseInt(req.params.id));
    handleReadResponse(res, foundData, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateTokenReleaseData = async (req: express.Request, res: express.Response) => {
  try {
    const updatedData = await TokenReleaseData.updateTokenReleaseData(parseInt(req.params.id), req.body);
    handleUpdateResponse(res, updatedData, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteTokenReleaseData = async (req: express.Request, res: express.Response) => {
  try {
    const deletedCount = await TokenReleaseData.deleteTokenReleaseData(parseInt(req.params.id));
    handleDeleteResponse(res, deletedCount, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllTokenReleaseData = async (_req: express.Request, res: express.Response) => {
  try {
    const allData = await TokenReleaseData.getAllTokenReleaseData();
    handleGetAllResponse(res, allData, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};
