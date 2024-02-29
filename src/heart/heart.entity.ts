import { Comment } from "src/comment/comment.entity";
import { Recomment } from "src/recomment/recomment.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Heart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  comment_id: number;

  @Column({ nullable: true })
  recomment_id: number;

  @Column({
    default: false,
  })
  like: boolean;

  @Column()
  user_id: number;

  @ManyToOne(() => Comment, (comment) => comment.heart, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'comment_id' }])
  comment: Comment;

  @ManyToOne(() => Recomment, (recomment) => recomment.heart, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'recomment_id' }])
  recomment: Recomment;
}
