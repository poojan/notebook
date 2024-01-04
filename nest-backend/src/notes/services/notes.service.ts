import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Note } from '@prisma/client';
import { NoteContentDto } from '../dtos/notes.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Note[]> {
    return this.prisma.note.findMany();
  }

  async create(data: NoteContentDto): Promise<Note> {
    return this.prisma.note.create({ data });
  }

  async update(id: number, data: NoteContentDto): Promise<Note> {
    return this.prisma.note.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Note> {
    return this.prisma.note.delete({ where: { id } });
  }
}
