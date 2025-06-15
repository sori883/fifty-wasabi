import { Form } from "react-router";

export function SignInForm () {
  return (
    <Form method="post" action="/api/auth/signin">
      <button type="submit" className="cursor-pointer">Sign In</button>
    </Form>
  );
}