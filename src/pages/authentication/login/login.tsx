import { Helmet } from "react-helmet-async";
import LoginForm from "./loginForm";

function login() {
  return (
    <>
      <Helmet>
        <html dir="ltr" className="h-full"></html>
        {/* <body className="authentication-page"></body> */}
      </Helmet>
      <main className="w-screen h-screen flex items-center">
        <section className="mx-auto w-1/3 rounded-xl max-w-lg border-primary border-2 py-10 px-5  bg-white">
          <div className="divide-y divide-solid d space-y-6">
            <h1 className="text-center font-bold text-3xl">Elite Consulting</h1>
            <LoginForm />
          </div>
        </section>
      </main>
    </>
  );
}

export default login;
