import { Comment } from "src/comment/comment.entity";
import { Recomment } from "src/recomment/recomment.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Heart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  comment_id: number;

  @Column({ nullable: true })
  recomment_id: number;

  @Column({
    default: 0,
  })
  like: number;

  @OneToOne(() => Comment, (comment) =>  comment.heart, { cascade : true })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  @OneToOne(() => Recomment, (recomment) =>  recomment.heart, { cascade : true })
  @JoinColumn({ name: 'recomment_id' })
  recomment: Recomment;
}
