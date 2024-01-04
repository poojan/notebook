import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Note } from '@prisma/client';
import { CreateNoteDto } from '../dtos/notes.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Note[]> {
    return this.prisma.note.findMany();
  }

  async create(data: CreateNoteDto): Promise<Note> {
    return this.prisma.note.create({ data });
  }
}
