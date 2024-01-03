import { randCatchPhrase, randParagraph } from "@ngneat/falso";
import Note, { NoteType } from "./Note";

const notes: NoteType[] = [
  {
    id: 1,
    title: randCatchPhrase(),
    body: randParagraph(),
    pinned: true,
    bgColor: "#ffffff",
    bgImage: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: randCatchPhrase(),
    body: randParagraph(),
    pinned: true,
    bgColor: "#ffffff",
    bgImage: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: randCatchPhrase(),
    body: randParagraph(),
    pinned: true,
    bgColor: "#ffffff",
    bgImage: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function Notes() {
  return (
    <div>
      {notes.map((note: NoteType) => (
        <div key={note.id} className="m-2">
          <Note note={note} />
        </div>
      ))}
    </div>
  );
}

export default Notes;
