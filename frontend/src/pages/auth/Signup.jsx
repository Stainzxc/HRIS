import { Link } from "react-router-dom";

function Signup() {
    return (
        <main className="min-h-screen bg-[#f8f7f4] text-[#28242f] lg:grid lg:grid-cols-[1.14fr_minmax(360px,0.86fr)]">
            <section className="relative hidden min-h-screen overflow-hidden bg-[#5b3c78] px-12 py-10 text-[#f9f5ec] lg:flex lg:flex-col lg:justify-between xl:px-20">
                <div className="relative z-10 flex items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase">
                    <span className="grid size-9 place-items-center rounded-xl bg-[#f0cdb7] text-base font-bold tracking-normal text-[#5b3c78]">
                        LBE
                    </span>
                    <span>Lead. By. Example</span>
                </div>

                <div className="relative z-10 max-w-md pb-30">
                    <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-[#e8c7b6] uppercase">
                        Built for better work
                    </p>
                    <h1 className="max-w-sm text-5xl leading-[1.02] font-medium tracking-[-0.04em] xl:text-6xl">
                        Bring your people and work together.
                    </h1>
                    <p className="mt-7 max-w-sm text-base leading-7 text-[#eadde8]">
                        Create your workspace and keep the people side of your
                        organization clear, connected, and moving forward.
                    </p>
                </div>

                <div className="absolute -right-28 top-1/2 size-80 -translate-y-1/2 rounded-full border border-[#a786b5]/35" />
                <div className="absolute -right-8 top-1/2 size-56 -translate-y-1/2 rounded-full border border-[#e8c7b6]/45" />
                <div className="absolute -bottom-28 -left-20 size-72 rounded-full bg-[#704f8a]" />
            </section>

            <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
                <div className="w-full max-w-[430px]">
                    <div className="mb-10 lg:hidden">
                        <Link to="/" className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-[#5b3c78] uppercase">
                            <span className="grid size-9 place-items-center rounded-xl bg-[#5b3c78] text-base tracking-normal text-white">LBE</span>
                            <span>Lead. By. Example</span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#967b9f] uppercase">Get started</p>
                        <h2 className="text-4xl font-medium tracking-[-0.04em] text-[#28242f]">Create your workspace</h2>
                        <p className="mt-3 text-sm leading-6 text-[#7b737e]">Set up your account to start managing your people.</p>
                    </div>

                    <form className="space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label htmlFor="first-name" className="mb-2 block text-sm font-medium text-[#4a414d]">First name</label>
                                <input id="first-name" type="text" autoComplete="given-name" required placeholder="Jane" className="h-12 w-full rounded-xl border border-[#ded7dc] bg-white px-4 text-sm outline-none transition placeholder:text-[#b3abb4] focus:border-[#806096] focus:ring-4 focus:ring-[#806096]/10" />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="mb-2 block text-sm font-medium text-[#4a414d]">Last name</label>
                                <input id="last-name" type="text" autoComplete="family-name" required placeholder="Doe" className="h-12 w-full rounded-xl border border-[#ded7dc] bg-white px-4 text-sm outline-none transition placeholder:text-[#b3abb4] focus:border-[#806096] focus:ring-4 focus:ring-[#806096]/10" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#4a414d]">Work email</label>
                            <input id="email" type="email" autoComplete="email" required placeholder="you@company.com" className="h-12 w-full rounded-xl border border-[#ded7dc] bg-white px-4 text-sm outline-none transition placeholder:text-[#b3abb4] focus:border-[#806096] focus:ring-4 focus:ring-[#806096]/10" />
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#4a414d]">Password</label>
                            <input id="password" type="password" autoComplete="new-password" required placeholder="Create a password" className="h-12 w-full rounded-xl border border-[#ded7dc] bg-white px-4 text-sm outline-none transition placeholder:text-[#b3abb4] focus:border-[#806096] focus:ring-4 focus:ring-[#806096]/10" />
                        </div>

                        <label className="flex items-start gap-3 pt-1 text-xs leading-5 text-[#7b737e]">
                            <input type="checkbox" required className="mt-1 size-4 shrink-0 rounded border-[#c9bdca] accent-[#5b3c78]" />
                            <span>I agree to the terms of service and privacy policy.</span>
                        </label>

                        <button type="submit" className="flex h-12 w-full items-center justify-center rounded-xl bg-[#5b3c78] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(91,60,120,0.2)] transition hover:bg-[#4f326c] focus:ring-4 focus:ring-[#806096]/25 focus:outline-none">
                            Create account
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-[#7b737e]">Already have an account? <Link to="/login" className="font-semibold text-[#76548b] hover:text-[#5b3c78]">Sign in</Link></p>
                </div>
            </section>
        </main>
    );
}

export default Signup;
