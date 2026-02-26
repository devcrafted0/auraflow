"use client";
import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { State } from "@/actions/create-board";

const Form = () => {
  const initialValue: State = { message: null, errors: {} };
  const [state, dispatch] = useActionState(createBoard, initialValue);
  return (
    <form action={dispatch}>
      <div className="flex flex-col gap-y-2">
        <input
          type="text"
          name="title"
          placeholder="Enter your text"
          className="border-2 border-black p-3"
        />
      </div>
      {state?.errors?.title?.map((error, i) => (
        <p className="text-rose-500 space-y-2" key={i}>
          {error}
        </p>
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
