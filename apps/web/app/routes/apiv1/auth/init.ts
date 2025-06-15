import type { Route } from ".react-router/types/app/+types/root";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "react-router";
import { updateInitUser, updateInitUserFormSchema } from "~/repos/user";

export type InitActionType = typeof action;

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: updateInitUserFormSchema });

  if (submission.status !== "success") {
    return {
      success: false,
      message: "error!",
      submission: submission.reply({
        formErrors: ["ユーザー作成に失敗しました"]
      })
    };
  }

  await updateInitUser(context.hono.context.get("db"), {
    username: submission.value.username,
    displayName: submission.value.displayName,
    email: context.hono.context.get("user").email!,
  });

 
  return redirect("/appli/");
}