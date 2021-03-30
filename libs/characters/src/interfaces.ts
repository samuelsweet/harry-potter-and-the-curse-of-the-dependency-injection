import { Type } from '@nestjs/common';

export interface ICharacter {
  name: string;
  description: string;
  chapters: number[];
}

export type ICast = Record<string, ICharacter>;

export interface ICharactersAsyncFactory {
  create(): Promise<ICharacter> | ICharacter;
}

export interface ICharactersAsyncConfig {
  useExisting?: Type<ICharactersAsyncFactory>;
  useClass?: Type<ICharactersAsyncFactory>;
  useFactory?: () => ICast;
  inject?: any[];
}
