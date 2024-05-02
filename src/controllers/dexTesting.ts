import express from "express";
import * as DexTesting from "../models/DexTesting";
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
import { fireBlocksReqHelper } from "./fireBlocks";

export const createVaultAccountDex = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, assetId } = req.body;
    const vaultAccount = await fireBlocksReqHelper(
      "/vault/accounts",
      { name: name },
      "post"
    );
    const vaultAsset = await fireBlocksReqHelper(
      `/vault/accounts/${vaultAccount.id}/${assetId}`,
      {},
      "post"
    );
    const responce = await DexTesting.createVaultAccount({
      fireblocks_account_address: vaultAsset.address,
      fireblocks_account_id: vaultAccount.id,
    });
    res.status(200).send({
      message:
        "Vault account, vault asset, and transaction created successfully.",
      vaultAccount: vaultAccount,
      vaultAsset: vaultAsset,
      vault_account_address: vaultAsset.address,
      vault_account_id: vaultAccount.id,
      Responce: responce,
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const getVaultAccountByAddress = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const address = req.params.address;
    const result = await DexTesting.getVaultAccountByAddress(address);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Vault account not found" });
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const getAllVaultAccount = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const result = await DexTesting.getAllVaultAccount();
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Vault accounts not found" });
    }
  } catch (error) {
    handleError(error, res);
  }
};
