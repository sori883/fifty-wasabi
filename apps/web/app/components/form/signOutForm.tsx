import { Form } from "react-router";

export function SignOutForm () {
  return (
  <Form method="post" action="/api/auth/signout">
    <button type="submit" className="cursor-pointer">Sign Out</button>
  </Form>
  );
}