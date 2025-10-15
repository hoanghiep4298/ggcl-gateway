import { Controller, Get, Query, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('math')
export class AppController {
  constructor(@Inject('MATH_SERVICE') private readonly client: ClientProxy) {}

  @Get('sum')
  async sum(@Query('a') a: number, @Query('b') b: number) {
    console.log(
      'Test env PORT, SECRET',
      process.env.APP_PORT,
      process.env.JWT_SECRET,
    );
    return await firstValueFrom(
      this.client.send('test.sum', [Number(a), Number(b)]),
    );
    // console.log('data', data);
    // return data?.total || 0;
  }
}
