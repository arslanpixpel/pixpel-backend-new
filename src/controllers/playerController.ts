import express from "express";
import * as Player from "../models/Player";
const jwt = require('jsonwebtoken');
const secretKey = "3650"; // Replace with your actual secret key
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

export const readPlayer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const player = await Player.readPlayer(parseInt(req.params.id));
    handleReadResponse(res, player, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const readPlayerWallet = async (
  req: express.Request,
  res: express.Response
) => {
  const { wallet } = req.body;

  try {
    const player = await Player.readPlayerByWallet(wallet);
    handleReadResponse(res, player, successMessage, errorMessage);
  } catch (err) {
    res.send(err);
    handleError(err, res);
  }
};

export const emailCheck = async (
  req: express.Request,
  res: express.Response
) => {
  const { email } = req.body;
  try {
    const player = await Player.emailChecker(email);
    // res.status(200).send(player);
    handleReadResponse(res, player, successMessage, errorMessage);
  } catch (err) {
    res.send(err);
    handleError(err, res);
  }
};

export const updatePlayerImg = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const player = await Player.updatePlayerImage(
      parseInt(req.params.id),
      req.body
    );
    handleUpdateResponse(res, player, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const updatePlayer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const player = await Player.updatePlayer(parseInt(req.params.id), req.body);
    handleUpdateResponse(res, player, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const deletePlayer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedCount = await Player.deletePlayer(parseInt(req.params.id));
    handleDeleteResponse(res, deletedCount, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllPlayers = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    console.log("getall");
    const allPlayers = await Player.getAllPlayers();
    handleGetAllResponse(res, allPlayers, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const signupPlayer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const player = await Player.signupPlayer(req.body);
    const token = jwt.sign(
      { userId: player.id, email: player.email },
      secretKey,
      { expiresIn: '1d' } // You can adjust the expiration time
    );

    res.status(201).send({
      message: "player signed up successfully",
      data: { player, token },
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const signinPlayer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;
    const player = await Player.signinPlayer(email, password);

    if (player) {
      console.log(player.id)
      // Generate JWT token
      const token = jwt.sign(
        { userId: player.id, email: player.email },
        secretKey,
        { expiresIn: '1d' } // You can adjust the expiration time
      );

      res.status(200).send({
        message: "player signed in successfully",
        data: { player, token },
      });
    } else {
      res.status(401).send({ error: "Invalid email or password" });
    }
  } catch (err) {
    handleError(err, res);
  }
};

export const hello = async (req: express.Request, res: express.Response) => {
  try {
    res.status(200).send({ message: "hello" });
  } catch (err) {
    handleError(err, res);
  }
};
