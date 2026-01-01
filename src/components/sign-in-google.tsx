// components/sign-in-google.tsx
import { signIn } from "./../app/auth"; // auth.ts가 있는 경로에 맞춰주세요

export default function SignInGoogle() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50"
      >
        구글 로그인
      </button>
    </form>
  );
}
