import FormLogin from "@/components/FormLogin";

const Login = () => {
  return (
    // <section className="grid min-h-svh lg:grid-cols-2">
    //   <div className="flex flex-1 items-center justify-center">
    //     <div className="w-full max-w-xs">
    //       <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
    //         <FieldGroup>
    //           <div className="flex flex-col items-center gap-1 text-center">
    //             <h1 className="text-2xl font-bold">Stamina</h1>
    //           </div>

    //           <Field>
    //             <FieldLabel htmlFor="email">Email</FieldLabel>
    //             <Input
    //               id="email"
    //               type="email"
    //               placeholder="Enter Email Address"
    //               required
    //               {...register("email", {
    //                 required: "El correo es obligatorio",
    //               })}
    //             />
    //           </Field>

    //           <Field>
    //             <div className="flex items-center">
    //               <FieldLabel htmlFor="password">Password</FieldLabel>
    //               <a
    //                 href="#"
    //                 className="ml-auto text-sm underline-offset-4 hover:underline"
    //               >
    //                 Forgot your password?
    //               </a>
    //             </div>
    //             <Input
    //               id="password"
    //               type="password"
    //               placeholder="Enter Password"
    //               required
    //               {...register("password", {
    //                 required: "La contraseña es obligatoria",
    //               })}
    //             />
    //           </Field>

    //           <Field>
    //             <Button
    //               className="w-full cursor-pointer hover:bg-lime-500"
    //               type="submit"
    //             >
    //               Login
    //             </Button>
    //           </Field>
    //         </FieldGroup>
    //       </form>
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
