import express from "express";
import * as Bidding from "../models/NfBidding";
import {
  successMessage,
  errorMessage,
  handleGetAllResponse,
  handleError,
} from "../helper/Responses";
import {
  handleCreateResponse,
  handleReadResponse,
  handleUpdateResponse,
  handleDeleteResponse,
} from "../helper/Responses";

export const createBidding = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const bidding = await Bidding.createBidding(req.body);
    handleCreateResponse(res, bidding, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const readBidding = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const bidding = await Bidding.readBidding(parseInt(req.params.id));
    handleReadResponse(res, bidding, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateBidding = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const bidding = await Bidding.updateBidding(
      parseInt(req.params.id),
      req.body
    );
    handleUpdateResponse(res, bidding, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteBidding = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedCount = await Bidding.deleteBidding(parseInt(req.params.id));
    handleDeleteResponse(res, deletedCount, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllBiddings = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const allBiddings = await Bidding.getAllBiddings();
    handleGetAllResponse(res, allBiddings, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllBiddingsByAuction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const biddings = await Bidding.getAllBiddingsByAuction(
      parseInt(req.params.id)
    );
    handleReadResponse(res, biddings, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllBiddingsWinnerByAuction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const biddings = await Bidding.getAllBiddingsWinnerByAuction(
      parseInt(req.params.id)
    );
    handleReadResponse(res, biddings, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllBiddingsWinners = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const biddings = await Bidding.getAllBiddingsWinners();
    handleReadResponse(res, biddings, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};
