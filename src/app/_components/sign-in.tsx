import { signIn } from "~/server/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("discord");
      }}
    >
      <button type="submit" className="bg-background-50 m-4 w-64 rounded-md">
        Signin with Discord
      </button>
    </form>
  );
}
