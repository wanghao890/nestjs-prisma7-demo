import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { QueryPostDto } from './dto/query-post.dto.js';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}
  async createPost(post: CreatePostDto) {
    const res = await this.prismaService.post.create({
      data: post,
    });
    return {
      success: true,
      message: '创建成功',
      data: res,
    };
  }
  async getPost(post: CreatePostDto) {
    const res = await this.prismaService.post.findMany({
      where: post,
      select: {
        title: true,
        content: true,
        author: true,
      },
    });
    return {
      success: true,
      message: '查询成功',
      data: res,
    };
  }
  async searchPost(query: QueryPostDto) {
    const { page = '1', pageSize = '10', title } = query;
    const skip = (Number(page) - 1) * Number(pageSize);
    const take = Number(pageSize);
    const where: any = {};
    if (title) {
      where.title = { contains: title, mode: 'insensitive' };
    }
    const res = await this.prismaService.$transaction([
      this.prismaService.post.count({ where }),
      this.prismaService.post.findMany({ where, skip, take }),
    ]);
    return {
      count: res[0],
      items: res[1],
    };
  }
}
