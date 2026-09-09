import { Link } from "react-router-dom";

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

function Icon({ name, className = "", ...props }) {
    const paths = {
        people: (
            <>
                <circle cx="9" cy="8" r="3" />
                <path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m3 10v-3a6 6 0 0 0-2-4" />
            </>
        ),
        grid: (
            <>
                <rect x="3" y="3" width="7" height="7" rx="2" />
                <rect x="14" y="3" width="7" height="7" rx="2" />
                <rect x="3" y="14" width="7" height="7" rx="2" />
                <rect x="14" y="14" width="7" height="7" rx="2" />
            </>
        ),
        briefcase: (
            <>
                <rect x="3" y="7" width="18" height="14" rx="3" />
                <path d="M8 7V4h8v3M3 12a22 22 0 0 0 18 0M12 12v4" />
            </>
        ),
        arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
        check: <path d="m5 12 4 4L19 6" />,
    };

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`size-[21px] shrink-0 ${className}`}
            {...props}
        >
            {paths[name]}
        </svg>
    );
}

function Brand({ footer = false }) {
    return (
        <Link
            to="/"
            aria-label="Lead By Example home"
            className={`flex items-center text-[#5b3c78] ${
                footer
                    ? "gap-3 text-[11px]"
                    : "gap-3 text-sm font-semibold tracking-[0.03em]"
            }`}
        >
            <span
                className={`grid place-items-center bg-[#5b3c78] font-semibold tracking-[-0.06em] text-[#f0cdb7] ${
                    footer
                        ? "size-[34px] rounded-[10px] text-[13px]"
                        : "size-[43px] rounded-[13px] text-base max-[440px]:size-9"
                }`}
            >
                LBE
            </span>

            <span>
                Lead. By. Example
                <span
                    className={`mt-1 block font-medium tracking-[0.14em] ${
                        footer ? "text-[6px]" : "text-[7px] max-[760px]:hidden"
                    }`}
                >
                    HUMAN RESOURCE INFORMATION SYSTEM
                </span>
            </span>
        </Link>
    );
}

function WorkspacePreview() {
    const people = [
        {
            initials: "AL",
            name: "Alex Lee",
            department: "Design",
            avatarClass: "bg-[#f5e2d6]",
        },
        {
            initials: "MS",
            name: "Morgan Santos",
            department: "Operations",
            avatarClass: "bg-[#ecdfef]",
        },
        {
            initials: "JR",
            name: "Jamie Reyes",
            department: "People & Culture",
            avatarClass: "bg-[#e3ebe0]",
        },
    ];

    return (
        <div className="relative min-w-0 px-2 pt-[22px] pb-10 max-[760px]:mx-auto max-[760px]:w-full max-[760px]:max-w-[480px]">
            {" "}
            {/* Background orbit */}
            <div
                aria-hidden="true"
                className="absolute inset-0 scale-[1.08] rotate-[-20deg] rounded-[50%] border border-[#dfd4e3] bg-[radial-gradient(ellipse,#e9dfeb_0%,#efe7ec80_50%,transparent_70%)] max-[440px]:-inset-x-2"
            />
            {/* Main preview */}
            <div
                role="img"
                aria-label="Illustrative HR workspace with employee profiles, department totals, and team distribution. All values are sample data."
                className="relative rotate-[-2deg] overflow-hidden rounded-[15px] border border-[#e7e0e8] bg-white shadow-[0_22px_60px_#52336312]"
            >
                {/* Top bar */}
                <div className="flex items-center justify-between gap-2 bg-[#5b3c78] px-5 py-4 text-[11px] text-[#f8f3fa] max-[440px]:p-[13px]">
                    <span className="flex items-center gap-[9px]">
                        <span className="grid size-[22px] place-items-center rounded-[7px] bg-[#f0cdb7] font-bold text-[#5b3c78]">
                            L
                        </span>
                        Your workspace
                    </span>

                    <span className="text-[7px] tracking-[0.12em] opacity-70">
                        SAMPLE PREVIEW
                    </span>
                </div>

                <div className="p-6 max-[1000px]:p-[17px] max-[440px]:p-[15px]">
                    {/* Greeting */}
                    <div className="flex items-center justify-between gap-[10px]">
                        <div>
                            <p className="text-[7px] tracking-[0.15em] text-[#9a819f]">
                                YOUR PEOPLE, AT A GLANCE
                            </p>

                            <h2 className="mt-1.5 text-[17px] font-semibold tracking-[-0.04em] max-[440px]:text-sm">
                                A little clarity. A better day.
                            </h2>
                        </div>

                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#ecdfef] text-[10px] text-[#5b3c78]">
                            JD
                        </span>
                    </div>

                    {/* Stats */}
                    <div className="my-6 grid grid-cols-3 gap-[10px] max-[440px]:gap-[7px]">
                        <PreviewStat
                            icon="people"
                            label="Employees"
                            value="128"
                            unit="people"
                        />

                        <PreviewStat
                            icon="grid"
                            label="Departments"
                            value="08"
                            unit="teams"
                        />

                        <PreviewStat
                            icon="briefcase"
                            label="Positions"
                            value="24"
                            unit="roles"
                        />
                    </div>

                    {/* Directory */}
                    <div>
                        <div className="flex items-center justify-between gap-2 pb-2">
                            <h3 className="text-xs font-semibold">
                                Meet your people
                            </h3>

                            <span className="text-[8px] text-[#99829f]">
                                Employee directory
                            </span>
                        </div>

                        {people.map((person) => (
                            <div
                                key={person.initials}
                                className="flex items-center gap-[10px] border-b border-[#f2edf2] py-[10px]"
                            >
                                <span
                                    className={`grid size-8 shrink-0 place-items-center rounded-full text-[10px] text-[#5b3c78] ${person.avatarClass}`}
                                >
                                    {person.initials}
                                </span>

                                <div>
                                    <strong className="block text-[10px] font-semibold">
                                        {person.name}
                                    </strong>

                                    <span className="mt-0.5 block text-[8px] text-[#7b737e]">
                                        {person.department}
                                    </span>
                                </div>

                                <span className="ml-auto rounded-full bg-[#edf3eb] px-2 py-[3px] text-[7px] text-[#668063]">
                                    Active
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Team distribution */}
                    <div className="mt-[18px] text-[9px] text-[#77647e]">
                        <span>A connected organization</span>

                        <div className="my-[10px] flex h-[7px] gap-1">
                            <i className="flex-[3] rounded-sm bg-[#806096]" />
                            <i className="flex-[4] rounded-sm bg-[#baa4c4]" />
                            <i className="flex-[3] rounded-sm bg-[#e8c7b6]" />
                            <i className="flex-[2] rounded-sm bg-[#dfe6dc]" />
                        </div>

                        <p className="flex justify-between text-[7px] text-[#928795]">
                            <span>Design</span>
                            <span>Operations</span>
                            <span>People & Culture</span>
                            <span>Other</span>
                        </p>
                    </div>
                </div>
            </div>
            {/* Floating note */}
            <div className="absolute right-0 bottom-0 flex rotate-2 items-center gap-3 rounded-xl border border-[#eaded6] bg-[#fffaf5] px-[22px] py-4 shadow-[0_10px_24px_#5233630b] max-[440px]:right-[-5px] max-[440px]:px-4 max-[440px]:py-3">
                <span className="grid size-[33px] place-items-center rounded-full bg-[#edddce] text-[#88634f]">
                    <Icon name="check" className="size-[18px]" />
                </span>

                <div>
                    <strong className="text-[11px] font-semibold">
                        Less admin. More human.
                    </strong>

                    <p className="mt-[3px] text-[9px] text-[#99887d]">
                        Make room for what matters.
                    </p>
                </div>
            </div>
        </div>
    );
}

function PreviewStat({ icon, label, value, unit }) {
    return (
        <div className="rounded-lg bg-[#f8f6fa] p-[13px] max-[1000px]:p-[9px]">
            <Icon name={icon} className="mb-2 size-4 text-[#886995]" />

            <span className="block text-[9px] text-[#7b737e]">{label}</span>

            <strong className="mt-1 flex items-baseline gap-1.5 text-[27px] font-medium max-[1000px]:text-[23px]">
                {value}

                <span className="text-[8px] font-normal text-[#7b737e] max-[440px]:hidden">
                    {unit}
                </span>
            </strong>
        </div>
    );
}

function Eyebrow({ children, dot = false, light = false }) {
    return (
        <p
            className={`text-[10px] font-semibold tracking-[0.17em] ${
                light ? "text-[#d6bddc]" : "text-[#896c92]"
            } ${dot ? "flex items-center gap-[9px]" : ""}`}
        >
            {dot && <span className="size-1.5 rounded-full bg-[#a786b5]" />}

            {children}
        </p>
    );
}

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

function Principle({ icon, children }) {
    return (
        <span className="flex items-center gap-3 text-xs text-[#6e5b7c] max-[1000px]:gap-[7px] max-[1000px]:text-[10px] max-[760px]:gap-3 max-[760px]:text-xs max-[440px]:text-[10px]">
            <Icon name={icon} />
            {children}
        </span>
    );
}
