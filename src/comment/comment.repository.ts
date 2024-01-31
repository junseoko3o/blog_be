import { DataSource, Repository } from "typeorm";
import { Comment } from "./comment.entity";
import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { plainToInstance } from "class-transformer";
import { LikeCommentDto } from "./dto/like-comment.dto";

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async findAllComment(): Promise<Comment[]> {
    return await this.find();
  }

  async findOneComment(id: number): Promise<Comment> {
    return await this.findOne({
      where: { id },
    });
  }

  async findOneCommentWithAllRecomment(id: number) {
    return await this.findOne({
      where: { id },
      relations: ['recomment'],
    });
  }

  async createComment(createData: CreateCommentDto): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(createData);
      await queryRunner.commitTransaction();
    } catch (err){
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateComment(id: number, updateData: UpdateCommentDto): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(Comment, id, updateData);
      await queryRunner.commitTransaction();
    } catch (err){
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async deleteComment(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager
      .createQueryBuilder(Comment, 'comment')
      .delete()
      .from(Comment)
      .where("id = :id", { id })
      .execute()
      
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateLiketComment(id: number, likeData: LikeCommentDto) {
    const comment: Comment = plainToInstance(Comment, likeData);
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(Comment, id, likeData);
      await queryRunner.commitTransaction();
      return comment;
    } catch (err){
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
