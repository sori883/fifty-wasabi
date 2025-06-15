import { useFetcher } from "react-router";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import type { InitActionType } from "~/routes/apiv1/auth/init";
import { z } from "zod";


// 定義しないと動かないため、こちらで定義
const updateInitUserFormSchema = z.object({
  username: z.string({ required_error: "ユーザ名は必須です"}).min(1),
  displayName: z.string({ required_error: "表示名は必須です"}).min(1),
});

export function InitForm () {
  const init = useFetcher<InitActionType>();

  const [ form, { username, displayName }, ] = useForm({
    lastResult: init.data?.submission,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateInitUserFormSchema });
    },
  });

  return (
    <init.Form method="post" {...getFormProps(form)} action="/api/auth/init">
        {form.errors && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          {form.errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
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
    </init.Form>
  );
}