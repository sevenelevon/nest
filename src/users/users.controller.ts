import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel, Post as PostModel, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';


@Controller('users')
export class UsersController { constructor(
    private readonly usersService: UsersService,
    ) {}

    // @Post('sign-up')
    // async regUser(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    //   return this.usersService.signUp(createUserDto);
    // }

    // @Post('sign-in')
    // async signIn(
    // @Body() loginUserDto: LoginUserDto, 
    // @Res() res: Response
    // ) {
    //   const user = await this.usersService.signIn(loginUserDto);

    //   res.statusCode = HttpStatus.OK;
    //   return res.send({email: user.email});
    // }


    // @Get(':id')
    // async findOne(@Param('id', ParseIntPipe) id: number) {
    //   const article = await this.usersService.findOne(id);
  
    //   if (!article) {
    //     throw new NotFoundException(`Could not find article with ${id}.`);
    //   }
    //   return article;
    // }
  }