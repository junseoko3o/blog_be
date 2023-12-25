// import { Controller, Get, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
// import { FileInterceptor } from "@nestjs/platform-express";
// import { S3Service } from "./s3.service";

// @Controller('s3')
// export class S3Controller {
//     constructor(private readonly s3Service: S3Service) {}

//     @Post()
//     @UseInterceptors(FileInterceptor('file'))
//     async uploadFile(@UploadedFile() file: Express.MulterS3.File) {
//         return await this.s3Service.uploadFile(file);
//     }
    
//     @Get('log')
//     async searchFile(@Query('date') date: string) {
//         return await this.s3Service.searchFile(date);
//     }
// }