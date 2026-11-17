import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { PostService } from './post.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { QueryPostDto } from './dto/query-post.dto.js';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  //新增文章
  @Post('create')
  createPost(@Body() post: CreatePostDto) {
    return this.postService.createPost(post);
  }
  //查询文章
  @Post('get')
  getPost(@Body() post: CreatePostDto) {
    return this.postService.getPost(post);
  }

  //分页查询文章
  @Get('search')
  searchPost(@Query() query: QueryPostDto) {
    return this.postService.searchPost(query);
  }
}
