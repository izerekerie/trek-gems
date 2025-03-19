import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handlers = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  debug: true,
  // pages: { signIn: "/login" }, // redirect here anytimt its not auth
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user && account) {
        console.debug("Initial signin");
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },

    async session(session, token) {
      // session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
    // async redirect({ baseUrl }) {
    //   // Redirect to a custom page after login
    //   return `${baseUrl}`; // Change this to your desired page
    // },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password", placeholder: "****" },
      },

      authorize: async (credentials) => {
        const { email, password } = credentials;
        // database

        const user = {
          name: "John Doe",
          email: "",
          image: "",
        };
        return user;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
});

export { handlers as GET, handlers as POST };
