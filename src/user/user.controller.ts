import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {

    return this.userService.login(loginUserDto.email, loginUserDto.password);
  }

  @Get()
  findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user: User = await this.userService.findOne(+id);
      if (user === null) {
        throw new Error("User not found");
      }
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
