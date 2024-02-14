import express from "express";
import * as LaunchpadData from "../models/Launchpad";
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

export const createData = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // console.log(req.body, "Request body");
    const data = await LaunchpadData.createData(req.body);
    handleCreateResponse(res, data, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const readData = async (req: express.Request, res: express.Response) => {
  try {
    const data = await LaunchpadData.readData(parseInt(req.params.id));
    handleReadResponse(res, data, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateData = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const data = await LaunchpadData.updateData(
      parseInt(req.params.id),
      req.body
    );
    handleUpdateResponse(res, data, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteData = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedCount = await LaunchpadData.deleteData(
      parseInt(req.params.id)
    );
    handleDeleteResponse(res, deletedCount, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllLaunchpadData = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const allLaunchpadData = await LaunchpadData.getAllLaunchpadData();
    handleGetAllResponse(res, allLaunchpadData, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const createRocketTest = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const rocketTest = await LaunchpadData.createRocketTest(req.body);
    res.status(201).send({
      message: "Rocket test created successfully",
      data: { rocketTest },
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const invest = async (req: express.Request, res: express.Response) => {
  try {
    const { rocketId, amount, address } = req.body;

    const rocket = await LaunchpadData.getRocketById(rocketId);

    if (!rocket) {
      return res.status(404).json({ error: "Rocket not found" });
    }

    const newInvestment = {
      amount: Number(amount * 1e6),
      address,
    };

    rocket.holders.push(newInvestment);
    rocket.invest_amount += newInvestment.amount;
    rocket.total_tx += 1;

    const updatedRocket = await LaunchpadData.updateRocket(rocketId, rocket);

    res.json(updatedRocket);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const cancelRocket = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const rocket = await LaunchpadData.getRocketById(
      parseInt(req.params.rocketId)
    );

    if (!rocket) {
      return res.status(404).json({ error: "Rocket not found" });
    }

    const updatedRocket = await LaunchpadData.cancelRocket(
      parseInt(req.params.rocketId)
    );

    res.json(updatedRocket);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const pauseRocket = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { rocketId } = req.params;
    const { live } = req.body;

    const rocketData = await LaunchpadData.getRocketById(
      parseInt(rocketId, 10)
    );

    if (!rocketData) {
      return res.status(404).json({ error: "Rocket not found" });
    }

    if (rocketData.live_pause_count === 3) {
      return res
        .status(200)
        .json({ error: "You can't pause launchpad more than 3 times" });
    }

    if (live) {
      const now = new Date();
      rocketData.pause_start = new Date().toISOString();
      rocketData.pause_until = new Date(
        now.setDate(now.getDate() + 2)
      ).toISOString();
      rocketData.live_pause_count += 1;
      // console.log("Live pause count: " + rocketData.live_pause_count);
    } else {
      rocketData.pause_start = new Date().toISOString();
      rocketData.pause_until = new Date().toISOString();
      // console.log("No Live pause Count");
    }

    rocketData.live = !rocketData.live;
    rocketData.paused = !rocketData.paused;

    const updatedRocket = await LaunchpadData.pauseRocketData(
      parseInt(rocketId, 10),
      rocketData
    );

    res.json(updatedRocket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createholder = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const data = await LaunchpadData.createholder(req.body);
    res.status(201).send({
      message: "Holder Add successfully",
      data: { data },
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const updateCycleCompletedController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const data = await LaunchpadData.updateCycleCompleted(
      parseInt(req.params.id)
    );
    handleUpdateResponse(res, data, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllHolders = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const allLaunchpadData = await LaunchpadData.getAllHolders();
    handleGetAllResponse(res, allLaunchpadData, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const getHolderById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const data = await LaunchpadData.getHolderById(parseInt(req.params.id));
    handleReadResponse(res, data, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};
