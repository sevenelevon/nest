
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt'
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
    ) {}

  async signupLocal(authDto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(authDto.password); //Хеширует пароль внесенный через клиентский post запрос

    const newUser = await this.prisma.user.create({
      data: {
        email: authDto.email,
        name: authDto.name,
        hash,  //Вносит в таблицу захешированный парроль, который прежде всего помещается в консту метод hashData его обрабатывает 
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email)
    await this.updateRefreshTokenHash(newUser.id, newUser.email)
    return tokens;
  }

  async signinLocal(loginAuthDto: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginAuthDto.email
      }
    })

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await bcrypt.compare(loginAuthDto.password, user.hash)
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email)
    await this.updateRefreshTokenHash(user.id, user.email);
    return tokens;
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null
      }
    });
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id:userId
      }
    })
    if (!user) throw new ForbiddenException('Acces Denied');

    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.hashedRt);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
  }

  async updateRefreshTokenHash(userId: number, refreshToken: string) { //Метод обновления токена
    const hash = await this.hashData(refreshToken)
    await this.prisma.user.update({                        //Обновление по id
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      }
    })
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10) // Соль 10 - усложение хеш функции- преобразователь данных в битовую строку
  }

  async getTokens(userId: number, email:string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 're-secret',
          expiresIn: 60 * 15,
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}