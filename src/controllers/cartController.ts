import express from "express";
import * as Cart from "../models/Cart";
import { successMessage, errorMessage, handleGetAllResponse, handleError } from "../helper/Responses";
import { handleCreateResponse, handleReadResponse, handleDeleteResponse } from "../helper/Responses";

export const addToCart = async (req: express.Request, res: express.Response) => {
  try {
    const cart = await Cart.addToCart(req.body);
    handleCreateResponse(res, cart, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const readCart = async (req: express.Request, res: express.Response) => {
  try {
    const cartItems = await Cart.readCart(parseInt(req.params.cartId));
    handleReadResponse(res, cartItems, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const removeFromCart = async (req: express.Request, res: express.Response) => {
  try {
    const deletedCount = await Cart.removeFromCart(parseInt(req.params.cartId));
    handleDeleteResponse(res, deletedCount, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const moveToOrders = async (req: express.Request, res: express.Response) => {
  try {
    await Cart.moveToOrders(parseInt(req.params.cartId));
    res
      .status(200)
      .send({ message: successMessage, data: `Moved items from cart with ID: ${req.params.cartId} to orders` });
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllCart = async (_req: express.Request, res: express.Response) => {
  try {
    const allCartItems = await Cart.getAllCart();
    handleGetAllResponse(res, allCartItems, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};
