import express from "express";
import * as Transaction from "../models/NfTransection";
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

export const createTransaction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const transaction = await Transaction.createTransaction(req.body);
    handleCreateResponse(res, transaction, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const readTransaction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const transaction = await Transaction.readTransaction(
      parseInt(req.params.id)
    );
    handleReadResponse(res, transaction, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateTransaction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const transaction = await Transaction.updateTransaction(
      parseInt(req.params.id),
      req.body
    );
    handleUpdateResponse(res, transaction, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteTransaction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedCount = await Transaction.deleteTransaction(
      parseInt(req.params.id)
    );
    handleDeleteResponse(res, deletedCount, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllNftTransactions = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const allNftTransactions = await Transaction.getAllNftTransactions();
    handleGetAllResponse(res, allNftTransactions, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};
