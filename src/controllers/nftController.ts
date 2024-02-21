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

export const createNft = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const nft = await Nft.createNft(req.body);
    handleCreateResponse(res, nft, successMessage, errorMessage);
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
  // const currentDate = new Date();
  // const insurance_expiryDate = new Date(currentDate.getTime() + insurance_time);

  // console.log(req.body, "payload");

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
      listing: true,
      seller: buyerAddress,
      resell: false,
      reselling_price: 0,
      reselling_listingid: 0,
    };

    const rebuyNft = {
      nft_id: 1,
      listing: true,
      seller: buyerAddress,
      resell: false,
    };

    const nftMarket = !rebuy
      ? await NftMarket.createNftMarket(listnftpaytload)
      : await NftMarket.updateNftMarket(parseInt(rebuy_nftmarketid), rebuyNft);

    if (!updatedNft) {
      return res.status(404).json({ error: "NFT not found" });
    }

    if (!nftMarket) {
      return res
        .status(404)
        .json({ error: "NFT not Listed to the Nft Market" });
    }

    const buynft = { updatedNft, nftMarket };
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
