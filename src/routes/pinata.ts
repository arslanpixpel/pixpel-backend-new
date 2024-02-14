import express, { Request, Response, Router } from 'express';
import AWS from 'aws-sdk';
import { Readable } from 'stream';
import pinataSdk from '@pinata/sdk';
const NEXT_PUBLIC_PINATA_API_KEY = "a99fcd1e584c3d8b4e1c"
const NEXT_PUBLIC_PINATA_API_SECRET= "fb91facece6d2ca0da5ed6b17f57676cbdf3ce621252779cff039b159c5e104b"


// const sdk = require('api')('@pinata-cloud/v1.0#12ai2blmsggcsb');

// AWS.config.update({
//   accessKeyId: "AKIA2QRNOOF3G2N4S6K6",
//   secretAccessKey: "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",
//   region: "ap-south-1"
// });

// const sns = new AWS.SNS();
// const _pinata = new pinataSdk("a99fcd1e584c3d8b4e1c", "fb91facece6d2ca0da5ed6b17f57676cbdf3ce621252779cff039b159c5e104b");

const route = Router();

route.post('/addJson', async (req: Request, res: Response) => {
  try {
    const { name, description, url, attributes } = req.body;
    const pinata = new pinataSdk("a99fcd1e584c3d8b4e1c", "fb91facece6d2ca0da5ed6b17f57676cbdf3ce621252779cff039b159c5e104b");

    await pinata.testAuthentication().then((data) => {
      console.log("Running: ", data);
    }).catch((e) => {
      console.log(e.message);
    });

    const jsonContent = {
      name: name,
      description: description,
      display: {
        url: url
      },
      attributes: attributes,
    };

    const options:any = {
      pinataMetadata: {
        name: name,
        keyvalues: {
          type: 'JSON',
        },
        pinataOptions: {
          cidVersion: 0,
        },
      },
    };
   
    try{
      const result = await pinata.pinJSONToIPFS({ pinataContent: jsonContent, options: options });
      console.log("SDK Result: ", result);
  
      // const readableStream = new Readable();
      // readableStream.push(JSON.stringify(jsonContent));
      // readableStream.push(null);
  
      // const result = await pinata.pinFileToIPFS(readableStream, options);
      console.log("Pinata Result: ", result);
      res.send(result);
    }
    catch(e){
      res.send(e);
      console.log("ERROR:" , e);
    }
    
  } catch (e:any) {
    res.status(400).send(e.message);
    console.log("ERROR: " + e);
  }
});

export default route;
