import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from '../services/notes.service';
import { Note } from '@prisma/client';
import { NoteContentDto } from '../dtos/notes.dto';
import { NotFoundException } from '@nestjs/common';

describe('NotesController', () => {
  let controller: NotesController;
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<NotesController>(NotesController);
    service = module.get<NotesService>(NotesService);
  });

  describe('findAll', () => {
    it('should return an array of notes', async () => {
      const mockNotes: Note[] = [
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
      service.findAll = jest.fn().mockResolvedValue(mockNotes);

      expect(await controller.findAll()).toBe(mockNotes);
      expect(service.findAll).toHaveBeenCalled();
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
      service.findOne = jest.fn().mockResolvedValue(mockNote);

      const result = await controller.findOne(1);
      expect(result).toEqual(mockNote);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if no note is found', async () => {
      service.findOne = jest.fn().mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('create', () => {
    it('should create and return the note', async () => {
      const noteDto: NoteContentDto = { title: 'Test', body: 'Test body' };
      const mockNote: Note = {
        id: 1,
        title: 'Test',
        body: 'Test body',
        pinned: false,
        bgColor: '#ffffff',
        bgImage: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.create = jest.fn().mockResolvedValue(mockNote);

      expect(await controller.create(noteDto)).toBe(mockNote);
      expect(service.create).toHaveBeenCalledWith(noteDto);
    });
  });

  describe('update', () => {
    it('should update and return the note', async () => {
      const noteDto: NoteContentDto = {
        title: 'Updated Title',
        body: 'Updated body',
      };
      const id = 1;
      const mockNote: Note = {
        id: 1,
        title: 'Test',
        body: 'Test body',
        pinned: false,
        bgColor: '#ffffff',
        bgImage: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.update = jest.fn().mockResolvedValue(mockNote);

      expect(await controller.update(id, noteDto)).toBe(mockNote);
      expect(service.update).toHaveBeenCalledWith(id, noteDto);
    });
  });

  describe('delete', () => {
    it('should delete and return the note', async () => {
      const id = 1;
      const mockNote: Note = {
        id: 1,
        title: 'Test',
        body: 'Test body',
        pinned: false,
        bgColor: '#ffffff',
        bgImage: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      service.delete = jest.fn().mockResolvedValue(mockNote);

      expect(await controller.delete(id)).toBe(mockNote);
      expect(service.delete).toHaveBeenCalledWith(id);
    });
  });
});
