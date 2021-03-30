import { ChaptersModule } from '@chapters/chapters/chapters.module';
import { chapterData } from '@chapters/chapters/constants';
import { CharactersModule } from '@characters/characters/characters.module';
import { characterData } from '@characters/characters/constants';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


export const sharedImports = [
  CharactersModule.forRoot(characterData)
]

@Module({
  imports: [
    ...sharedImports,
    ChaptersModule.registerAsync({
      imports: sharedImports,
      useFactory: () => chapterData
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
