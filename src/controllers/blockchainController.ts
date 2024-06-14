import express from "express";
import * as Blockchain from "../models/supportedBlockchian";

export const readBlockchain = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const blockchain = await Blockchain.readBlockchain(parseInt(req.params.id));
    handleReadResponse(
      res,
      blockchain,
      "Blockchain read successfully",
      "Blockchain not found"
    );
  } catch (err) {
    handleError(err, res);
  }
};

export const createBlockchain = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { logo, blockchain_name, symbol } = req.body;
    const newBlockchain = await Blockchain.createBlockchain({
      logo,
      blockchain_name,
      symbol,
    });
    handleReadResponse(
      res,
      newBlockchain,
      "Blockchain created successfully",
      "Blockchain creation failed"
    );
  } catch (err) {
    handleError(err, res);
  }
};

export const updateBlockchain = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = parseInt(req.params.id);
    const { logo, blockchain_name, symbol } = req.body;
    const updatedBlockchain = await Blockchain.updateBlockchain(id, {
      logo,
      blockchain_name,
      symbol,
    });
    handleReadResponse(
      res,
      updatedBlockchain,
      "Blockchain updated successfully",
      "Blockchain update failed"
    );
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteBlockchain = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await Blockchain.deleteBlockchain(id);
    handleReadResponse(
      res,
      deleted,
      "Blockchain deleted successfully",
      "Blockchain deletion failed"
    );
  } catch (err) {
    handleError(err, res);
  }
};

export const readAllBlockchains = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const blockchains = await Blockchain.readAllBlockchains();
    handleReadResponse(
      res,
      blockchains,
      "Blockchains read successfully",
      "No blockchains found"
    );
  } catch (err) {
    handleError(err, res);
  }
};

// Utility functions for handling responses and errors
const handleReadResponse = (
  res: express.Response,
  data: any,
  successMessage: string,
  errorMessage: string
) => {
  if (data) {
    res.status(200).json({ message: successMessage, data });
  } else {
    res.status(404).json({ message: errorMessage });
  }
};

const handleError = (err: any, res: express.Response) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
};
