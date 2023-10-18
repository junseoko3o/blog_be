import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(code: number, message: string) {
    super({ code, message }, HttpStatus.OK);
  }
}