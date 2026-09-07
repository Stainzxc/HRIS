function Login() {
 return (
     <main className="min-h-screen bg-[#f8f7f4] text-[#28242f] lg:grid lg:grid-cols-[minmax(360px,0.86fr)_1.14fr]">
         <section className="relative hidden min-h-screen overflow-hidden bg-[#5b3c78] px-12 py-10 text-[#f9f5ec] lg:flex lg:flex-col lg:justify-between xl:px-20">
             <div className="relative z-10 flex items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase">
                 <span className="grid size-9 place-items-center rounded-xl bg-[#f0cdb7] text-base font-bold tracking-normal text-[#5b3c78]">
                     LBE
                 </span>
                 <span>Lead. By. Example</span>
             </div>

             <div className="relative z-10 max-w-md pb-30">
                 <h1 className="max-w-sm text-5xl leading-[1.02] font-medium tracking-[-0.04em] xl:text-6xl">
                     Simplify the way you manage your people.
                 </h1>

                 <p className="mt-7 max-w-sm text-base leading-7 text-[#eadde8]">
                     A centralized HR platform for managing employees,
                     departments, positions, and the information that keeps your
                     organization moving.
                 </p>
             </div>

             <div className="absolute -right-28 top-1/2 size-80 -translate-y-1/2 rounded-full border border-[#a786b5]/35" />
             <div className="absolute -right-8 top-1/2 size-56 -translate-y-1/2 rounded-full border border-[#e8c7b6]/45" />
             <div className="absolute -bottom-28 -left-20 size-72 rounded-full bg-[#704f8a]" />
         </section>

         <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
             <div className="w-full max-w-[430px]">
                 <div className="mb-10 lg:hidden">
                     <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-[#5b3c78] uppercase">
                         <span className="grid size-9 place-items-center rounded-xl bg-[#5b3c78] text-base tracking-normal text-white">
                             H
                         </span>
                         <span>Horizon HR</span>
                     </div>
                 </div>

                 <div className="mb-9">
                     <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#967b9f] uppercase">
                         Welcome back
                     </p>
                     <h2 className="text-4xl font-medium tracking-[-0.04em] text-[#28242f]">
                         Sign in to your workspace
                     </h2>
                     <p className="mt-3 text-sm leading-6 text-[#7b737e]">
                         Enter your details to access your HR dashboard.
                     </p>
                 </div>

                 <div className="space-y-5">
                     <div>
                         <label
                             htmlFor="email"
                             className="mb-2 block text-sm font-medium text-[#4a414d]"
                         >
                             Work email
                         </label>
                         <input
                             id="email"
                             type="email"
                             placeholder="you@company.com"
                             className="h-12 w-full rounded-xl border border-[#ded7dc] bg-white px-4 text-sm text-[#28242f] shadow-[0_2px_8px_rgba(52,35,61,0.03)] outline-none transition placeholder:text-[#b3abb4] focus:border-[#806096] focus:ring-4 focus:ring-[#806096]/10"
                         />
                     </div>

                     <div>
                         <div className="mb-2 flex items-center justify-between">
                             <label
                                 htmlFor="password"
                                 className="block text-sm font-medium text-[#4a414d]"
                             >
                                 Password
                             </label>
                             <button
                                 type="button"
                                 className="text-xs font-semibold text-[#76548b] transition hover:text-[#5b3c78]"
                             >
                                 Forgot password?
                             </button>
                         </div>
                         <input
                             id="password"
                             type="password"
                             placeholder="Enter your password"
                             className="h-12 w-full rounded-xl border border-[#ded7dc] bg-white px-4 text-sm text-[#28242f] shadow-[0_2px_8px_rgba(52,35,61,0.03)] outline-none transition placeholder:text-[#b3abb4] focus:border-[#806096] focus:ring-4 focus:ring-[#806096]/10"
                         />
                     </div>

                     <label className="flex items-center gap-3 pt-1 text-sm text-[#7b737e]">
                         <input
                             type="checkbox"
                             className="size-4 rounded border-[#c9bdca] accent-[#5b3c78]"
                         />
                         Keep me signed in
                     </label>

                     <button
                         type="button"
                         className="h-12 w-full rounded-xl bg-[#5b3c78] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(91,60,120,0.2)] transition hover:bg-[#4f326c] focus:ring-4 focus:ring-[#806096]/25 focus:outline-none"
                     >
                         Sign in
                     </button>
                 </div>

                 <p className="mt-9 text-center text-xs leading-5 text-[#9a919b]">
                     Need access? Contact your workspace administrator.
                 </p>
             </div>
         </section>
     </main>
 );
}

export default Login;