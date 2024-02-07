import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Recomment } from "./recomment.entity";
import { CreateRecommentDto } from "./dto/create-recomment.dto";
import { plainToInstance } from "class-transformer";
import { UpdateRecommentDto } from "./dto/update-recomment.dto";

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

  async findOneRecomment(id: number) {
    return await this.findOne({
      where: { id }, 
    });
  }

  async findOneReCommentInComment(id: number, comment_id: number) {
    return await this.findOne({
      where: { id, comment_id },
    })
  }

  async createRecomment(createData: CreateRecommentDto) {
    const reComment: Recomment = plainToInstance(Recomment, createData);
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(createData);
      await queryRunner.commitTransaction();
      return reComment;
    } catch (err){
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateRecomment(id: number, updateData: UpdateRecommentDto) {
    const reComment: Recomment = plainToInstance(Recomment, updateData);
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(Recomment, id, updateData);
      await queryRunner.commitTransaction();
      return reComment;
    } catch (err){
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async deleteRecomment(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager
      .createQueryBuilder(Recomment, 'recomment')
      .delete()
      .from(Recomment)
      .where("id = :id", { id })
      .execute()
      
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}