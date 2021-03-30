import { ChaptersModule } from '@chapters/chapters/chapters.module';
import { chapterData } from '@chapters/chapters/constants';
import { CharactersModule } from '@characters/characters/characters.module';
import { characterData } from '@characters/characters/constants';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Pre-Configure any dependent modules
export const configured = [
  CharactersModule.forRoot(characterData)
]

@Module({
  imports: [
    ...configured, // include configured modules into scope
    ChaptersModule.registerAsync({
      requires: configured, // pass configured modules
      useFactory: () => chapterData
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
