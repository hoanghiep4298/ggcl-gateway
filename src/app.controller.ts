import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    // 👇 rất quan trọng: subscribe reply topic
    this.client.subscribeToResponseOf('test.sum');
    await this.client.connect();
  }

  @Get('sum')
  async sum(@Query('a') a: number, @Query('b') b: number) {
    const data: { total: number } = await lastValueFrom(
      this.client.send('test.sum', [Number(a), Number(b)]),
    );
    console.log('data', data);
    return data?.total || 0;
  }
}
