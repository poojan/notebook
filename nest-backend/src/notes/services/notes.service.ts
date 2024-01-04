import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Note } from '@prisma/client';
import { NoteContentDto } from '../dtos/notes.dto';
import { handlePrismaError } from 'src/prisma/prisma.error';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Note[]> {
    return this.prisma.note.findMany();
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.prisma.note.findUnique({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note with ID: ${id} not found`);
    }
    return note;
  }

  async create(data: NoteContentDto): Promise<Note> {
    return this.prisma.note.create({ data });
  }

  async update(id: number, data: NoteContentDto): Promise<Note> {
    return this.handlePrismaOperation(() =>
      this.prisma.note.update({ where: { id }, data }),
    );
  }

  async delete(id: number): Promise<Note> {
    return this.handlePrismaOperation(() =>
      this.prisma.note.delete({ where: { id } }),
    );
  }

  private async handlePrismaOperation(
    operation: () => Promise<Note>,
  ): Promise<Note> {
    try {
      return await operation();
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any, id?: number) {
    const handledError = handlePrismaError('Note', error, id);
    if (handledError) throw handledError;
    throw error;
  }
}
