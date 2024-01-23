import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Recomment } from "./recomment.entity";

@Injectable()
export class ReCommentRepository extends Repository<Recomment> {
  constructor(private dataSource: DataSource) {
    super(Recomment, dataSource.createEntityManager());
  }
}