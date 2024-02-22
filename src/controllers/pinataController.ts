import express from "express";
import {
  successMessage,
  errorMessage,
  handleGetAllResponse,
  handleError,
} from "../helper/Responses";
import {
  handleCreateResponse,
  handleReadResponse,
  handleUpdateResponse,
  handleDeleteResponse,
} from "../helper/Responses";
import { Readable } from "stream";
import pinataSdk from "@pinata/sdk";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const NEXT_PUBLIC_PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const NEXT_PUBLIC_PINATA_API_SECRET = process.env.NEXT_PUBLIC_PINATA_API_SECRET;

export async function handlePinata(
  req: express.Request,
  res: express.Response
) {
  try {
    const { name, description, attributes } = req.body;
    const file = req.file;

    console.log(name, description, attributes, file);
    // return;
    if (!file) {
      return res.status(400).send("No image file uploaded");
    }

    const pinata = new pinataSdk(
      NEXT_PUBLIC_PINATA_API_KEY,
      NEXT_PUBLIC_PINATA_API_SECRET
    );

    await pinata
      .testAuthentication()
      .then((data) => {
        console.log("Running: ", data);
      })
      .catch((e) => {
        console.log(e.message);
        throw new Error("Authentication failed");
      });
    const imageOptions = {
      pinataMetadata: {
        name: file.originalname,
      },
    };
    const stream = Readable.from(file.buffer);
    const imageResult = await pinata.pinFileToIPFS(stream, imageOptions);
    // console.log("Image Pinata Result: ", imageResult);

    // Create JSON content
    const jsonContent = {
      name: name,
      description: description,
      display: {
        url: `https://silver-junior-jellyfish-759.mypinata.cloud/ipfs/${imageResult.IpfsHash}#`,
      },
      attributes: attributes,
    };

    // Pin JSON content
    const jsonOptions = {
      pinataMetadata: {
        name: name,
        keyvalues: {
          type: "JSON",
        },
        pinataOptions: {
          cidVersion: 0,
        },
      },
    };
    const jsonResult = await pinata.pinJSONToIPFS({
      pinataContent: jsonContent,
      options: jsonOptions,
    });
    // console.log("JSON Pinata Result: ", jsonResult);
    const image = `https://silver-junior-jellyfish-759.mypinata.cloud/ipfs/${imageResult.IpfsHash}`;
    res.send({ image: image, json: jsonResult.IpfsHash });
  } catch (e: any) {
    res.status(400).send(e.message);
    console.log("ERROR: " + e);
  }
}
