import { auth, signOut } from "./auth";
import SignInKakao from "../components/sign-in-kakao";
import SignInGoogle from "../components/sign-in-google";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-2xl font-bold mb-4">로그인이 필요합니다</h1>

        <div className="flex gap-2">
          <SignInKakao />
          <SignInGoogle />
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">환영합니다, {session.user?.name}님!</h1>

      {session.user?.image && (
        <img
          src={session.user.image}
          alt="프로필"
          className="w-20 h-20 rounded-full mt-4 border"
        />
      )}

      <div className="mt-4">
        <p className="text-gray-600">이메일: {session.user?.email}</p>
      </div>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 mt-6 rounded hover:bg-red-600"
        >
          로그아웃
        </button>
      </form>
    </div>
  );
}
