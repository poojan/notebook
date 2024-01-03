"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Ref, useCallback, useRef, useState } from "react";

type NewNoteInputProps = {
  ref?: Ref<HTMLInputElement>;
  placeholder: string;
};

const NewNoteInput = (props: NewNoteInputProps) => {
  return (
    <div className="my-1">
      <Input
        placeholder={props.placeholder}
        className="border-none border-collapse focus:outline-none focus-visible:ring-0 rounded-none"
        ref={props.ref}
      />
    </div>
  );
}

function NewNote() {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  const onFocusNewNote = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlurNewNote = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setTimeout(() => {
        if (
          containerRef.current &&
          !(containerRef.current as HTMLElement).contains(event.relatedTarget)
        ) {
          setIsFocused(false);
        }
      }, 0);
    },
    []
  );

  return (
    <Card
      className="w-[350px] cursor-pointer p-4"
      tabIndex={0}
      onFocus={onFocusNewNote}
      onBlur={onBlurNewNote}
      ref={containerRef}
    >
      {isFocused && (
        <NewNoteInput placeholder="Title" ref={titleRef} />
      )}
      <div className="my-1">
        <NewNoteInput placeholder="Take a note..." />
      </div>
    </Card>
  );
}

export default NewNote;
