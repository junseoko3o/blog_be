import { Content } from "src/content/content.entity";
import { Heart } from "src/heart/heart.entity";
import { Recomment } from "src/recomment/recomment.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column({
    default: 0,
  })
  like: number;

  @Column({ nullable: true })
  content_id: number;

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
  
  @ManyToOne(() => User, (user) => user.comment, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'created_user_id' }, { name: 'updated_user_id' }])
  user: User;

  @ManyToOne(() => Content, (content) => content.comment, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'content_id' }])
  content: Content;

  @OneToMany(() => Recomment, (recomment) => recomment.comment, { cascade: true })
  recomment: Recomment[];

  // @OneToMany(() => Heart, (heart) => heart.comment, { cascade: true })
  // heart: Heart[];

  @OneToOne(() => Heart,(heart) => heart.comment, { onDelete: 'CASCADE' })
  heart: Heart;
}
