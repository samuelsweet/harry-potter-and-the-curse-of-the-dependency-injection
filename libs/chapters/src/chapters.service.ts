import { CharactersService } from '@characters/characters/characters.service';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CHAPTERS } from './constants';
import { IChapter } from './interfaces';

@Injectable()
export class ChaptersService {
  constructor(
    @Inject(CHAPTERS) private readonly chapters: IChapter[],
    private readonly characters: CharactersService,
  ) {
    this.chapters.forEach((chapter, index) => {
      const title = `${chapter.title}. Featuring ${this.characters.inChapter(
        index,
      )}`;
      Logger.verbose(title, `Chapter ${index + 1}`);
    });
  }
}
