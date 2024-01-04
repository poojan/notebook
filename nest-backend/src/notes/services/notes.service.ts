import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Note } from '@prisma/client';
import { NoteContentDto } from '../dtos/notes.dto';
import { handlePrismaError } from 'src/prisma/prisma.error';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Note[]> {
    return await this.prisma.note.findMany();
  }

  async create(data: NoteContentDto): Promise<Note> {
    return await this.prisma.note.create({ data });
  }

  async update(id: number, data: NoteContentDto): Promise<Note> {
    try {
      return await this.prisma.note.update({ where: { id }, data });
    } catch (error) {
      const handledError = handlePrismaError('Note', error, id);
      if (handledError) throw handledError;
      throw error;
    }
  }

  async delete(id: number): Promise<Note> {
    try {
      return await this.prisma.note.delete({ where: { id } });
    } catch (error) {
      const handledError = handlePrismaError('Note', error, id);
      if (handledError) throw handledError;
      throw error;
    }
  }
}
