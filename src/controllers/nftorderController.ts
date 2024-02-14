import express from "express";
import * as Order from "../models/NftOrder";
import { successMessage, errorMessage, handleGetAllResponse, handleError } from "../helper/Responses";
import {
  handleCreateResponse,
  handleReadResponse,
  handleUpdateResponse,
  handleDeleteResponse,
} from "../helper/Responses";

export const createOrder = async (req: express.Request, res: express.Response) => {
  try {
    const order = await Order.createOrder(req.body);
    handleCreateResponse(res, order, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const readOrder = async (req: express.Request, res: express.Response) => {
  try {
    const order = await Order.readOrder(parseInt(req.params.id));
    handleReadResponse(res, order, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateOrder = async (req: express.Request, res: express.Response) => {
  try {
    const order = await Order.updateOrder(parseInt(req.params.id), req.body);
    handleUpdateResponse(res, order, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteOrder = async (req: express.Request, res: express.Response) => {
  try {
    const deletedCount = await Order.deleteOrder(parseInt(req.params.id));
    handleDeleteResponse(res, deletedCount, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllNftOrders = async (_req: express.Request, res: express.Response) => {
  try {
    const allNftOrders = await Order.getAllNftOrders();
    handleGetAllResponse(res, allNftOrders, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};
