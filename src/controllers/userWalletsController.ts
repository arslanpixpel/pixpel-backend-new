import * as UserWallets from "../models/UserWallets";
import express from "express";
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

export const createWallet = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const createWallet = await UserWallets.createWallet(req.body);
    handleReadResponse(res, createWallet, successMessage, errorMessage);
  } catch (e: any) {
    handleError(e, res);
  }
};

export const getAllWalletsAndAccounts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const getWallet = await UserWallets.getAllWalletsAndAccounts();
    handleReadResponse(res, getWallet, successMessage, errorMessage);
  } catch (e: any) {
    handleError(e, res);
  }
};

export const getDeveloperById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId } = req.params;
    const getAllData = await UserWallets.getWalletByDeveloper(parseInt(userId));
    handleReadResponse(res, getAllData, successMessage, errorMessage);
  } catch (e: any) {
    handleError(e, res);
  }
};

export const getDevByWallet = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { wallet } = req.params;
    const getWallet = await UserWallets.getDeveloperByWallet(wallet);
    handleReadResponse(res, getWallet, successMessage, errorMessage);
  } catch (e: any) {
    handleError(e, res);
  }
};

export const deleteWalletByUserId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId } = req.params;
    const getWallet = await UserWallets.deleteDeveloperWalletById(
      parseInt(userId)
    );
    handleReadResponse(res, getWallet, successMessage, errorMessage);
  } catch (e: any) {
    handleError(e, res);
  }
};
