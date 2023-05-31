import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';


@Injectable()
export class AppService {
  quotes: string[]

  constructor() {
    this.quotes = JSON.parse(fs.readFileSync('src/data/office_quotes.json', 'utf-8'))
  }
  
  getRandomQuote(): string {
    const quotes = JSON.parse(fs.readFileSync('src/data/office_quotes.json', 'utf-8'))
    const randomIndex = Math.floor(Math.random() * quotes.length);

    const quote = quotes[randomIndex]
    return quote["quote"];
  }

  getQuote(id: number): string {
    const quotes = JSON.parse(fs.readFileSync('src/data/office_quotes.json', 'utf-8'))
    if (id < 0 || id >= quotes.length) {
      throw new BadRequestException('Invalid quote ID');
    }
    const quote = quotes[id];
    return quote["quote"];
  }
}
