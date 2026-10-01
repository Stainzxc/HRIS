import { useEffect, useState } from "react";
import { CheckCircle, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import AddTaskModal from "./AddTaskModal";
import { getTasks } from "../services/taskService";

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

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPaginating, setIsPaginating] = useState(false);
    const [error, setError] = useState("");
    const [addTaskOpen, setAddTaskOpen] = useState(false);
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError("");
        getTasks({}, page)
            .then(({ data }) => {
                if (mounted) {
                    setTasks(data.data ?? []);
                    setPagination(data.meta ?? null);
                }
            })
            .catch(
                () =>
                    mounted &&
                    setError("Unable to load tasks. Please try again."),
            )
            .finally(() => {
                if (mounted) {
                    setLoading(false);
                    setIsPaginating(false);
                }
            });
        return () => {
            mounted = false;
        };
    }, [page]);
    const formatDate = (date) =>
        date
            ? new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
              }).format(new Date(`${date}T00:00:00`))
            : "No due date";
    const renderRow = (task) => (
        <tr key={task.id} className="text-xs text-[#625968]">
            <td className="py-4">
                <div className="flex items-center gap-3">
                    <span
                        className={`grid size-7 place-items-center rounded-full border ${task.status === "Completed" ? "border-[#b9d7c4] bg-[#e6f1ea] text-[#56806a]" : "border-[#d5c9d9] text-[#866896]"}`}
                    >
                        <CheckCircle className="size-3.5" />
                    </span>
                    <span
                        className={`font-semibold ${task.status === "Completed" ? "text-[#9a909c] line-through" : "text-[#3c3440]"}`}
                    >
                        {task.title}
                    </span>
                </div>
            </td>
            <td className="py-4">{task.owner || "Unassigned"}</td>
            <td className="py-4 text-[#918793]">{formatDate(task.due_date)}</td>
            <td className="py-4">
                <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${priorityStyles[task.priority]}`}
                >
                    {task.priority}
                </span>
            </td>
            <td className="py-4">
                <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[task.status]}`}
                >
                    {task.status}
                </span>
            </td>
        </tr>
    );
    const openTasks = tasks.filter(
        (task) => task.status !== "Completed",
    ).length;
    const completedTasks = tasks.filter(
        (task) => task.status === "Completed",
    ).length;
    return (
        <>
            <div className="mb-8 flex items-end justify-between gap-5">
                <div>
                    <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-[#9b82a4] uppercase">
                        Workspace tasks
                    </p>
                    <h1 className="text-3xl font-medium text-[#28242f] sm:text-4xl">
                        Task list
                    </h1>
                    <p className="mt-2 text-sm text-[#837a85]">
                        Keep track of important work, owners, and deadlines.
                    </p>
                </div>
                <button
                    onClick={() => setAddTaskOpen(true)}
                    className="flex h-11 items-center gap-2 rounded-xl bg-[#5b3c78] px-4 text-sm font-semibold text-white"
                >
                    <Plus className="size-4" /> Add task
                </button>
            </div>
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
                {[
                    [openTasks, "Open tasks"],
                    [
                        tasks.filter((task) => task.due_date).length,
                        "With due dates",
                    ],
                    [completedTasks, "Completed"],
                ].map(([value, label]) => (
                    <div
                        key={label}
                        className="rounded-2xl border border-[#e9e2e9] bg-white p-5"
                    >
                        <p className="text-3xl font-medium text-[#302a35]">
                            {value}
                        </p>
                        <p className="mt-1 text-xs text-[#625768]">{label}</p>
                    </div>
                ))}
            </div>
            <section className="rounded-2xl border border-[#e9e2e9] bg-white p-5 sm:p-6">
                <h2 className="text-base font-semibold text-[#352e39]">
                    All tasks
                </h2>
                <p className="mt-1 text-xs text-[#9a909c]">
                    A clear view of your team&apos;s current work
                </p>
                <div className="relative mt-5 overflow-x-auto">
                    {(loading || isPaginating) && tasks.length > 0 && (
                        <div className="absolute inset-0 z-10 grid place-items-center bg-white/70">
                            <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm text-[#837a85] shadow-sm" role="status" aria-live="polite">
                                <span className="size-4 animate-spin rounded-full border-2 border-[#d9cedc] border-t-[#5b3c78]" />
                                Loading tasks...
                            </div>
                        </div>
                    )}
                    <table className="w-full min-w-[720px] text-left">
                        <thead className="border-b border-[#eee9ee] text-[10px] font-semibold tracking-[0.13em] text-[#aaa0ad] uppercase">
                            <tr>
                                {[
                                    "Task",
                                    "Owner",
                                    "Due date",
                                    "Priority",
                                    "Status",
                                ].map((heading) => (
                                    <th
                                        key={heading}
                                        className="pb-3 font-semibold"
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className={`divide-y divide-[#f1edf1] ${loading || isPaginating ? "opacity-50" : ""}`}>
                            {loading && (
                                <tr>
                                    <td
                                        className="py-8 text-center"
                                        colSpan="5"
                                    >
                                        Loading tasks...
                                    </td>
                                </tr>
                            )}
                            {!loading && error && (
                                <tr>
                                    <td
                                        className="py-8 text-center text-[#aa665e]"
                                        colSpan="5"
                                    >
                                        {error}
                                    </td>
                                </tr>
                            )}
                            {!loading && !error && !tasks.length && (
                                <tr>
                                    <td
                                        className="py-8 text-center"
                                        colSpan="5"
                                    >
                                        No tasks found.
                                    </td>
                                </tr>
                            )}
                            {!loading && !error && tasks.map(renderRow)}
                        </tbody>
                    </table>
                </div>
                {pagination && tasks.length > 0 && (
                    <div className="flex items-center justify-between border-t border-[#eee8ee] px-5 py-4 text-xs text-[#837a85]">
                        <span>{loading || isPaginating ? "Loading tasks..." : `Showing ${pagination.from}-${pagination.to} of ${pagination.total}`}</span>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={loading || isPaginating || pagination.current_page <= 1}
                                onClick={() => { setIsPaginating(true); setPage((current) => current - 1); }}
                                className="rounded-lg border border-[#d9cedc] p-2 disabled:opacity-40"
                                aria-label="Previous page"
                            >
                                <ChevronLeft className="size-4" />
                            </button>
                            <span>Page {pagination.current_page} of {Math.max(1, pagination.last_page)}</span>
                            <button
                                type="button"
                                disabled={loading || isPaginating || pagination.current_page >= pagination.last_page}
                                onClick={() => { setIsPaginating(true); setPage((current) => current + 1); }}
                                className="rounded-lg border border-[#d9cedc] p-2 disabled:opacity-40"
                                aria-label="Next page"
                            >
                                <ChevronRight className="size-4" />
                            </button>
                        </div>
                    </div>
                )}
            </section>
            {addTaskOpen && (
                <AddTaskModal
                    onClose={() => setAddTaskOpen(false)}
                    onCreated={(task) => {
                        setTasks((current) => [task, ...current]);
                        setAddTaskOpen(false);
                    }}
                />
            )}
        </>
    );
}
