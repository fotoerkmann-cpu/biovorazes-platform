import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions as any);

  if (!session) {
    redirect('/login');
  }

  // Verifica a Role (Professor vs Aluno)
  if ((session as any).user?.role === 'TEACHER') {
    redirect('/professor');
  } else {
    redirect('/dashboard');
  }
}
