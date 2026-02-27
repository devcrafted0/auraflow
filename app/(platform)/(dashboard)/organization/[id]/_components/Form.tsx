"use client";
import { createBoard } from "@/actions/create-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";

const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "SUCCESS!");
    },
    onError: (data) => {
      console.error(data);
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
  };
  return (
    <form action={onSubmit}>
      <div className="flex flex-col gap-y-2">
        <FormInput id="title" errors={fieldErrors} />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
