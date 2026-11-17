import { Injectable } from '@nestjs/common';
import { CreateUser } from './dto/create-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser(user: CreateUser) {
    const res = await this.prismaService.user.create({
      data: user,
    });
    return {
      success: true,
      message: '创建成功',
      data: res,
    };
  }
  async updateUser(user: UpdateUserDto) {
    const res = await this.prismaService.user.update({
      data: user,
      where: { id: user.id },
    });
    return {
      success: true,
      message: '修改成功',
      data: res,
    };
  }
  async getUser(user: CreateUser) {
    const res = await this.prismaService.user.findMany({
      where: user,
      select: {
        name: true,
        email: true,
        posts: {
          select: {
            title: true,
          },
        },
      },
    });
    return {
      success: true,
      message: '查询成功',
      data: res,
    };
  }
  async deleteUser(id: string) {
    const res = await this.prismaService.user.delete({
      where: { id },
    });
    return {
      success: true,
      message: '删除成功',
      data: res,
    };
  }
}
