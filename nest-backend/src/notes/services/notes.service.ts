import { randCatchPhrase, randParagraph } from '@ngneat/falso';
import { Injectable } from '@nestjs/common';
import { NoteType } from '../../lib/types/note.type';

const notes: NoteType[] = [
  {
    id: 1,
    title: randCatchPhrase(),
    body: randParagraph(),
    pinned: true,
    bgColor: '#ffffff',
    bgImage: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: randCatchPhrase(),
    body: randParagraph(),
    pinned: true,
    bgColor: '#ffffff',
    bgImage: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: randCatchPhrase(),
    body: randParagraph(),
    pinned: true,
    bgColor: '#ffffff',
    bgImage: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Injectable()
export class NotesService {
  constructor() {}

  async findAll(): Promise<NoteType[]> {
    return notes;
  }
}
