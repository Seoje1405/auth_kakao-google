import { signIn } from "./../app/auth";

export default function SignInKakao() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("kakao", { redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="bg-yellow-400 text-black px-4 py-2 rounded font-bold"
      >
        카카오 로그인
      </button>
    </form>
  );
}
