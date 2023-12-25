// import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// @Injectable()
// export class S3Service {
//   private readonly logger = new Logger(S3Service.name);
//   private readonly s3Client: S3Client;
//   constructor() {
//     this.s3Client = new S3Client({
//       region: process.env.AWS_REGION,
//       credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//       },
//     });
//   }

//   async uploadFile(file: Express.MulterS3.File) {
//     const command = new PutObjectCommand({
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: file.originalname,
//       Body: file.buffer,
//     });
    
//     await this.s3Client.send(command);

//     const getCommand = new GetObjectCommand({
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: file.originalname
//     });
//     const url = await getSignedUrl(this.s3Client, getCommand);

//     return {
//       Key: file.originalname,
//       Location: url
//     };
//   }

//   async searchFile(date: string) {
//     const bucketName = 'blog-log';
//     const log2Response = await this.s3Client.send(new GetObjectCommand({ Bucket: bucketName, Key: `coco/${date}.log` }));

//     const streamToString = (stream) =>
//       new Promise((resolve, reject) => {
//         const chunks = [];
//         stream.on("data", (chunk) => chunks.push(chunk));
//         stream.on("error", reject);
//         stream.on("end", () => resolve(Buffer.concat(chunks).toString().trim().split("\n")));
//     });

//     const log: any = await streamToString(log2Response.Body);
//     const temp = [...log];
//     const arr = [];
//     for(let i = 0; i < temp.length; i++) {
//       try {
//         temp[i] = JSON.parse(temp[i])
//         arr.push(temp[i]);
//       }
//       catch(err) {
//         this.logger.error(err);
//         throw new InternalServerErrorException(err);
//       }
//     }
//     return arr;
//   }
// // }