import { Comment } from "src/comment/comment.entity";
import { Content } from "src/content/content.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Recomment {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  recomment: string;

  @Column({ nullable: true })
  content_id: number;

  @Column({ nullable: true })
  comment_id: number;

  @Column()
  user_name: string;

  @Column({ nullable: true })
  created_user_id: number;

  @Column({ nullable: true })
  updated_user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
  @ManyToOne(() => User, (user) => user.recomment, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'created_user_id' }, { name: 'updated_user_id' }])
  user: User;

  @ManyToOne(() => Content, (content) => content.recomment, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'content_id' }])
  content: Content;

  @ManyToOne(() => Comment, (comment) => comment.recomment, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'comment_id' }])
  comment: Comment;
}
