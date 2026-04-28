import FormLogin from "@/components/auth/FormLogin";

const Login = () => {
  return (
    // <section className="grid min-h-svh lg:grid-cols-2">
    //   <div className="flex flex-1 items-center justify-center">
    //     <div className="w-full max-w-xs">

    //     </div>
    //   </div>

    //   <div className="relative hidden bg-lime-400 lg:block">
    //     <img
    //       src="/images/bg-login.png"
    //       alt="Image"
    //       className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
    //     />
    //   </div>
    // </section>
    <section className="flex">
      <div className="flex w-1/2 justify-center items-center">
        <FormLogin />
      </div>

      <div className="h-screen">
        <img
          src="/images/bg-login.png"
          alt="Image"
          className="h-full w-full object-cover object-center dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </section>
  );
};

export default Login;
