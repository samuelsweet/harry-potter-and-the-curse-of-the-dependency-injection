import { Inject, Injectable, Logger } from '@nestjs/common';
import { CHARACTERS } from './constants';
import { ICast } from './interfaces';

@Injectable()
export class CharactersService {

    constructor(@Inject(CHARACTERS) private readonly characters: ICast) {
        for( const [key, char] of Object.entries(this.characters) ) {
            Logger.verbose(char.description, key)
        }
    }

    inChapter( index: number ) {
        return Object.values(this.characters).filter( char => char.chapters.includes(index)).map( char => char.name).join(', ')
    }
}
