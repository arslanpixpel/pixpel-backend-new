// import { Request, Response } from "express";
// import { v4 as uuidv4 } from "uuid";
// import { PutObjectCommand } from "@aws-sdk/client-s3";

// export const addImageController = async (req: Request, res: Response) => {
//   try {
//     const files = req.files as any;
//     console.log(files, "files");

//     if (!Array.isArray(files)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "No files uploaded" });
//     }

//     const s3 = (req as any).s3;

//     const uploadPromises = files.map(async (file: any) => {
//       const command = new PutObjectCommand({
//         Bucket: process.env.BUCKET_NAME || "",
//         Key: uuidv4() + "." + file?.originalname.split(".")[1],
//         Body: file?.buffer,
//       });

//       return await s3.send(command);
//     });

//     const responses = await Promise.all(uploadPromises);

//     res.status(200).json({
//       success: true,
//       message: "Files uploaded successfully",
//       data: responses,
//     });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).json({ success: false, message: "Error uploading files" });
//   }
// };
