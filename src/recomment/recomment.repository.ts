import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Recomment } from "./recomment.entity";

@Injectable()
export class RecommentRepository extends Repository<Recomment> {
  constructor(private dataSource: DataSource) {
    super(Recomment, dataSource.createEntityManager());
  }

  async findAllRecommentInComment(comment_id: number) {
    return await this.find({
      where: { comment_id },
    });
  }

  async findOneReCommentInComment(id: number, comment_id: number) {
    return await this.findOne({
      where: { id, comment_id },
    })
  }
}