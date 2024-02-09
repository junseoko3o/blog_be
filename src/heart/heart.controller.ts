import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeartService } from './heart.service';

@Controller('heart')
export class HeartController {
  constructor(private readonly heartService: HeartService) {}
}
