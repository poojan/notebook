import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [NotesService, PrismaService],
  controllers: [NotesController],
  exports: [NotesService],
})
export class NotesModule {}
