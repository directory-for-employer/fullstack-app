import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    const data = this.configService.get<string>('DATABASE_URL');
    console.log(data);
    return 'Hello World!';
  }
}
