import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Note } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

describe('NotesService', () => {
  let service: NotesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const notesMockData: Note[] = [
      {
        id: 1,
        title: 'Test note',
        body: 'Test note body',
        pinned: false,
        bgColor: '#ffffff',
        bgImage: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'Test note 2',
        body: 'Test note body 2',
        pinned: false,
        bgColor: '#ffffff',
        bgImage: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: PrismaService,
          useValue: {
            note: {
              findMany: jest.fn().mockResolvedValue(notesMockData),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('should return an array of notes', async () => {
      const mockNotes = [{ id: 1, title: 'Test Note', body: 'Test Note Body' }];
      prismaService.note.findMany = jest.fn().mockResolvedValue(mockNotes);

      const notes = await service.findAll();
      expect(notes).toEqual(mockNotes);
      expect(prismaService.note.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a note if it exists', async () => {
      const mockNote: Note = {
        id: 1,
        title: 'Sample Note',
        body: 'This is a note',
        pinned: false,
        bgColor: '#FFFFFF',
        bgImage: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaService.note.findUnique = jest.fn().mockResolvedValue(mockNote);

      const result = await service.findOne(1);
      expect(result).toEqual(mockNote);
      expect(prismaService.note.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw a NotFoundException if no note is found', async () => {
      prismaService.note.findUnique = jest.fn().mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaService.note.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe('create', () => {
    it('should create a new note', async () => {
      const noteDto = { title: 'New Note Title', body: 'New Note Body' };
      const mockNote = { id: 1, ...noteDto };
      prismaService.note.create = jest.fn().mockResolvedValue(mockNote);

      const note = await service.create(noteDto);
      expect(note).toEqual(mockNote);
      expect(prismaService.note.create).toHaveBeenCalledWith({ data: noteDto });
    });
  });

  describe('update', () => {
    it('should update a note', async () => {
      const noteDto = { title: 'Updated Note', body: 'Updated Note Body' };
      const mockNote = { id: 1, ...noteDto };
      prismaService.note.update = jest.fn().mockResolvedValue(mockNote);

      const updatedNote = await service.update(1, noteDto);
      expect(updatedNote).toEqual(mockNote);
      expect(prismaService.note.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: noteDto,
      });
    });

    it('should throw NotFoundException for non-existing note', async () => {
      prismaService.note.update = jest
        .fn()
        .mockRejectedValue(new NotFoundException());
      await expect(
        service.update(999, {
          title: 'Updated Note',
          body: 'Updated Note Body',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a note', async () => {
      const mockNote = {
        id: 1,
        title: 'Note to delete',
        body: 'Note to delete',
      };
      prismaService.note.delete = jest.fn().mockResolvedValue(mockNote);

      const deletedNote = await service.delete(1);
      expect(deletedNote).toEqual(mockNote);
      expect(prismaService.note.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException for non-existing note', async () => {
      prismaService.note.delete = jest
        .fn()
        .mockRejectedValue(new NotFoundException());
      await expect(service.delete(999)).rejects.toThrow(NotFoundException);
    });
  });
});
