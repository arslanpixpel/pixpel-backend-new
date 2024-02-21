import { Request, Response } from "express";
import * as NftMarket from "../models/NftMarket";
import {
  successMessage,
  errorMessage,
  handleCreateResponse,
  handleReadResponse,
  handleUpdateResponse,
  handleDeleteResponse,
  handleGetAllResponse,
  handleError,
} from "../helper/Responses";

export const createNftMarket = async (req: Request, res: Response) => {
  try {
    const nftMarket = await NftMarket.createNftMarket(req.body);
    handleCreateResponse(res, nftMarket, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const readNftMarket = async (req: Request, res: Response) => {
  try {
    const nftMarket = await NftMarket.readNftMarket(parseInt(req.params.id));
    handleReadResponse(res, nftMarket, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateNftMarket = async (req: Request, res: Response) => {
  try {
    const nftMarket = await NftMarket.updateNftMarket(
      parseInt(req.params.id),
      req.body
    );
    handleUpdateResponse(res, nftMarket, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteNftMarket = async (req: Request, res: Response) => {
  try {
    const deletedCount = await NftMarket.deleteNftMarket(
      parseInt(req.params.id)
    );
    handleDeleteResponse(res, deletedCount, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllNftMarkets = async (_req: Request, res: Response) => {
  try {
    const allNftMarkets = await NftMarket.getAllNftNftMarkets();
    handleGetAllResponse(res, allNftMarkets, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};
