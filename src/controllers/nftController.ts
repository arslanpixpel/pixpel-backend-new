import express from "express";
import * as Nft from "../models/Nft";
import {
  handleCreateResponse,
  handleReadResponse,
  handleUpdateResponse,
  handleDeleteResponse,
  handleGetAllResponse,
  successMessage,
  errorMessage,
  handleError,
} from "../helper/Responses";
import * as NftMarket from "../models/NftMarket";
import { createTransaction } from "../models/NfTransection";

export const createNft = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const nft = await Nft.createNft(req.body);
    if (!nft) throw new Error("Failed to create the NFT");
    const listnftpaytload = {
      nft_id: nft.id,
      listing: true,
      seller: nft.primary_owner,
      resell: false,
      reselling_price: 0,
      reselling_listingid: 0,
    };
    if (nft.blockchain === "Concordium") {
      const listnft = await NftMarket.createNftMarket(listnftpaytload);
      const nftcompelted = { nft, listnft };
      handleCreateResponse(res, nftcompelted, successMessage, errorMessage);
    } else {
      if (nft.open_auction.price > 0) {
        const nftcompelted = { nft };
        handleCreateResponse(res, nftcompelted, successMessage, errorMessage);
      }
    }
  } catch (err) {
    handleError(err, res);
  }
};

export const readNft = async (req: express.Request, res: express.Response) => {
  try {
    const nftId = Number(req.params.id);
    const foundNft = await Nft.readNft(nftId);
    handleReadResponse(res, foundNft, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateNft = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const updatedNft = await Nft.updateNft(req.params.id, req.body);
    handleUpdateResponse(res, updatedNft, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteNft = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedCount = await Nft.deleteNft(req.params.id);
    handleDeleteResponse(res, deletedCount, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllNfts = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const allNfts = await Nft.getAllNfts();
    handleGetAllResponse(res, allNfts, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const buyNft = async (req: express.Request, res: express.Response) => {
  const nftId = req.body.id;
  const buyerAddress = req.body.buyerAddress;
  const insurance = req.body.insurance;
  const insurance_expiryDate = req.body.insurance_expiryDate;
  const insurance_buydate = req.body.insurance_buydate;
  const rebuy = req.body.rebuy;
  const rebuy_nftmarketid = req.body.rebuy_nftmarketid;
  const listing = req.body.listing;
  // const currentDate = new Date();
  // const insurance_expiryDate = new Date(currentDate.getTime() + insurance_time);
  // Input Validation
  if (!nftId || !buyerAddress) {
    return res.status(400).json({ error: "Invalid request parameters" });
  }

  try {
    const updatedNft = await Nft.buyNft(
      nftId,
      buyerAddress,
      insurance,
      insurance_expiryDate,
      insurance_buydate
    );
    const listnftpaytload = {
      nft_id: nftId,
      listing: listing,
      seller: buyerAddress,
      resell: false,
      reselling_price: 0,
      reselling_listingid: 0,
      reselling_name: "",
    };

    const rebuyNft = {
      nft_id: nftId,
      listing: listing,
      seller: buyerAddress,
      resell: false,
    };

    const currentDate = new Date();
    const isoString = currentDate.toISOString().slice(0, 10);
    const transaction_time = isoString.replace("-", "/").replace("-", "/");

    const nft_transection = {
      nfttoken_id: nftId,
      nft_id: nftId,
      buyer: buyerAddress,
      seller: "seller",
      transaction_hash: "xxxxxxx",
      transaction_time: transaction_time,
      price: 3,
    };

    const nftMarket = !rebuy
      ? await NftMarket.createNftMarket(listnftpaytload)
      : await NftMarket.updateNftMarket(parseInt(rebuy_nftmarketid), rebuyNft);

    const nftTransection = await createTransaction(nft_transection);
    if (!updatedNft) {
      return res.status(404).json({ error: "NFT not found" });
    }

    if (!nftMarket) {
      return res
        .status(404)
        .json({ error: "NFT not Listed to the Nft Market" });
    }

    if (!nftTransection) {
      return res.status(404).json({ error: "NFT Transection Record Failed" });
    }

    const buynft = { updatedNft, nftMarket, nftTransection };
    // Handle success response
    handleCreateResponse(res, buynft, successMessage, errorMessage);
  } catch (err) {
    // Handle errors
    handleError(err, res);
  }
};

export const getNftsByCollectionId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const collectionId = Number(req.params.collectionid);
    const nfts = await Nft.getNftsByCollectionId(collectionId);
    handleCreateResponse(
      res,
      nfts,
      "NFT list of your collection",
      errorMessage
    );
  } catch (err) {
    handleError(err, res);
  }
};
