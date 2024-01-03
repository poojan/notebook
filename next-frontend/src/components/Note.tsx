import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
    <Card className="w-[350px] cursor-pointer">
      <CardHeader className="py-2 font-medium">{note.title}</CardHeader>
      <CardContent className="text-sm">{note.body}</CardContent>
    </Card>
  );
}

export default Note;
