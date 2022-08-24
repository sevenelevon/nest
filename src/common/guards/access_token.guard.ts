import { AuthGuard } from "@nestjs/passport"

export class AccessTokenGuard extends AuthGuard('Jwt') {
    constructor() {}
    super();
}