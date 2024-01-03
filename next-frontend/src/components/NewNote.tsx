"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCallback, useRef, useState } from "react";

function NewNoteInput(props: NewNoteInputProps) {

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
        <div className="my-1">
          <Input
            placeholder="Title"
            className="border-none border-collapse focus:outline-none focus-visible:ring-0 rounded-none"
            ref={titleRef}
          />
        </div>
      )}
      <div className="my-1">
        <Input
          placeholder="Take a note..."
          className="border-none border-collapse focus:outline-none focus-visible:ring-0 rounded-none"
        />
      </div>
    </Card>
  );

  return isFocused ? (
    <div
      className="w-[350px] cursor-pointer bg-gray-100"
      tabIndex={0}
      // onFocus={onFocusNewNote}
      onBlur={onBlurNewNote}
      ref={containerRef}
    >
      {/* {isFocused && ()} */}
      <div className="my-1">
        <Input placeholder="Title" className="border-none" ref={titleRef} />
      </div>
      <div className="my-1">
        <Input placeholder="Take a note..." className="border-none" />
      </div>
    </div>
  ) : (
    <div
      className="w-[350px] cursor-pointer bg-gray-100"
      tabIndex={0}
      onFocus={onFocusNewNote}
      // onBlur={onBlurNewNote}
      ref={containerRef}
    >
      <div className="my-1">
        <Input placeholder="Take a note..." className="border-none" />
      </div>
    </div>
  );
}

export default NewNote;
