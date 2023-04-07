import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    postid: number;

    @Column()
    title: string;

    @Column()
    image: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.posts, { eager: true })
    user: User;
}

