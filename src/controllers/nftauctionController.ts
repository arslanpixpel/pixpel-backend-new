import express from "express";
import * as Auction from "../models/NftAuction";
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

export const createAuction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const auction = await Auction.createAuction(req.body);
    handleCreateResponse(res, auction, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const readAuction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const auction = await Auction.readAuction(parseInt(req.params.id));
    handleReadResponse(res, auction, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateAuction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const auction = await Auction.updateAuction(
      parseInt(req.params.id),
      req.body
    );
    handleUpdateResponse(res, auction, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteAuction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedCount = await Auction.deleteAuction(parseInt(req.params.id));
    handleDeleteResponse(res, deletedCount, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllAuctions = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const allAuctions = await Auction.getAllAuctions();
    handleGetAllResponse(res, allAuctions, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllAuctionsByNft = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const auctions = await Auction.getAllAuctionsByNft(parseInt(req.params.id));
    handleReadResponse(res, auctions, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const auctionResell = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const auctions = await Auction.getAllAuctionsByNft(parseInt(req.params.id));
    handleReadResponse(res, auctions, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};
