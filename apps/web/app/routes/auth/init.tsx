import { Form, redirect } from "react-router";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { updateInitUser } from "~/repos/user";
import type { Route } from "../../+types/root";
import { z } from "zod";

const updateInitUserFormSchema = z.object({
  username: z.string({ required_error: "ユーザ名は必須です"}).min(1),
  displayName: z.string({ required_error: "表示名は必須です"}).min(1),
});

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: updateInitUserFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await updateInitUser(context.hono.context.get("db"), {
    username: submission.value.username,
    displayName: submission.value.displayName,
    email: context.hono.context.get("user").email!,
  });

  return redirect("/appli/");
}

export default function Init() {
  const [ form, { username, displayName } ] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateInitUserFormSchema });
    },
  });
  return (
    <Form method="post" {...getFormProps(form)}>
      <div>
        <label>ユーザ名</label>
        <input {...getInputProps(username, { type: "text" })} />
        {username.errors && (
          <div>
            {username.errors.map((e, index) => (
              <p key={index}>{e}</p>
            ))}
          </div>
        )}
      <label>表示名</label>
        <input {...getInputProps(displayName, { type: "text" })} />
        {displayName.errors && (
          <div>
            {displayName.errors.map((e, index) => (
              <p key={index}>{e}</p>
            ))}
          </div>
        )}
      </div>
      <button type="submit">登録</button>
    </Form>
  );
}
