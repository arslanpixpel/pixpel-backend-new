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
import * as ethers from "ethers";

const apiSecret = process.env.SECRET_KEY || "";
const apiKey = process.env.API_KEY || "";
// Choose the right api url for your workspace type
const baseUrl = "https://sandbox-api.fireblocks.io";
const fireblocks = new FireblocksSDK(apiSecret, apiKey, baseUrl);

const eip1193Provider = new FireblocksWeb3Provider({
  privateKey: apiSecret,
  apiKey: process.env.API_KEY || "",
  vaultAccountIds: [2],
  chainId: ChainId.POLYGON_TEST,
  rpcUrl: "https://polygon-testnet.public.blastapi.io",
  apiBaseUrl: ApiBaseUrl.Sandbox,

  logTransactionStatusChanges: true,
  enhancedErrorHandling: true,
  fallbackFeeLevel: FeeLevel.MEDIUM,
  pollingInterval: 1000,
  oneTimeAddressesEnabled: true,
});

export const createVaultAccount = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name } = req.body;
    console.log(name, "name");
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
    const { wallet_address } = req.body;
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
    const { receiverAddress, receivingamount } = req.body;
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
