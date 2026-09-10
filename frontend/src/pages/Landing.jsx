import { Link } from "react-router-dom";
import Icon from "../components/landing/Icon";
import Brand from "../components/landing/Brand";
import WorkspacePreview from "../components/landing/WorkspacePreview";
import Eyebrow from "../components/landing/Eyebrow";
import Principle from "../components/landing/Principle";

const features = [
    {
        number: "01",
        title: "People, all in one place.",
        description:
            "Keep employee profiles and essential information organized in one central directory.",
        icon: "people",
        iconClass: "bg-[#ece3ef] text-[#5b3c78]",
    },
    {
        number: "02",
        title: "Give your teams structure.",
        description:
            "Bring clarity to your organization with a simple overview of departments and the people behind them.",
        icon: "grid",
        iconClass: "bg-[#f4e4d8] text-[#997158]",
    },
    {
        number: "03",
        title: "Make every role clear.",
        description:
            "Organize positions so you can see where everyone fits and keep your team information consistent.",
        icon: "briefcase",
        iconClass: "bg-[#e5eade] text-[#738063]",
    },
];

const container =
    "mx-auto w-full max-w-[1180px] px-6 sm:px-8 lg:px-12";
const primaryButton =
    "inline-flex items-center justify-center gap-[18px] rounded-[10px] bg-[#5b3c78] px-[22px] py-4 text-[13px] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#4f326c] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#a786b5] motion-reduce:transform-none motion-reduce:transition-none";

const textLink =
    "inline-flex items-center gap-3 text-xs font-semibold text-[#5b3c78] transition-colors hover:text-[#956b9d]";

export default function Landing() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-[#f8f7f4] text-[#28242f]">
            {" "}
            {/* Accessibility */}
            <a
                href="#main-content"
                className="fixed top-[-80px] left-[15px] z-50 bg-white px-5 py-3 text-[#5b3c78] focus:top-3"
            >
                Skip to content
            </a>
            {/* Header */}
            <header
                className={`${container} flex items-center justify-between gap-6 py-7 max-[440px]:gap-3 max-[440px]:py-5`}
            >
                <Brand />

                <nav
                    aria-label="Main navigation"
                    className="flex gap-8 text-[13px] text-[#65596d] max-[760px]:gap-[18px] max-[760px]:text-xs max-[440px]:hidden"
                >
                    <a
                        href="#features"
                        className="transition-colors hover:text-[#956b9d]"
                    >
                        Features
                    </a>

                    <a
                        href="#approach"
                        className="transition-colors hover:text-[#956b9d]"
                    >
                        Our approach
                    </a>
                </nav>

                <Link
                    to="/login"
                    className={`${primaryButton} px-[18px] py-[11px] max-[440px]:gap-2 max-[440px]:px-3 max-[440px]:py-[9px]`}
                >
                    Sign in
                    <Icon name="arrow" />
                </Link>
            </header>
            <main id="main-content">
                {/* Hero */}
                <section
                    aria-labelledby="hero-title"
                    className={`${container} grid grid-cols-2 items-center gap-[58px] pt-[76px] pb-[100px] min-[1500px]:pt-[100px] min-[1500px]:pb-[120px] max-[1000px]:gap-[30px] max-[1000px]:pt-[55px] max-[1000px]:pb-[70px] max-[760px]:grid-cols-1 max-[760px]:gap-[46px] max-[760px]:pt-10`}
                >
                    <div className="max-[760px]:max-w-[540px]">
                        <Eyebrow dot>BUILT AROUND YOUR PEOPLE</Eyebrow>

                        <h1
                            id="hero-title"
                            className="my-6 text-[clamp(44px,4.6vw,64px)] leading-[1.08] font-medium tracking-[-0.055em] max-[1000px]:text-[47px] max-[760px]:max-w-[500px] max-[760px]:text-[clamp(44px,8vw,60px)]"
                        >
                            Good teams start with{" "}
                            <em className="font-serif font-normal text-[#5b3c78]">
                                great support.
                            </em>
                        </h1>

                        <p className="max-w-[410px] text-[15px] leading-[1.9] text-[#7b737e] max-[760px]:max-w-[470px]">
                            A little less paperwork. A lot more people. Bring
                            your employees, departments, and positions together
                            in one thoughtful HR workspace.
                        </p>

                        <div className="mt-[30px] flex flex-wrap items-center gap-6 max-[440px]:gap-5">
                            <Link to="/login" className={primaryButton}>
                                Go to your workspace
                                <Icon name="arrow" />
                            </Link>

                            <a href="#features" className={textLink}>
                                Explore the platform
                                <span aria-hidden="true">↗</span>
                            </a>
                        </div>

                        <p className="mt-7 flex items-center gap-2 text-[11px] text-[#8e8491]">
                            <span
                                aria-hidden="true"
                                className="text-xl text-[#987ba4]"
                            >
                                ✳
                            </span>
                            Your people. Your organization. One place.
                        </p>
                    </div>

                    <WorkspacePreview />
                </section>

                {/* Principles */}
                <section
                    aria-label="Platform principles"
                    className={`${container} flex items-center justify-between gap-6 border-y border-[#e6dfe6] py-7 max-[1000px]:gap-[15px] max-[760px]:grid max-[760px]:grid-cols-2 max-[760px]:gap-[22px]`}
                >
                    <p className="text-xs leading-[1.7] text-[#8a7f8d]">
                        A calmer way to
                        <br />
                        <strong className="font-medium text-[#584b61]">
                            manage your everyday.
                        </strong>
                    </p>

                    <Principle icon="people">People at the center</Principle>

                    <Principle icon="grid">Everything connected</Principle>

                    <Principle icon="check">Simply organized</Principle>
                </section>

                {/* Features */}
                <section
                    id="features"
                    aria-labelledby="features-title"
                    className={`${container} scroll-mt-[30px] py-[84px] max-[760px]:py-[60px]`}
                >
                    <div className="mb-[34px] flex items-end justify-between gap-10 max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-5">
                        <div>
                            <Eyebrow>A PLACE FOR EVERYTHING</Eyebrow>

                            <h2
                                id="features-title"
                                className="mt-4 text-[35px] leading-[1.2] font-medium tracking-[-0.04em] max-[440px]:text-[30px]"
                            >
                                The essentials.
                                <br />
                                Working better together.
                            </h2>
                        </div>

                        <p className="max-w-[300px] text-[13px] leading-[1.9] text-[#7b737e] max-[760px]:max-w-[450px]">
                            Clear information makes everyday work easier. Give
                            your HR team a home for the details that matter.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-[18px] max-[760px]:grid-cols-1">
                        {features.map((feature) => (
                            <article
                                key={feature.number}
                                className="rounded-[13px] border border-[#e7dfe6] bg-[#fbfaf8] p-[27px] max-[1000px]:p-5 max-[760px]:p-[25px]"
                            >
                                <div className="flex items-center justify-between text-[10px] text-[#b8aabc]">
                                    <span
                                        className={`grid size-[42px] place-items-center rounded-xl ${feature.iconClass}`}
                                    >
                                        <Icon name={feature.icon} />
                                    </span>

                                    <span>{feature.number}</span>
                                </div>

                                <h3 className="mt-7 text-[17px] font-medium tracking-[-0.035em] max-[760px]:mt-[18px]">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-xs leading-[1.9] text-[#7b737e]">
                                    {feature.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Approach */}
                <section
                    id="approach"
                    aria-labelledby="approach-title"
                    className={`${container} grid scroll-mt-[30px] grid-cols-[0.85fr_1fr] items-center gap-20 pb-[84px] max-[1000px]:gap-10 max-[760px]:grid-cols-1 max-[760px]:gap-[30px] max-[760px]:pb-[60px]`}
                >
                    <div
                        aria-hidden="true"
                        className="relative grid min-h-[300px] place-items-center overflow-hidden rounded-2xl bg-[#eee7ef] max-[760px]:min-h-[280px]"
                    >
                        <div className="absolute size-60 rounded-full border border-[#c6b4cf]" />

                        <div className="absolute h-[180px] w-[300px] rotate-[-40deg] rounded-[50%] border border-[#d6c7dc]" />

                        <span className="absolute top-7 left-[28%] z-10 rotate-[-8deg] rounded-lg border border-[#e0d6e5] bg-[#faf7fb] px-[17px] py-[9px] text-[10px] text-[#7c6589]">
                            People
                        </span>

                        <span className="absolute top-[45%] right-[7%] z-10 rotate-6 rounded-lg border border-[#e0d6e5] bg-[#faf7fb] px-[17px] py-[9px] text-[10px] text-[#7c6589]">
                            Purpose
                        </span>

                        <span className="absolute bottom-8 left-[14%] z-10 rotate-[-5deg] rounded-lg border border-[#e0d6e5] bg-[#faf7fb] px-[17px] py-[9px] text-[10px] text-[#7c6589]">
                            Connection
                        </span>

                        <span className="z-[1] grid size-28 place-content-center rounded-full bg-[#5b3c78] text-center text-[32px] tracking-[-0.07em] text-[#f0cdb7]">
                            LBE
                            <span className="mt-[7px] text-[6px] tracking-[0.17em]">
                                GROW TOGETHER
                            </span>
                        </span>
                    </div>

                    <div>
                        <Eyebrow>LEAD. BY. EXAMPLE.</Eyebrow>

                        <h2
                            id="approach-title"
                            className="my-[18px] text-[34px] leading-[1.25] font-medium tracking-[-0.04em] max-[440px]:text-[30px]"
                        >
                            Behind every great organization,
                            <br />
                            <em className="font-serif font-normal text-[#5b3c78]">
                                there are people.
                            </em>
                        </h2>

                        <p className="max-w-[420px] text-[13px] leading-[1.9] text-[#7b737e]">
                            We believe managing people should feel more human.
                            Start with organized information, bring your teams
                            into focus, and make space for meaningful work.
                        </p>

                        <a href="#get-started" className={`${textLink} mt-6`}>
                            Give your people a better starting point
                            <Icon name="arrow" />
                        </a>
                    </div>
                </section>

                {/* CTA */}
                <section
                    id="get-started"
                    className={`${container} flex items-center justify-between gap-8 rounded-[18px] bg-[#5b3c78] px-12 py-11 text-[#fff7f1] max-[760px]:flex-col max-[760px]:items-start max-[760px]:p-8 max-[440px]:p-7`}
                >
                    <div>
                        <Eyebrow light>YOUR NEXT CHAPTER STARTS HERE</Eyebrow>

                        <h2 className="my-3 text-[34px] font-medium tracking-[-0.04em] max-[440px]:text-[30px]">
                            A better workday awaits.
                        </h2>

                        <p className="text-xs text-[#dac9df]">
                            Sign in and make yourself at home.
                        </p>
                    </div>

                    <div>
                        <Link
                            to="/login"
                            className={`${primaryButton} bg-[#f0cdb7] text-[#5b3c78] hover:bg-[#ffe1ce]`}
                        >
                            Enter your workspace
                            <Icon name="arrow" />
                        </Link>

                        <p className="mt-3 max-w-[250px] text-[9px] leading-[1.8] text-[#dac9df]">
                            Need access? Contact your workspace administrator.
                        </p>
                    </div>
                </section>
            </main>
            {/* Footer */}
            <footer
                className={`${container} flex items-center justify-between gap-6 py-9 max-[760px]:flex-wrap`}
            >
                <Brand footer />

                <p className="text-[10px] text-[#988c9b] max-[760px]:hidden">
                    Thoughtfully organized. Human at heart.
                </p>

                <span className="text-[10px] text-[#988c9b]">
                    © {new Date().getFullYear()} LBE
                </span>
            </footer>
        </div>
    );
}