import express from "express";
import * as Player from "../models/Player";
const jwt = require("jsonwebtoken");
import { createSession } from "../controllers/sessionController";
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
import { Session } from "express-session";

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
  const { wallet, zetawallet } = req.body;
  try {
    if (zetawallet === "" && wallet === "") {
      throw new Error("EmptyWallet not Found");
    }
    const player = await Player.readPlayerByWallet(
      wallet || null,
      zetawallet || null
    );
    // const player = await Player.readPlayerByWallet(wallet, zetawallet);
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
  req: any,
  res: express.Response
) => {
  try {
    const player = await Player.signupPlayer(req.body);
    const token = jwt.sign(
      { userId: player.id, email: player.email, role: "player" },
      process.env.JWT_KEY,
      { expiresIn: "30d" } // You can adjust the expiration time
    );

    req.session.regenerate(function (err: any) {
      if (err) handleError(err, res)

      // store user information in session, typically a user id
      req.session.token = token;

      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err: any) {
        if (err) return handleError(err, res)
        res.status(201).send({
          message: "player signed up successfully",
          data: { player, token },
        });
      })
    })
  } catch (err) {
    handleError(err, res);
  }
};

// export const signinPlayer = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { email, password } = req.body;
//     const player = await Player.signinPlayer(email, password);

//     if (player) {
//       console.log(player.id);
//       // Generate JWT token
//       const token = jwt.sign(
//         { userId: player.id, email: player.email },
//         secretKey,
//         { expiresIn: "30d" } // You can adjust the expiration time
//       );

//       res.status(200).send({
//         message: "player signed in successfully",
//         data: { player, token },
//       });
//     } else {
//       res.status(401).send({ error: "Invalid email or password" });
//     }
//   } catch (err) {
//     handleError(err, res);
//   }
// };
let tokenJWT: any;
export const signinPlayer = async (
  req: any,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;
    const player = await Player.signinPlayer(email, password);

    if (player) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: player.id, email: player.email, role: "player" },
        process.env.JWT_KEY,
        { expiresIn: "30d" } // Expires in 2 days
      );

      tokenJWT = token;
      req.session.regenerate(function (err: any) {
        if (err) handleError(err, res)

        // store user information in session, typically a user id
        req.session.token = token;

        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err: any) {
          if (err) return handleError(err, res)
          res.status(200).send({
            message: "Player signed in successfully",
            data: { player, token },
          });
        })
      })

      // Set the token as a cookie in the response
      // res.cookie("jwtToken", token, {
      //   httpOnly: true,
      //   maxAge: 172800,
      //   secure: true, // Set to false for development on localhost
      //   sameSite: "none",
      //   // domain: "*.pixpel.io,localhost",
      // });

      // 172800 seconds = 2 days


    } else {
      res.status(401).send({ error: "Invalid email or password" });
    }
  } catch (err) {
    handleError(err, res);
  }
};

export const checkUser = async (req: any, res: express.Response) => {
  try {
    res.status(200).send({ user: req.user });
  } catch (err) {
    handleError(err, res);
  }
};

export const updatePlayerPasswordController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, newPassword } = req.body;
    const player = await Player.updatePlayerPassword(email, newPassword);
    res.status(200).json({ message: "Password updated successfully", player });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkEmailController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email } = req.body;
    const emailExists = await Player.checkEmail(email);

    res.status(200).json({ exists: emailExists });
  } catch (err) {
    console.error("Error checking email:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
