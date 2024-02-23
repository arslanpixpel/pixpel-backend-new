import express from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
} as any);

const upload = multer({
  storage: multer.memoryStorage(),
}).array("file", 20);

router.post("/upload", (req, res) => {
  let file2;
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
    }

    const files = req.files as any;
    if (!files || files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    const responses = [];
    for (const file of files) {
      const filename = uuidv4() + "." + file.originalname.split(".").pop();
      file2 = filename;

      try {
        const uploadParams = {
          Bucket: process.env.BUCKET_NAME || "your-default-bucket-name",
          Key: filename,
          Body: file.buffer,
        };

        const result = await s3Client.send(new PutObjectCommand(uploadParams));
        responses.push(
          `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${filename}`
        );
      } catch (err) {
        console.error("Error uploading file:", err);
        return res.status(500).send("Error uploading one or more files.");
      }
    }

    res.status(200).send({
      message: "Files uploaded successfully",
      files: responses,
    });
  });
});

export default router;
