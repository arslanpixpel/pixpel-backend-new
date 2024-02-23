// // import express from "express";
// // import { S3Client } from "@aws-sdk/client-s3";
// // import { fromIni } from "@aws-sdk/credential-provider-ini";
// // import multer from "multer";
// // import multerS3 from "multer-s3";
// // import dotenv from "dotenv";
// // dotenv.config();

// // // export const addImageMiddleware = async (
// // //   req: express.Request,
// // //   res: express.Response,
// // //   next: express.NextFunction
// // // ) => {
// // //   try {
// // //     const s3 = new S3Client({
// // //       region: process.env.AWS_REGION,
// // //       credentials: fromIni(),
// // //     });
// // //     console.log(s3, "AWS credentials");
// // //     const upload = multer({
// // //       storage: multerS3({
// // //         s3: s3,
// // //         acl: "public-read",
// // //         bucket: process.env.BUCKET_NAME || "",
// // //         metadata: function (req, file, cb) {
// // //           cb(null, { fieldName: file.fieldname });
// // //         },
// // //         key: function (req, file, cb) {
// // //           cb(null, uuidv4() + "." + file.originalname.split(".")[1]);
// // //         },
// // //       }),
// // //     }).array("files");

// // //     upload(req, res, function (err: any) {
// // //       if (err) {
// // //         return res.status(400).send(err.message);
// // //       }
// // //       next();
// // //     });
// // //   } catch (err: any) {
// // //     res.status(403).send(err.message);
// // //   }
// // // };
// // // function uuidv4() {
// // //   throw new Error("Function not implemented.");
// // // }

// // export const addImageMiddleware = async (
// //   req: express.Request,
// //   res: express.Response,
// //   next: express.NextFunction
// // ) => {
// //   try {
// //     const s3 = new S3Client({
// //       region: process.env.AWS_REGION,
// //       credentials: fromIni(),
// //     });

// //     const upload = multer({
// //       storage: multerS3({
// //         s3: s3,
// //         acl: "public-read",
// //         bucket: process.env.BUCKET_NAME || "",
// //         metadata: function (req, file, cb) {
// //           cb(null, { fieldName: file.fieldname });
// //         },
// //         key: function (req, file, cb) {
// //           cb(null, uuidv4() + "." + file.originalname.split(".")[1]);
// //         },
// //       }),
// //     }).array("files");

// //     upload(req, res, function (err: any) {
// //       if (err) {
// //         console.error("Error uploading file:", err);
// //         return res.status(400).send(err.message);
// //       }
// //       (req as any).s3 = s3; // Pass s3 client to the request object
// //       next();
// //     });
// //   } catch (err: any) {
// //     console.error("Error in middleware:", err);
// //     res.status(403).send(err.message);
// //   }
// // };

// // function uuidv4() {
// //   throw new Error("Function not implemented.");
// // }

// import express from "express";
// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import { fromIni } from "@aws-sdk/credential-provider-ini";
// import multer from "multer";
// import multerS3 from "multer-s3";
// import { v4 as uuidv4 } from "uuid";
// import dotenv from "dotenv";

// dotenv.config();

// export const addImageMiddleware = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   try {
//     console.log(process.env.AWS_REGION, process.env.BUCKET_NAME);
//     const s3 = new S3Client({
//       region: process.env.AWS_REGION,
//       credentials: fromIni(),
//     });

//     const upload = multer({
//       storage: multerS3({
//         s3: s3,
//         acl: "public-read",
//         bucket: process.env.BUCKET_NAME || "",
//         metadata: function (req, file, cb) {
//           cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//           cb(null, uuidv4() + "." + file.originalname.split(".")[1]);
//         },
//       }),
//     }).any();

//     upload(req, res, function (err: any) {
//       if (err) {
//         console.error("Error uploading file:", err);
//         return res.status(400).send(err.message);
//       }
//       (req as any).s3 = s3; // Pass s3 client to the request object
//       next();
//     });
//   } catch (err: any) {
//     console.error("Error in middleware:", err);
//     res.status(403).send(err.message);
//   }
// };

// export const addImageController = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const files = req.files;

//     console.log(files, "files");

//     if (!Array.isArray(files) || files.length === 0) {
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
