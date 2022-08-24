import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Tokens } from './types/tokens.types';
import { Request } from 'express'
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}

    @Post('/local/signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() authDto: AuthDto): Promise<Tokens> {
        return this.authService.signupLocal(authDto);
    }

    @Post('/local/signin')
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body() loginAuthDto: LoginAuthDto ) {
       return this.authService.signinLocal(loginAuthDto);
    }

    @UseGuards(AccessTokenGuard)
    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logout(@Req() req: Request) {
        const user = req.user;
        return this.authService.logout(user['sub']);
    }

    @UseGuards(RefreshTokenGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(@Req() req: Request) {
       const user = req.user;
       return this.authService.refreshToken(user['sub'], user['refreshToken']);
    }
}
