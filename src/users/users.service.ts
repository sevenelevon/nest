import { Injectable } from '@nestjs/common';
import { Post, Prisma, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
    constructor (
    private prisma: PrismaService,
) {}

    async findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
      }

    async signUp(data: Prisma.UserCreateInput): Promise<User> {
        const registration = await this.prisma.user.create({data})
        return registration
    }

    async signIn(loginUserDto: LoginUserDto): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: {email: loginUserDto.email} });
        
        if (!user) {
            return null;
        }

        return user;

    }  
    
    // async posts(params: {
    //     skip?: number;
    //     take?: number;
    //     cursor?: Prisma.PostWhereUniqueInput;
    //     where?: Prisma.PostWhereInput;
    //     orderBy?: Prisma.PostOrderByWithRelationInput;
    //   }): Promise<User[]> {
    //     const { skip, take, cursor, where, orderBy } = params;
    //     return this.prisma.user.findMany({
    //       skip,
    //       take,
    //       cursor,
    //       where,
    //       orderBy,
    //     });
    //   }
    

      // const postsByUser = await prisma.post.findMany({
      //   where: { author: { email: 'alice@prisma.io' } },
      // })
    // async create(createUserDto: CreateUserDto) {

    // }


    // async login(): Promise<> {
    //     return
    // }

    // async update(): Promise<> {
    //     return
    // }

    // async delete(): Promise<> {
    //     return
    // }
}
