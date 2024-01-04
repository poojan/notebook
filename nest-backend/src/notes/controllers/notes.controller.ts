import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { NoteContentDto } from '../dtos/notes.dto';
import { Note } from '@prisma/client';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  async findAll(): Promise<Note[]> {
    return await this.notesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return await this.notesService.findOne(id);
  }

  @Post()
  async create(@Body() data: NoteContentDto): Promise<Note> {
    return await this.notesService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: NoteContentDto,
  ): Promise<Note> {
    return await this.notesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return await this.notesService.delete(id);
  }
}
