import { Form } from "react-router";
import { AppliBase } from "~/components/layout";

export default function Index() {
  return (
    <AppliBase>
      <div>
        <Form method="post" action="/api/auth/signout">
          <button type="submit">Sign Out</button>
        </Form>
      </div>
    </AppliBase>
  );
}