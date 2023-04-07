import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm'
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from "@nestjs/typeorm"
import { Between, Like } from 'typeorm';

@Injectable()
export class PostService {

  constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>, @InjectRepository(User) private readonly userRepository: Repository<User>) { }



  async create(createPostDto: CreatePostDto): Promise<Post> {
    let post: Post = new Post();
    post.title = createPostDto.title;
    post.description = createPostDto.description;
    post.image = createPostDto.image;
    post.createdAt = new Date();
    const findUser = await this.userRepository.findOne({ where: { userid: createPostDto.userid } });

    post.user = findUser

    return this.postRepository.save(post);
  }

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  findOne(id: number) {

    return this.postRepository.findOne({ where: { postid: id } });

  }

  update(id: number, updatePostDto: UpdatePostDto) {
    let post: Post = new Post();
    post.postid = id;
    post.title = updatePostDto.title;
    post.description = updatePostDto.description;
    post.image = updatePostDto.image;
    post.createdAt = new Date();


    return this.postRepository.save(post);
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }

  filter(startDateString: string, endDateString: string): Promise<Post[]> {

    const startDate = new Date(Date.parse(startDateString));
    const endDate = new Date(Date.parse(endDateString));

    const getAllPost: Promise<Post[]> = this.postRepository.find({
      where: {
        createdAt: Between(startDate, endDate)
      }
    });

    return getAllPost;

  }

  search(findTitle: string): Promise<Post[]> {
    return this.postRepository.find({ where: { title: Like(`%${findTitle}%`) } });
  }


}



