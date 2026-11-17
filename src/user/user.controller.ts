import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUser } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //新增用户
  @Post('create')
  createUser(@Body() user: CreateUser) {
    return this.userService.createUser(user);
  }

  //编辑用户
  @Post('update')
  updateUser(@Body() user: UpdateUserDto) {
    return this.userService.updateUser(user);
  }

  //查询用户
  @Post('get')
  getUser(@Body() user: CreateUser) {
    return this.userService.getUser(user);
  }

  //删除用户
  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
