import { Controller, Get, Query, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('math')
export class AppController {
  constructor(@Inject('MATH_SERVICE') private readonly client: ClientProxy) {}

  @Get('sum')
  async sum(@Query('a') a: number, @Query('b') b: number) {
    return "HELLO TEST" + a + b;
    // await firstValueFrom(
    //   this.client.send({ cmd: 'sum' }, [Number(a), Number(b)]),
    // );
  }
}
