import { ICharacter } from "@characters/characters/interfaces";
import { Type } from "@nestjs/common";

export interface IChapter {
    title: string
}

export interface IChaptersAsyncFactory {
    create(): Promise<ICharacter> | ICharacter
}

export interface IChaptersAsyncConfig {
    useExisting?: Type<IChaptersAsyncFactory>
    useClass?: Type<IChaptersAsyncFactory>
    useFactory?: () => IChapter[]
    inject?: any[],
    requires?: any[]
}

