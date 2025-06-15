import { Form } from "react-router";

export default function SignIn() {
  return (
    <div>
      <Form method="post" action="/api/auth/signin">
        <button type="submit">Sign In</button>
      </Form>
    </div>
  );
}