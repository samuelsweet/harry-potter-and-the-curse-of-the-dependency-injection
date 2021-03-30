import { DynamicModule, Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CHAPTERS } from './constants';
import { IChaptersAsyncConfig } from './interfaces';

@Module({})
export class ChaptersModule {
  static registerAsync(config: IChaptersAsyncConfig) : DynamicModule{

    const provider = {
      provide: CHAPTERS,
      useFactory: config.useFactory,
      inject: config.inject || [],
    }

    return {
      module: ChaptersModule,
      imports: [...config.requires || []], // import pre-configured
      providers: [provider, ChaptersService],
      exports: [ChaptersService]
    }
  }

}

