import { Response } from "express";

export const successMessage = "Operation successful";
export const errorMessage = "Failed to do something";
export const error = "Record with the specified ID doesn't exist";

export const handleCreateResponse = (
  res: Response,
  createdObject: any,
  successMessage: string,
  errorMessage: string
) => {
  if (createdObject) {
    res
      .status(201)
      .send({
        message: successMessage,
        data: `Created object with _id: ${createdObject.id}`,
        responce: createdObject,
      });
  } else {
    res.status(500).send({ error: errorMessage });
  }
};

export const handleReadResponse = (
  res: Response,
  readObject: any,
  successMessage: string,
  error: string
) => {
  if (readObject) {
    res.status(200).send({ message: successMessage, data: readObject });
  } else {
    res.status(404).send({ error: error });
  }
};

export const handleUpdateResponse = (
  res: Response,
  updatedObject: any,
  successMessage: string,
  error: string
) => {
  if (updatedObject) {
    res.status(200).send({ message: successMessage, data: updatedObject });
  } else {
    res.status(404).send({ error: error });
  }
};

export const handleDeleteResponse = (
  res: Response,
  deletedCount: number,
  successMessage: string,
  error: string
) => {
  if (deletedCount > 0) {
    res
      .status(200)
      .send({
        message: successMessage,
        data: `Deleted ${deletedCount} developers.`,
      });
  } else {
    res.status(404).send({ error: error });
  }
};

export const handleGetAllResponse = (
  res: Response,
  allObjects: any[],
  successMessage: string,
  errorMessage: string
) => {
  if (allObjects) {
    res.status(200).send({ message: successMessage, data: allObjects });
  } else {
    res.status(500).send({ error: errorMessage });
  }
};

export const handleError = (err: any, res: Response) => {
  let errorMessage = "Failed to do something";
  if (err instanceof Error) {
    errorMessage = err.message;
  }
  res.status(500).send(errorMessage);
};
