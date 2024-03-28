import { Request, Response } from "express";
import * as p2pProfileModel from "../models/p2pProfileModel";
import { handleError } from "../helper/Responses";

export const createP2PProfile = async (req: Request, res: Response) => {
  try {
    const profileData = req.body;
    const newProfile = await p2pProfileModel.createP2PProfile(profileData);
    res.status(201).json({
      message: `P2P profile ${profileData.role} created`,
      data: newProfile,
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const getP2PProfileById = async (req: Request, res: Response) => {
  try {
    const { role, id } = req.params;
    const profile = await p2pProfileModel.getP2PProfileById(role, parseInt(id));
    if (!profile) {
      res.status(404).json({ message: `P2P profile ${role} not found` });
    } else {
      res.status(200).json({ data: profile });
    }
  } catch (err) {
    handleError(err, res);
  }
};

export const updateP2PProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProfile = req.body;
    const result = await p2pProfileModel.updateP2PProfile(
      parseInt(id),
      updatedProfile
    );
    if (!result) {
      res.status(404).json({ message: "P2P profile not found" });
    } else {
      res.status(200).json({ message: "P2P profile updated", data: result });
    }
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteP2PProfile = async (req: Request, res: Response) => {
  try {
    const { role, id } = req.params;
    const result = await p2pProfileModel.deleteP2PProfile(role, parseInt(id));
    if (!result) {
      res.status(404).json({ message: "P2P profile not found" });
    } else {
      res.status(200).json({ message: "P2P profile deleted", data: result });
    }
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllP2PProfiles = async (req: Request, res: Response) => {
  try {
    const { role } = req.params;
    const profiles = await p2pProfileModel.getAllP2PProfiles(role);
    if (!profiles) {
      res.status(404).json({ message: `P2P profiles for ${role} not found` });
    } else {
      res.status(200).json({ data: profiles });
    }
  } catch (err) {
    handleError(err, res);
  }
};

export const getP2PProfileByRefId = async (req: Request, res: Response) => {
  try {
    const { role, id } = req.params;
    const profile = await p2pProfileModel.getP2PProfileByRefId(
      role,
      parseInt(id)
    );
    if (!profile) {
      res.status(404).json({ message: `P2P profile ${role} not found` });
    } else {
      res.status(200).json({ data: profile });
    }
  } catch (err) {
    handleError(err, res);
  }
};
