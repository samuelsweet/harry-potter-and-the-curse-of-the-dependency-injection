import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SpelunkerModule } from 'nestjs-spelunker'

async function bootstrap() {
	// const poop = await SpelunkerModule.debug(PreConfigure)
	// console.log(JSON.stringify(poop))
	const app = await NestFactory.create(AppModule)
	// COMMENT BELOW TO OUTPUT an IDEA of the DI SETUP
	console.log(JSON.stringify(SpelunkerModule.explore(app)))
  await app.listen(3000);
}
bootstrap();
