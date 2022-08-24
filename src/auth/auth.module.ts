import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies';
import { RefreshTokenStrategy } from './strategies/refresh_token.strategy';

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, RefreshTokenStrategy, AccessTokenStrategy]
  })
  export class AuthModule {}