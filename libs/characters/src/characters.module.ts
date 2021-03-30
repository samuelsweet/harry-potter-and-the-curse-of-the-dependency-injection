import { CHAPTERS } from '@chapters/chapters/constants';
import { DynamicModule, Module, ValueProvider } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CHARACTERS } from './constants';
import { ICast, ICharactersAsyncConfig } from './interfaces';

@Module({})
export class CharactersModule {

  static forRoot( config: ICast) : DynamicModule {

    const valueProvider : ValueProvider = {
      provide: CHARACTERS,
      useValue: config
    }

    return {
      module: CharactersModule,
      providers: [valueProvider, CharactersService],
      exports: [CharactersService]
    
    }
  }

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
