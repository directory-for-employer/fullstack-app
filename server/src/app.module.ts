import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GenreModule } from './genre/genre.module';
import { FileModule } from './file/file.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, AuthModule, GenreModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
