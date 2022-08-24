import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

type JwtPayload = {
    sub: string;
    email: string;
}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'Jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'at-secret',
        });
    }

    validate(payload: JwtPayload) {
        return payload;
    }
}