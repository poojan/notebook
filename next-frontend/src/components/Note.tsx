export type NoteType = {
  id: number;
  title: string;
  body: string;
  pinned: boolean;
  bgColor: string;
  bgImage: string;
  createdAt: Date;
  updatedAt: Date;
};

type Props = {
  note: NoteType;
};

function Note({ note }: Props) {
  return (
    <div>
      <h3>{note.title}</h3>
      <div>{note.body}</div>
    </div>
  );
}

export default Note;
