import { Controller, Get, HttpCode, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { CostsService } from './costs.service';

@Controller('cost')
export class CostsController {
    constructor(
        private readonly costsService: CostsService,
        private readonly authService: AuthService,
    ) {}
    
    @UseGuards(JWTGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllCosts(@Req() req, @Res() res) {
        const token = req.token;

        const user = await this.authService.getUserByTokenData(token);
        const costs = await this.costsService.findAll();
        const filteredCosts = costs.filter(
            (cost) => cost.userId === user._id.toString(),
            );

            return res.send(filteredCosts);
    }
}
