import { PartialType } from '@nestjs/mapped-types';
import { CreateMongoDto } from './create-mongo.dto';

export class MongoChatDto extends PartialType(CreateMongoDto) {}
