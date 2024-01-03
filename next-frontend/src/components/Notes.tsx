import Note, { NoteType } from "./Note";

function Notes() {
  const notes: NoteType[] = [
    {
      id: 1,
      title: "Note 1",
      body: "This is the body of note 1",
      pinned: true,
      bgColor: "#ffffff",
      bgImage: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: "Note 2",
      body: "This is the body of note 2",
      pinned: true,
      bgColor: "#ffffff",
      bgImage: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: "Note 3",
      body: "This is the body of note 3",
      pinned: true,
      bgColor: "#ffffff",
      bgImage: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <div>
      <h1>Notes</h1>
      <div>
        {notes.map((note: NoteType) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default Notes;
