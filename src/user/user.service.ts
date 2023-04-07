import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm'
import { User } from './entities/user.entity';
import { InjectRepository } from "@nestjs/typeorm"
@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }


  create(createUserDto: CreateUserDto): Promise<User> {
    let user: User = new User();
    // console.log(createUserDto);
    if (createUserDto.cpassword !== createUserDto.password)
      throw new Error("Password Cannot match by Confrom Password");

    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {

    return this.userRepository.findOne({ where: { userid: id } });


  }

  update(userid: number, updateUserDto: UpdateUserDto) {
    let user: User = new User();
    if (updateUserDto.cpassword !== updateUserDto.password)
      throw new Error("Password Cannot match by Confrom Password");
    user.userid = userid;
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    return this.userRepository.save(user);
  }

  login(email: string, password: string): Promise<User[]> {
    console.log("email --> ", email, password);
    return this.userRepository.find({ where: { email: email, password: password } });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
