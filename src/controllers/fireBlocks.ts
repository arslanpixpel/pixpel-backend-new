import express from "express";
import {
  FireblocksSDK,
  PeerType,
  FeeLevel,
  TransactionArguments,
} from "fireblocks-sdk";
import { handleError, handleReadResponse } from "../helper/Responses";
import {
  FireblocksWeb3Provider,
  ChainId,
  ApiBaseUrl,
} from "@fireblocks/fireblocks-web3-provider";
import ABI from "../smart-contract/CCT_ABI.json";
import MarketPlaceABI from "../smart-contract/MarketPlace.json";
import CollectionABI from "../smart-contract/Collection.json";
const jwt = require("jsonwebtoken");
import crypto from "crypto";
import * as ethers from "ethers";

const apiSecret = process.env.SECRET_KEY || "";
const apiKey = process.env.API_KEY || "";
// Choose the right api url for your workspace type
const baseUrl = "https://sandbox-api.fireblocks.io";
const fireblocks = new FireblocksSDK(apiSecret, apiKey, baseUrl);

// const eip1193Provider = new FireblocksWeb3Provider({
//   privateKey: apiSecret,
//   apiKey: process.env.API_KEY || "",
//   vaultAccountIds: [1],
//   chainId: ChainId.POLYGON_TEST,
//   rpcUrl: "https://polygon-testnet.public.blastapi.io",
//   apiBaseUrl: ApiBaseUrl.Sandbox,
//   logTransactionStatusChanges: true,
//   enhancedErrorHandling: true,
//   fallbackFeeLevel: FeeLevel.MEDIUM,
//   pollingInterval: 1000,
//   oneTimeAddressesEnabled: true,
// });

const initializeFireblocksProvider = (vaultAccountId: any) => {
  return new FireblocksWeb3Provider({
    privateKey: apiSecret,
    apiKey: apiKey,
    vaultAccountIds: [vaultAccountId],
    chainId: ChainId.POLYGON_TEST,
    rpcUrl: "https://polygon-testnet.public.blastapi.io",
    apiBaseUrl: ApiBaseUrl.Sandbox,
    logTransactionStatusChanges: true,
    enhancedErrorHandling: true,
    fallbackFeeLevel: FeeLevel.MEDIUM,
    pollingInterval: 1000,
    oneTimeAddressesEnabled: true,
  });
};
export const createVaultAccount = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name } = req.body;
    // console.log(name, "name");
    const vaultAccount = await fireblocks.createVaultAccount(name);
    console.log(vaultAccount, "accounts");
    res.status(200).send({
      message: "Created createVaultAccount successfully",
      data: vaultAccount,
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const getVaultAccountsWithPageInfo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let pagedFilter = {};
    const vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo(
      pagedFilter
    );

    res.status(200).send({
      message: "Get Vault Accounts With PageInfo successfully",
      data: vaultAccounts,
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const getVaultAccountAsset = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { vaultAccountId, assetId } = req.body;
    const vaultAsset = await fireblocks.getVaultAccountAsset(
      vaultAccountId,
      assetId
    );
    res.status(200).send({
      message: "Get Vault Account Asset successfully",
      data: vaultAsset,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const createVaultAsset = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { vaultAccountId, assetId } = req.body;
    const vaultAsset = await fireblocks.createVaultAsset(
      vaultAccountId,
      assetId
    );
    res.status(200).send({
      message: "Create Vault Asset successfully",
      data: vaultAsset,
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const getVaultAccountById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const vaultAccount = await fireblocks.getVaultAccountById(req.params.id);
    res.status(200).send({
      message: "Get Vault Account By Id successfully",
      data: vaultAccount,
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const createTransaction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { assetId, amount, srcId, address, note } = req.body;

    const payload: TransactionArguments = {
      assetId: assetId,
      source: { type: PeerType.VAULT_ACCOUNT, id: srcId || 0 },
      destination: {
        type: PeerType.ONE_TIME_ADDRESS,
        oneTimeAddress: {
          address: address,
        },
      },
      amount: amount.toString(),
      note: note || "Created by fireblocks SDK",
    };

    const result = await fireblocks.createTransaction(payload);

    res.status(200).json({
      message: "Transaction created successfully",
      data: result,
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const getSupportedAssets = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const supportedAssets = await fireblocks.getSupportedAssets();
    res.status(200).json({
      message: "Get Supported Assets successfully",
      data: supportedAssets,
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const getExchangeAccounts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const exchangeAccounts = await fireblocks.getExchangeAccounts();
    res.status(200).json({
      message: "Get Exchange Accounts successfully",
      data: exchangeAccounts,
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const getTotalSupply = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { vaultAccountId } = req.params;
    const eip1193Provider = initializeFireblocksProvider(
      Number(vaultAccountId)
    );
    console.log(vaultAccountId, "Provider");
    const provider = new ethers.providers.Web3Provider(eip1193Provider);
    console.log("getTotalSupply");
    const myContract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS || "",
      ABI,
      provider.getSigner()
    );
    const totalSupply = await myContract.totalSupply();
    res.status(200).json({
      message: "Get Total Supply successfully",
      data: totalSupply,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getBalanceOf = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { wallet_address, vaultAccountId } = req.body;
    console.log(vaultAccountId, "Valid wallet address");
    const eip1193Provider = initializeFireblocksProvider(vaultAccountId);
    const provider = new ethers.providers.Web3Provider(eip1193Provider);
    const myContract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS || "",
      ABI,
      provider.getSigner()
    );
    const balanceOf = await myContract.balanceOf(wallet_address);
    res.status(200).json({
      message: "Get Balance successfully",
      data: balanceOf,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const tokenTransfer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { receiverAddress, receivingamount, vaultAccountId } = req.body;
    const eip1193Provider = initializeFireblocksProvider(vaultAccountId);
    const provider = new ethers.providers.Web3Provider(eip1193Provider);
    const gasPrice = await provider.getGasPrice();
    const myContract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS || "",
      ABI,
      provider.getSigner()
    );
    const senderAddress = receiverAddress;
    const amout = receivingamount;
    const transfer = await myContract.transfer(senderAddress, amout, {
      gasPrice: gasPrice,
      gasLimit: "200000",
    });
    res.status(200).json({
      message: "Token Transfer successfully",
      data: transfer,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const createCollection = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, symbol, vaultAccountId } = req.body;
    const eip1193Provider = initializeFireblocksProvider(vaultAccountId);
    const provider = new ethers.providers.Web3Provider(eip1193Provider);
    const gasPrice = await provider.getGasPrice();
    const myContract = new ethers.Contract(
      process.env.MARKETPALCE_CONTRACT_ADDRESS || "",
      MarketPlaceABI,
      provider.getSigner()
    );

    const createCollectionTx = await myContract.createCollection(name, symbol);

    const status = await createCollectionTx.wait();

    res.status(200).json({
      message: "Collection created successfully",
      transactionHash: createCollectionTx.hash,
      result: createCollectionTx,
      collectionAddress: status.logs[0].address,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const mintNft = async (req: express.Request, res: express.Response) => {
  try {
    const { collectionAddress, to, vaultAccountId } = req.body;
    const eip1193Provider = initializeFireblocksProvider(vaultAccountId);
    const provider = new ethers.providers.Web3Provider(eip1193Provider);
    console.log(provider, "Providers");
    const gasPrice = await provider.getGasPrice();
    const myContract = new ethers.Contract(
      collectionAddress,
      CollectionABI,
      provider.getSigner()
    );

    const mintTx = await myContract.mint(to, {
      gasPrice: gasPrice,
      gasLimit: "200000",
    });

    const Nft = await mintTx.wait();
    const convert = Nft.logs[0].topics[3];
    const tokenId = Number(convert);

    res.status(200).json({
      message: "NFT minted successfully",
      transactionHash: mintTx.hash,
      NftTokenId: tokenId,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const listNft = async (req: express.Request, res: express.Response) => {
  try {
    const { tokenContract, tokenId, price, warranty, vaultAccountId } =
      req.body;
    const price2 = ethers.utils.parseUnits(price, "18").toString();
    const eip1193Provider = initializeFireblocksProvider(vaultAccountId);
    const provider = new ethers.providers.Web3Provider(eip1193Provider);
    const gasPrice = await provider.getGasPrice();
    const myContract = new ethers.Contract(
      process.env.MARKETPALCE_CONTRACT_ADDRESS || "",
      MarketPlaceABI,
      provider.getSigner()
    );
    const listNFTTx = await myContract.listNFT(
      tokenContract,
      tokenId,
      price2,
      warranty,
      {
        gasPrice: gasPrice,
        gasLimit: "200000",
      }
    );
    const listNft = await listNFTTx.wait();
    res.status(200).json({
      message: "NFT listed successfully",
      transactionHash: listNFTTx.hash,
      listind_id: listNft.events[1].args[0].toNumber(),
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const setApprovalForAll = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { marketplace_address, tokenId, tokenContract, vaultAccountId } =
      req.body;
    const eip1193Provider = initializeFireblocksProvider(vaultAccountId);
    const provider = new ethers.providers.Web3Provider(eip1193Provider);
    const gasPrice = await provider.getGasPrice();
    console.log(tokenContract, "Token Contract");
    const myContract = new ethers.Contract(
      tokenContract,
      CollectionABI,
      provider.getSigner()
    );
    const setApprovalForAllTx = await myContract.approve(
      process.env.MARKETPALCE_CONTRACT_ADDRESS || "",
      tokenId,
      {
        gasPrice: gasPrice,
        gasLimit: "200000",
      }
    );

    await setApprovalForAllTx.wait();

    res.status(200).json({
      message: "Approval set successfully",
      transactionHash: setApprovalForAllTx.hash,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const buyNft = async (req: express.Request, res: express.Response) => {
  try {
    const { listingId, price, vaultAccountId } = req.body;
    const eip1193Provider = initializeFireblocksProvider(vaultAccountId);
    const provider = new ethers.providers.Web3Provider(eip1193Provider);
    const gasPrice = await provider.getGasPrice();
    const signer = provider.getSigner();
    const myContract = new ethers.Contract(
      process.env.MARKETPALCE_CONTRACT_ADDRESS || "",
      MarketPlaceABI,
      signer
    );

    const value = ethers.utils.parseEther(price);

    const txOptions = {
      gasPrice: gasPrice,
      gasLimit: "200000",
      value: value,
    };

    const buyNFTTx = await myContract.buyNFT(listingId, txOptions);

    const receipt = await buyNFTTx.wait();

    res.status(200).json({
      message: "NFT bought successfully",
      transactionHash: buyNFTTx.hash,
      receipt: receipt,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const createAuction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      collectionAddress,
      tokenId,
      startingPrice,
      reservePrice,
      duration,
      vaultAccountId,
    } = req.body;
    const startingPrice2 = ethers.utils
      .parseUnits(startingPrice, "18")
      .toString();
    const reservePrice2 = ethers.utils
      .parseUnits(reservePrice, "18")
      .toString();
    const eip1193Provider = initializeFireblocksProvider(vaultAccountId);
    const provider = new ethers.providers.Web3Provider(eip1193Provider);
    const gasPrice = await provider.getGasPrice();
    const signer = provider.getSigner();
    const myContract = new ethers.Contract(
      process.env.MARKETPALCE_CONTRACT_ADDRESS || "",
      MarketPlaceABI,
      signer
    );

    const createAuctionTx = await myContract.createAuction(
      collectionAddress,
      tokenId,
      startingPrice2,
      reservePrice2,
      duration,
      {
        gasPrice: gasPrice,
        gasLimit: "200000",
      }
    );

    const receipt = await createAuctionTx.wait();
    const auction_id = Number(receipt.logs[1].topics[1]);

    res.status(200).json({
      message: "Auction created successfully",
      transactionHash: createAuctionTx.hash,
      auction_id: auction_id,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const placeBid = async (req: express.Request, res: express.Response) => {
  try {
    const { auctionId, bidAmount, vaultAccountId } = req.body;
    const eip1193Provider = initializeFireblocksProvider(vaultAccountId);
    const provider = new ethers.providers.Web3Provider(eip1193Provider);
    const signer = provider.getSigner();
    const gasPrice = await provider.getGasPrice();
    const myContract = new ethers.Contract(
      process.env.MARKETPALCE_CONTRACT_ADDRESS || "",
      MarketPlaceABI,
      signer
    );

    const bidAmount2 = ethers.utils.parseEther(bidAmount.toString());

    const placeBidTx = await myContract.placeBid(auctionId, {
      value: bidAmount2,
      gasPrice: gasPrice,
      gasLimit: "200000",
    });

    const receipt = await placeBidTx.wait();

    res.status(200).json({
      message: "Bid placed successfully",
      transactionHash: placeBidTx.hash,
      receipt: receipt,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const endAuction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { auctionId, vaultAccountId } = req.body;
    const eip1193Provider = initializeFireblocksProvider(vaultAccountId);
    const provider = new ethers.providers.Web3Provider(eip1193Provider);
    const signer = provider.getSigner();
    const gasPrice = await provider.getGasPrice();
    const myContract = new ethers.Contract(
      process.env.MARKETPALCE_CONTRACT_ADDRESS || "",
      MarketPlaceABI,
      signer
    );

    const endAuctionTx = await myContract.endAuction(auctionId, {
      gasPrice: gasPrice,
      gasLimit: "200000",
    });

    const receipt = await endAuctionTx.wait();

    res.status(200).json({
      message: "Auction ended successfully",
      transactionHash: endAuctionTx.hash,
      receipt: receipt,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const generateJwtToken = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const payload = {
      uri: "https://sandbox-api.fireblocks.io/v1/ncw/wallets", // Replace with the appropriate endpoint
      nonce: Math.floor(Math.random() * 1000000), // Generate a random nonce
      iat: Math.floor(Date.now() / 1000), // Current time in seconds since Epoch
      exp: Math.floor(Date.now() / 1000) + 30, // Expiration time (iat + 30 seconds)
      sub: apiKey,
      bodyHash: crypto
        .createHash("sha256")
        .update(JSON.stringify(req.body))
        .digest("hex"),
    };
    const token = jwt.sign(payload, apiSecret, { algorithm: "RS256" });

    res.status(200).send({
      message: "Created JWT Token successfully",
      data: token,
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const createNonCustodialWallet = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const newWallet = await fireblocks.NCW.createWallet();

    console.log(newWallet, "wallet");
    res.status(200).send({
      message: "Created non-custodial wallet successfully",
      data: newWallet,
    });
  } catch (err) {
    handleError(err, res);
  }
};
