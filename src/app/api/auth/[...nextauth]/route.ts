import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Dados inválidos");
        }

        // --- MOCK DE DEMONSTRAÇÃO (Para a Vercel não falhar por falta do SQLite) ---
        if (credentials.email === "professor@biovorazes.com" && credentials.password === "senha123") {
          return { id: "1", name: "Prof. Charles", email: "professor@biovorazes.com", role: "TEACHER" };
        }
        if (credentials.email === "prof.lafa@gmail.com" && credentials.password === "lilica10") {
          return { id: "3", name: "Prof. Lafa", email: "prof.lafa@gmail.com", role: "TEACHER" };
        }
        if (credentials.email === "aluno@email.com" && credentials.password === "senha123") {
          return { id: "2", name: "Aluno Curioso", email: "aluno@email.com", role: "STUDENT" };
        }
        // --------------------------------------------------------------------------

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          throw new Error("Usuário não encontrado");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Senha incorreta");
        }

        // Retorna os dados que ficarão salvos na sessão
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "supersecret123",
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
