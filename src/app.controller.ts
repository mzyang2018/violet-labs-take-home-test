import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRandomQuote(): string {
    return this.appService.getRandomQuote();
  }

  @Get(':id')
  getQuote(@Param('id', ParseIntPipe) id: number): string {
    return this.appService.getQuote(id);
  }
}
