import { useEffect, useState } from "react";
import AddEmployeeModal from "../components/AddEmployeeModal";
import { getEmployees } from "../services/employeeService";

const navItems = [
    { label: "Dashboard", icon: "dashboard" },
    { label: "Employee Management", icon: "users" },
    { label: "Task List", icon: "check" },
];

const employees = [
    [
        "Samantha Collins",
        "Product Designer",
        "Design",
        "SC",
        "bg-[#e8d8ec] text-[#79558a]",
    ],
    [
        "Marcus Thompson",
        "Senior Developer",
        "Engineering",
        "MT",
        "bg-[#dce8e4] text-[#52776d]",
    ],
    [
        "Elena Rodriguez",
        "HR Specialist",
        "People",
        "ER",
        "bg-[#f3dfd2] text-[#a16f55]",
    ],
    [
        "Daniel Kim",
        "Marketing Lead",
        "Marketing",
        "DK",
        "bg-[#dce5f1] text-[#527092]",
    ],
];

const tasks = [
    ["Review onboarding documents", "People team", "Today", "High"],
    ["Schedule quarterly check-ins", "Samantha Collins", "Tomorrow", "Medium"],
    ["Update benefits information", "HR Operations", "Sep 20", "Low"],
];

function Icon({ name, className = "" }) {
    const paths = {
        dashboard: (
            <>
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </>
        ),
        users: (
            <>
                <circle cx="9" cy="8" r="3" />
                <path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m3 10v-3a6 6 0 0 0-2-4" />
            </>
        ),
        check: (
            <>
                <path d="m5 12 4 4L19 6" />
                <circle cx="12" cy="12" r="9" />
            </>
        ),
        search: (
            <>
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4.5 4.5" />
            </>
        ),
        bell: (
            <>
                <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
            </>
        ),
        plus: (
            <>
                <path d="M12 5v14M5 12h14" />
            </>
        ),
        arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
        menu: (
            <>
                <path d="M4 7h16M4 12h16M4 17h16" />
            </>
        ),
    };
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`size-5 shrink-0 ${className}`}
        >
            {paths[name]}
        </svg>
    );
}

function DashboardContent({ onAddEmployee }) {
    const stats = [
        [
            "Total employees",
            "124",
            "+8.2% this month",
            "users",
            "bg-[#eee5f1] text-[#79558a]",
        ],
        [
            "Departments",
            "12",
            "Across your organization",
            "dashboard",
            "bg-[#e5efe9] text-[#5c836f]",
        ],
        [
            "Open tasks",
            "18",
            "5 due this week",
            "check",
            "bg-[#f7e9df] text-[#a5755b]",
        ],
        [
            "On leave today",
            "06",
            "2 returning tomorrow",
            "bell",
            "bg-[#e4ebf5] text-[#5c7899]",
        ],
    ];
    return (
        <>
            <div className="mb-8 flex items-end justify-between gap-5">
                <div>
                    <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-[#9b82a4] uppercase">
                        Tuesday, September 15, 2026
                    </p>
                    <h1 className="text-3xl font-medium tracking-[-0.04em] text-[#28242f] sm:text-4xl">
                        Good morning, Alex.
                    </h1>
                    <p className="mt-2 text-sm text-[#837a85]">
                        Here&apos;s what&apos;s happening across your workspace
                        today.
                    </p>
                </div>
                <button onClick={onAddEmployee} className="hidden h-11 items-center gap-2 rounded-xl bg-[#5b3c78] px-4 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(91,60,120,0.16)] transition hover:bg-[#4f326c] sm:flex">
                    <Icon name="plus" className="size-4" /> Add employee
                </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(([label, value, note, icon, tone]) => (
                    <div
                        key={label}
                        className="rounded-2xl border border-[#e9e2e9] bg-white p-5 shadow-[0_5px_20px_rgba(65,43,72,0.025)]"
                    >
                        <div className="flex items-start justify-between">
                            <div
                                className={`grid size-10 place-items-center rounded-xl ${tone}`}
                            >
                                <Icon name={icon} className="size-[18px]" />
                            </div>
                            <span className="text-[10px] font-semibold tracking-widest text-[#b1a8b2] uppercase">
                                This month
                            </span>
                        </div>
                        <p className="mt-5 text-3xl font-medium tracking-[-0.05em] text-[#302a35]">
                            {value}
                        </p>
                        <p className="mt-1 text-xs font-medium text-[#625768]">
                            {label}
                        </p>
                        <p className="mt-3 text-[11px] text-[#9a909c]">
                            {note}
                        </p>
                    </div>
                ))}
            </div>
            <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <section className="rounded-2xl border border-[#e9e2e9] bg-white p-5 sm:p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-[#352e39]">
                                Recent employees
                            </h2>
                            <p className="mt-1 text-xs text-[#9a909c]">
                                The latest additions to your organization
                            </p>
                        </div>
                        <button className="text-xs font-semibold text-[#76548b]">
                            View all <span aria-hidden="true">→</span>
                        </button>
                    </div>
                    <div className="mt-5 overflow-x-auto">
                        <table className="w-full min-w-[550px] text-left">
                            <thead className="border-b border-[#eee9ee] text-[10px] font-semibold tracking-[0.13em] text-[#aaa0ad] uppercase">
                                <tr>
                                    <th className="pb-3 font-semibold">
                                        Employee
                                    </th>
                                    <th className="pb-3 font-semibold">
                                        Department
                                    </th>
                                    <th className="pb-3 font-semibold">
                                        Status
                                    </th>
                                    <th className="pb-3 font-semibold">
                                        Joined
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f1edf1]">
                                {employees.map(
                                    (
                                        [
                                            name,
                                            role,
                                            department,
                                            initials,
                                            color,
                                        ],
                                        i,
                                    ) => (
                                        <tr
                                            key={name}
                                            className="text-xs text-[#625968]"
                                        >
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={`grid size-8 place-items-center rounded-full text-[10px] font-semibold ${color}`}
                                                    >
                                                        {initials}
                                                    </span>
                                                    <div>
                                                        <p className="font-semibold text-[#3c3440]">
                                                            {name}
                                                        </p>
                                                        <p className="mt-0.5 text-[11px] text-[#9a909c]">
                                                            {role}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                {department}
                                            </td>
                                            <td className="py-4">
                                                <span className="rounded-full bg-[#e6f1ea] px-2.5 py-1 text-[10px] font-semibold text-[#56806a]">
                                                    Active
                                                </span>
                                            </td>
                                            <td className="py-4 text-[#918793]">
                                                Sep {18 - i * 2}, 2026
                                            </td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
                <section className="rounded-2xl border border-[#e9e2e9] bg-white p-5 sm:p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-[#352e39]">
                                Task overview
                            </h2>
                            <p className="mt-1 text-xs text-[#9a909c]">
                                Keep your team moving forward
                            </p>
                        </div>
                        <button className="text-xs font-semibold text-[#76548b]">
                            View all <span aria-hidden="true">→</span>
                        </button>
                    </div>
                    <div className="mt-5 space-y-4">
                        {tasks.map(([title, owner, due, priority]) => (
                            <div
                                key={title}
                                className="flex gap-3 border-b border-[#f1edf1] pb-4 last:border-0 last:pb-0"
                            >
                                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-[#d5c9d9] text-[#866896]">
                                    <Icon name="check" className="size-3" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-xs font-semibold text-[#493e4d]">
                                        {title}
                                    </p>
                                    <p className="mt-1 text-[11px] text-[#9a909c]">
                                        {owner} · Due {due}
                                    </p>
                                </div>
                                <span
                                    className={`h-fit rounded-full px-2 py-1 text-[9px] font-semibold ${priority === "High" ? "bg-[#fae5e2] text-[#aa665e]" : priority === "Medium" ? "bg-[#f8eddb] text-[#a57c51]" : "bg-[#e9eef4] text-[#627b98]"}`}
                                >
                                    {priority}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[#e3dbe5] py-3 text-xs font-semibold text-[#76548b]">
                        Go to task list <Icon name="arrow" className="size-4" />
                    </button>
                </section>
            </div>
        </>
    );
}

function EmployeeContent({ onAddEmployee }) {
    const [employeesData, setEmployeesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;
        getEmployees()
            .then((response) => {
                if (!Array.isArray(response.data.data)) throw new Error("Invalid employee response");
                if (!ignore) setEmployeesData(response.data.data);
            })
            .catch(() => {
                if (!ignore) setError("Unable to load employees. Please try again later.");
            })
            .finally(() => { if (!ignore) setLoading(false); });
        return () => { ignore = true; };
    }, []);
    
    const formatLabel = (value) => value
        ? value.replaceAll("_", " ").replace(/^./, (letter) => letter.toUpperCase())
        : "Not specified";
    const directoryEmployees = employeesData.map((employee) => ({
        id: employee.id,
        name: [employee.first_name, employee.middle_name, employee.last_name].filter(Boolean).join(" ") || employee.employee_number,
        role: employee.position?.name ?? "Unassigned",
        department: employee.department?.name ?? "Unassigned",
        email: employee.email ?? "Not provided",
        employment: ({ full_time: "Full-time", part_time: "Part-time", contract: "Contract" })[employee.employee_type] ?? formatLabel(employee.employee_type),
        status: formatLabel(employee.employment_status),
        initials: [employee.first_name, employee.last_name].map((part) => part?.[0] ?? "").join("").toUpperCase(),
        color: "bg-[#e8d8ec] text-[#79558a]",
    }));
    const departmentCount = new Set(employeesData.map((employee) => employee.department?.id).filter((id) => id != null)).size;
    const activeCount = employeesData.filter((employee) => employee.employment_status === "active").length;
    const count = (value) => loading || error ? "?" : value;
    return (
        <>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
                <div>
                    <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-[#9b82a4] uppercase">
                        People directory
                    </p>
                    <h1 className="text-3xl font-medium tracking-[-0.04em] text-[#28242f] sm:text-4xl">
                        Employee management
                    </h1>
                    <p className="mt-2 text-sm text-[#837a85]">
                        Keep your team&apos;s information organized and up to
                        date.
                    </p>
                </div>
                <button onClick={onAddEmployee} className="flex h-11 items-center gap-2 rounded-xl bg-[#5b3c78] px-4 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(91,60,120,0.16)] transition hover:bg-[#4f326c]">
                    <Icon name="plus" className="size-4" /> Add employee
                </button>
            </div>
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
                {[
                    [count(employeesData.length), "Total employees"],
                    [count(departmentCount), "Departments"],
                    [count(activeCount), "Active employees"],
                ].map(([value, label]) => (
                    <div
                        key={label}
                        className="rounded-2xl border border-[#e9e2e9] bg-white p-5 shadow-[0_5px_20px_rgba(65,43,72,0.025)]"
                    >
                        <p className="text-3xl font-medium tracking-[-0.05em] text-[#302a35]">
                            {value}
                        </p>
                        <p className="mt-1 text-xs font-medium text-[#625768]">
                            {label}
                        </p>
                    </div>
                ))}
            </div>
            <section className="rounded-2xl border border-[#e9e2e9] bg-white p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-base font-semibold text-[#352e39]">
                            All employees
                        </h2>
                        <p className="mt-1 text-xs text-[#9a909c]">
                            A complete view of everyone in your organization
                        </p>
                    </div>
                    <div className="flex w-full gap-2 sm:w-auto">
                        <div className="relative flex-1 sm:w-56">
                            <Icon
                                name="search"
                                className="absolute top-2.5 left-3 size-4 text-[#a69ba8]"
                            />
                            <input
                                placeholder="Search employees"
                                className="h-9 w-full rounded-lg border border-[#e7e0e7] bg-[#fcfbf9] pl-9 text-xs outline-none placeholder:text-[#b0a6b1] focus:border-[#a786b5]"
                            />
                        </div>
                        <button className="rounded-lg border border-[#e3dbe5] px-3 text-xs font-semibold text-[#675b6b]">
                            Filter
                        </button>
                    </div>
                </div>
                <div className="mt-5 overflow-x-auto">
                    <table className="w-full min-w-[800px] text-left">
                        <thead className="border-b border-[#eee9ee] text-[10px] font-semibold tracking-[0.13em] text-[#aaa0ad] uppercase">
                            <tr>
                                <th className="pb-3 font-semibold">Employee</th>
                                <th className="pb-3 font-semibold">
                                    Department
                                </th>
                                <th className="pb-3 font-semibold">Email</th>
                                <th className="pb-3 font-semibold">
                                    Employment
                                </th>
                                <th className="pb-3 font-semibold">Status</th>
                                <th className="pb-3 font-semibold"> </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f1edf1]">
                            {(loading || error || directoryEmployees.length === 0) && (
                                <tr>
                                    <td colSpan={6} className="py-6 text-center text-sm text-[#918793]">
                                        <span role={error ? "alert" : "status"}>
                                            {loading ? "Loading employees?" : error || "No employees found."}
                                        </span>
                                    </td>
                                </tr>
                            )}
                            {directoryEmployees.map(
                                ({
                                    id,
                                    name,
                                    role,
                                    department,
                                    email,
                                    employment,
                                    status,
                                    initials,
                                    color,
                                }) => (
                                    <tr
                                        key={id}
                                        className="text-xs text-[#625968]"
                                    >
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`grid size-9 place-items-center rounded-full text-[10px] font-semibold ${color}`}
                                                >
                                                    {initials}
                                                </span>
                                                <div>
                                                    <p className="font-semibold text-[#3c3440]">
                                                        {name}
                                                    </p>
                                                    <p className="mt-0.5 text-[11px] text-[#9a909c]">
                                                        {role}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4">{department}</td>
                                        <td className="py-4 text-[#918793]">
                                            {email}
                                        </td>
                                        <td className="py-4">{employment}</td>
                                        <td className="py-4">
                                            <span
                                                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${status === "Active" ? "bg-[#e6f1ea] text-[#56806a]" : status === "On leave" ? "bg-[#f8eddb] text-[#a57c51]" : "bg-[#eee9eb] text-[#82777f]"}`}
                                            >
                                                {status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right text-[#9a909c]">
                                            •••
                                        </td>
                                    </tr>
                                ),
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-[#f1edf1] pt-4 text-[11px] text-[#9a909c]">
                    <span>{loading ? "Loading employees?" : error ? "Employees unavailable" : `Showing ${directoryEmployees.length} employees`}</span>
                </div>
            </section>
        </>
    );
}

function PlaceholderContent({ title, description, icon }) {
    return (
        <div className="grid min-h-[60vh] place-items-center rounded-2xl border border-dashed border-[#d9cedc] bg-white/60 p-8 text-center">
            <div>
                <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#eee5f1] text-[#79558a]">
                    <Icon name={icon} className="size-7" />
                </div>
                <h1 className="mt-5 text-2xl font-medium tracking-[-0.04em] text-[#352e39]">
                    {title}
                </h1>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8c818e]">
                    {description} This static view is ready for you to connect
                    to your data.
                </p>
            </div>
        </div>
    );
}

function TaskListContent() {
    const taskItems = [
        [
            "Review onboarding documents",
            "People team",
            "Today",
            "High",
            "In progress",
        ],
        [
            "Schedule quarterly check-ins",
            "Samantha Collins",
            "Tomorrow",
            "Medium",
            "To do",
        ],
        [
            "Update benefits information",
            "HR Operations",
            "Sep 20",
            "Low",
            "To do",
        ],
        [
            "Prepare monthly payroll report",
            "Finance team",
            "Sep 22",
            "High",
            "Completed",
        ],
        [
            "Send employee satisfaction survey",
            "Alex Johnson",
            "Sep 24",
            "Medium",
            "In progress",
        ],
    ];

    const statusStyles = {
        "To do": "bg-[#f3eff4] text-[#77647f]",
        "In progress": "bg-[#f8eddb] text-[#a57c51]",
        Completed: "bg-[#e6f1ea] text-[#56806a]",
    };

    const priorityStyles = {
        High: "bg-[#fae5e2] text-[#aa665e]",
        Medium: "bg-[#f8eddb] text-[#a57c51]",
        Low: "bg-[#e9eef4] text-[#627b98]",
    };

    return (
        <>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
                <div>
                    <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-[#9b82a4] uppercase">
                        Workspace tasks
                    </p>
                    <h1 className="text-3xl font-medium tracking-[-0.04em] text-[#28242f] sm:text-4xl">
                        Task list
                    </h1>
                    <p className="mt-2 text-sm text-[#837a85]">
                        Keep track of important work, owners, and deadlines.
                    </p>
                </div>
                <button className="flex h-11 items-center gap-2 rounded-xl bg-[#5b3c78] px-4 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(91,60,120,0.16)] transition hover:bg-[#4f326c]">
                    <Icon name="plus" className="size-4" /> Add task
                </button>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-3">
                {[
                    ["18", "Open tasks"],
                    ["05", "Due this week"],
                    ["12", "Completed"],
                ].map(([value, label]) => (
                    <div
                        key={label}
                        className="rounded-2xl border border-[#e9e2e9] bg-white p-5 shadow-[0_5px_20px_rgba(65,43,72,0.025)]"
                    >
                        <p className="text-3xl font-medium tracking-[-0.05em] text-[#302a35]">
                            {value}
                        </p>
                        <p className="mt-1 text-xs font-medium text-[#625768]">
                            {label}
                        </p>
                    </div>
                ))}
            </div>

            <section className="rounded-2xl border border-[#e9e2e9] bg-white p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-base font-semibold text-[#352e39]">
                            All tasks
                        </h2>
                        <p className="mt-1 text-xs text-[#9a909c]">
                            A clear view of your team&apos;s current work
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button className="rounded-lg bg-[#eee5f1] px-3 py-2 text-xs font-semibold text-[#5b3c78]">
                            All tasks
                        </button>
                        <button className="rounded-lg border border-[#e3dbe5] px-3 py-2 text-xs font-semibold text-[#675b6b]">
                            My tasks
                        </button>
                    </div>
                </div>
                <div className="mt-5 overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left">
                        <thead className="border-b border-[#eee9ee] text-[10px] font-semibold tracking-[0.13em] text-[#aaa0ad] uppercase">
                            <tr>
                                <th className="pb-3 font-semibold">Task</th>
                                <th className="pb-3 font-semibold">Owner</th>
                                <th className="pb-3 font-semibold">Due date</th>
                                <th className="pb-3 font-semibold">Priority</th>
                                <th className="pb-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f1edf1]">
                            {taskItems.map(
                                ([title, owner, due, priority, status]) => (
                                    <tr
                                        key={title}
                                        className="text-xs text-[#625968]"
                                    >
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`grid size-7 place-items-center rounded-full border ${status === "Completed" ? "border-[#b9d7c4] bg-[#e6f1ea] text-[#56806a]" : "border-[#d5c9d9] text-[#866896]"}`}
                                                >
                                                    <Icon
                                                        name="check"
                                                        className="size-3.5"
                                                    />
                                                </span>
                                                <span
                                                    className={`font-semibold ${status === "Completed" ? "text-[#9a909c] line-through" : "text-[#3c3440]"}`}
                                                >
                                                    {title}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4">{owner}</td>
                                        <td className="py-4 text-[#918793]">
                                            {due}
                                        </td>
                                        <td className="py-4">
                                            <span
                                                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${priorityStyles[priority]}`}
                                            >
                                                {priority}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <span
                                                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[status]}`}
                                            >
                                                {status}
                                            </span>
                                        </td>
                                    </tr>
                                ),
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

export default function Landing() {
    const [active, setActive] = useState("Dashboard");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);
    const [employeeVersion, setEmployeeVersion] = useState(0);
    const [employeeNotice, setEmployeeNotice] = useState("");
    const openAddEmployee = () => {
        setEmployeeNotice("");
        setAddEmployeeOpen(true);
    };
    const content =
        active === "Dashboard" ? (
            <DashboardContent onAddEmployee={openAddEmployee} />
        ) : active === "Employee Management" ? (
            <EmployeeContent key={employeeVersion} onAddEmployee={openAddEmployee} />
        ) : active === "Task List" ? (
            <TaskListContent />
        ) : (
            <PlaceholderContent
                title="Task List"
                description="Keep track of important work, owners, and deadlines across your workspace."
                icon="check"
            />
        );
    return (
        <div className="min-h-screen bg-[#f8f7f4] text-[#28242f] lg:flex">
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-[260px] border-r border-[#e8e0e8] bg-[#fcfbf9] px-5 py-6 transition-transform lg:static lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center gap-3 px-2">
                    <span className="grid size-9 place-items-center rounded-xl bg-[#5b3c78] text-xs font-bold tracking-tight text-white">
                        LBE
                    </span>
                    <span className="text-[12px] font-semibold tracking-[0.16em] text-[#5b3c78] uppercase">
                        Lead. By. Example
                    </span>
                </div>
                <div className="mt-12">
                    <p className="px-3 text-[10px] font-semibold tracking-[0.18em] text-[#aaa0ad] uppercase">
                        Workspace
                    </p>
                    <nav
                        className="mt-3 space-y-1"
                        aria-label="Workspace navigation"
                    >
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => {
                                    setActive(item.label);
                                    setMobileOpen(false);
                                }}
                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-medium transition ${active === item.label ? "bg-[#eee5f1] text-[#5b3c78]" : "text-[#756b78] hover:bg-[#f4eff4] hover:text-[#5b3c78]"}`}
                            >
                                <Icon
                                    name={item.icon}
                                    className="size-[18px]"
                                />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="absolute right-5 bottom-6 left-5 rounded-2xl bg-[#f1eaf3] p-4">
                    <p className="text-[11px] font-semibold text-[#5b3c78]">
                        Need a hand?
                    </p>
                    <p className="mt-1 text-[10px] leading-5 text-[#836e8d]">
                        Visit the help center for workspace guidance.
                    </p>
                    <button className="mt-3 text-[10px] font-semibold text-[#5b3c78]">
                        Open help center →
                    </button>
                </div>
            </aside>
            <div className="min-w-0 flex-1">
                <header className="flex h-[76px] items-center justify-between border-b border-[#e8e0e8] bg-[#fcfbf9]/80 px-5 backdrop-blur sm:px-8 lg:px-10">
                    <button
                        className="rounded-lg p-2 text-[#6f6472] lg:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle navigation"
                    >
                        <Icon name="menu" />
                    </button>
                    <div className="relative hidden w-full max-w-[300px] sm:block">
                        <Icon
                            name="search"
                            className="absolute top-2.5 left-3 size-4 text-[#a69ba8]"
                        />
                        <input
                            placeholder="Search your workspace"
                            className="h-9 w-full rounded-lg border border-[#e7e0e7] bg-white pl-9 text-xs text-[#403746] outline-none placeholder:text-[#b0a6b1] focus:border-[#a786b5]"
                        />
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                        <button
                            className="relative text-[#786c7c]"
                            aria-label="Notifications"
                        >
                            <Icon name="bell" className="size-[19px]" />
                            <span className="absolute -top-1 -right-1 size-2 rounded-full bg-[#c78172] ring-2 ring-[#fcfbf9]" />
                        </button>
                        <div className="h-7 w-px bg-[#e8e0e8]" />
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            aria-expanded={profileOpen}
                            aria-haspopup="menu"
                            className="group flex items-center gap-3 rounded-xl px-2 py-1.5 text-left transition hover:bg-[#f4eff4]"
                        >
                            <span className="grid size-9 place-items-center rounded-full bg-[#eadcf0] text-xs font-semibold text-[#79558a] ring-2 ring-white">
                                AJ
                            </span>
                            <span className="hidden text-left sm:block">
                                <span className="block text-[13px] font-semibold leading-4 text-[#443a47]">
                                    Alex Johnson
                                </span>
                                <span className="mt-0.5 block text-[11px] leading-4 text-[#9b909d]">
                                    Administrator
                                </span>
                            </span>
                            <svg
                                viewBox="0 0 16 16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                className={`ml-1 hidden size-4 text-[#988d9d] transition-transform duration-200 sm:block ${profileOpen ? "rotate-180" : ""}`}
                            >
                                <path d="m4 6 4 4 4-4" />
                            </svg>
                        </button>
                        {profileOpen && (
                            <div
                                role="menu"
                                className="absolute top-14 right-5 z-40 w-52 rounded-xl border border-[#e8e0e8] bg-white p-2 shadow-[0_12px_30px_rgba(65,43,72,0.12)]"
                            >
                                <button
                                    role="menuitem"
                                    className="w-full rounded-lg px-3 py-2.5 text-left text-xs text-[#675b6b] hover:bg-[#f7f3f7]"
                                >
                                    My profile
                                </button>
                                <button
                                    role="menuitem"
                                    className="w-full rounded-lg px-3 py-2.5 text-left text-xs text-[#675b6b] hover:bg-[#f7f3f7]"
                                >
                                    Account settings
                                </button>
                                <div className="my-1 border-t border-[#f0ebf0]" />
                                <button
                                    role="menuitem"
                                    className="w-full rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-[#a05f61] hover:bg-[#fbefef]"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </header>
                <main className="mx-auto max-w-[1440px] p-5 sm:p-8 lg:p-10">
                    {employeeNotice && <p role="status" className="mb-4 rounded-lg bg-[#e6f1ea] p-3 text-sm text-[#56806a]">{employeeNotice}</p>}
                    {content}
                    {addEmployeeOpen && (
                        <AddEmployeeModal
                            onClose={() => setAddEmployeeOpen(false)}
                            onCreated={() => {
                                setAddEmployeeOpen(false);
                                setEmployeeVersion((version) => version + 1);
                                setActive("Employee Management");
                                setEmployeeNotice("Employee added successfully.");
                            }}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}
