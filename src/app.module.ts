import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import{ MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './config/MongooseConfigService';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CostsController } from './costs/costs.controller';
import { CostsModule } from './costs/costs.module';
import configuration from './config/configuration';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UsersModule,
    AuthModule,
    CostsModule,
  ],
  // controllers: [CostsController],
  // controllers: [AppController, UsersController, AuthController],
  // providers: [AppService, UsersService],
})
export class AppModule {}
