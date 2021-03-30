# LeviOsa or Leviosaaa?
The wizardry needed to create sibling dependencies [DynamicModules](https://docs.nestjs.com/fundamentals/dynamic-modules) in [NestJs](http://nestjs.com)

Very likely my own misunderstanding, or maybe a shortcoming of the DI in NestJs or the documentation, I found that creating a configurable module that imported sibling can consume did my utter nut in. The [broken branch](../../tree/Broken) demonstrates how I understood the DI to work (but it did not) while the `master` is how I managed to do it.

While this is a simplfied project to illustrate, I can't help but think this is an area that could be improved on (or at least made clearer in the documentation). Common real-world useage would be Database modules, configuration modules, etc... often worked around by making the module `@Global` (which feels... dirty?)

## Leviosaaa


Creating a configurable module is fairly straight forward:
- add static methods to module
- configure and return a [DynamicModule](https://docs.nestjs.com/fundamentals/dynamic-modules)

```typescript
@Module({})
export class CharactersModule {
  static forRootAsync(config: ICharactersAsyncConfig): DynamicModule {
    const provider = {
      provide: CHARACTERS,
      useFactory: config.useFactory,
      inject: config.inject || [],
    };

    return {
      module: CharactersModule,
      providers: [provider, CharactersService],
      exports: [CharactersService],
    };
  }
}
```
The problem I ran into is when another DynamicModule depends on the configured version
```typescript
@Module({})
export class ChaptersModule {
  static registerAsync(config: IChaptersAsyncConfig): DynamicModule {
    const provider = {
      provide: CHAPTERS,
      useFactory: config.useFactory,
      inject: config.inject || [],
    };

    return {
      module: ChaptersModule,
      imports: [CharactersModule],
      providers: [provider, ChaptersService],
      exports: [ChaptersService],
    };
  }
}
```
Which I would have HOPED would be wired up here:
```typescript
@Module({
  imports: [
    CharactersModule.forRootAsync({
      useFactory: () => characterData,
    }),
    ChaptersModule.registerAsync({
      useFactory: () => chapterData,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CharactersService],
})
export class AppModule {}
```

However NestJS doesn't appear to share module exports with siblings so you end up with this message:
```bash
Error: Nest can't resolve dependencies of the ChaptersService (CHAPTERS, ?). Please make sure that the argument CharactersService at index [1] is available in the ChaptersModule context.
```

## LeviOsa

This is the only way I have found to make this work. No idea if its the correct way

- Add an optional `requires?: any[]` to the async interface
- Destruct into the returning DynamicModule
```typescript
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
```

Then in the consuming module, capture the dependency into a seperate variable

```typescript
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
```
