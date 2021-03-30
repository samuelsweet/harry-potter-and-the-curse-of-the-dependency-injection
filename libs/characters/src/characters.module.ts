import { DynamicModule, Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CHARACTERS } from './constants';
import { ICharactersAsyncConfig } from './interfaces';

@Module({})
export class CharactersModule {
  static forRootAsync( config: ICharactersAsyncConfig) : DynamicModule {

    const provider = {
			provide: CHARACTERS,
			useFactory: config.useFactory,
			inject: config.inject || [],
		}

    return {
      module: CharactersModule,
      providers: [provider, CharactersService],
      exports: [CharactersService]
    }

  }
}
