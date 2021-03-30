import { ChaptersModule } from '@chapters/chapters/chapters.module';
import { chapterData } from '@chapters/chapters/constants';
import { CharactersModule } from '@characters/characters/characters.module';
import { CharactersService } from '@characters/characters/characters.service';
import { characterData } from '@characters/characters/constants';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    CharactersModule.forRootAsync({
      useFactory: () => characterData
    }),
    ChaptersModule.registerAsync({
      useFactory: () => chapterData
    })
  ],
  controllers: [AppController],
  providers: [AppService, CharactersService],
})
export class AppModule {}
