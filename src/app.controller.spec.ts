import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as fs from 'fs';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService)
  });

  it("calling getRandomQuote method", () => {
    const spy = jest.spyOn(appService, 'getRandomQuote');
    appController.getRandomQuote();
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  })

  it("calling getQuote method", () => {
    const spy = jest.spyOn(appService, 'getQuote');
    const id = 1;
    appController.getQuote(id);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(id);
    spy.mockClear();
  })
  
  it("calling getQuote method, exception", () => {
    const spy = jest.spyOn(appService, 'getQuote').mockImplementation(() => {
      throw new BadRequestException('');
    });
    const id = -1;
    expect(() => appController.getQuote(id)).toThrow();
    spy.mockClear();
  })

});

describe('AppService', () => {
  let appController: AppController;
  let appService: AppService
  let test_id = -1;
  let test_quotes = [
    {
      "quote": "quote 1",
    },
    {
      "quote": "quote 2",
    },
    {
      "quote": "quote 3",
    }
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(test_quotes))
  });

  it('getRandomQuote should return "quote 1"', () => {
      expect(appService.getRandomQuote()).toBe('quote 1');
  });

  it('getQuote should return "quote 2"', () => {
      expect(appService.getQuote(1)).toBe('quote 2');
  });

  it('getQuote should throw BadRequestException', () => {
      expect(() => appService.getQuote(test_id)).toThrow();
  })
});
