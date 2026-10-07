import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Plus, Search } from "lucide-react";
import { getEmployees } from "../services/employeeService";
import {
    getLeaveRequests,
    updateLeaveRequest,
} from "../services/leaveRequestService";
import AddLeaveRequestModal from "./AddLeaveRequestModal";
import AddLeaveBalanceModal from "./AddLeaveBalanceModal";
import { getLeaveBalances } from "../services/leaveBalanceService";

const colors = {
    Pending: "bg-[#f8eddb] text-[#a57c51]",
    Approved: "bg-[#e6f1ea] text-[#56806a]",
    Rejected: "bg-[#fae5e2] text-[#aa665e]",
};
export default function LeaveRequestList() {
    const [items, setItems] = useState([]),
        [employees, setEmployees] = useState([]),
        [filter, setFilter] = useState(""),
        [search, setSearch] = useState(""),
        [loading, setLoading] = useState(true),
        [error, setError] = useState(""),
        [balances, setBalances] = useState([]),
        [expandedEmployees, setExpandedEmployees] = useState({}),
        [modal, setModal] = useState(false);
    const [balanceModal, setBalanceModal] = useState(false);
    const load = () => {
        setLoading(true);
        Promise.all([
            getLeaveRequests({ status: filter, search }),
            getEmployees(),
            getLeaveBalances({ year: new Date().getFullYear() }),
        ])
            .then(([leave, employee, balance]) => {
                setItems(leave.data.data ?? []);
                setBalances(balance.data.data ?? []);
                setEmployees(
                    (employee.data.data ?? []).map((e) => ({
                        id: e.id,
                        name: [e.first_name, e.last_name].join(" "),
                        employee_number: e.employee_number,
                        position_id: e.position?.id,
                        position_name: e.position?.name,
                    })),
                );
            })
            .catch(() => setError("Unable to load leave requests."))
            .finally(() => setLoading(false));
    };
    useEffect(load, [filter, search]);
    async function review(item, status) {
        try {
            await updateLeaveRequest(item.id, { status });
            load();
        } catch {
            setError("Unable to update this request.");
        }
    }
    const groupedBalances = Object.values(
        balances.reduce((groups, balance) => {
            const employeeId = balance.employee_id;
            groups[employeeId] ??= { employee: balance.employee, balances: [] };
            groups[employeeId].balances.push(balance);
            return groups;
        }, {}),
    );
    const toggleEmployee = (employeeId) =>
        setExpandedEmployees((current) => ({ ...current, [employeeId]: !current[employeeId] }));

    const date = (value) =>
        value
            ? new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
              }).format(new Date(`${value}T00:00:00`))
            : "—";
    return (
        <>
            <div className="mb-8 flex items-end justify-between gap-5">
                <div>
                    <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-[#9b82a4] uppercase">
                        People operations
                    </p>
                    <h1 className="text-3xl font-medium text-[#28242f] sm:text-4xl">
                        Leave requests
                    </h1>
                    <p className="mt-2 text-sm text-[#837a85]">
                        Review and manage employee time-off requests.
                    </p>
                </div>
                <button
                    onClick={() => setModal(true)}
                    className="flex h-11 items-center gap-2 rounded-xl bg-[#5b3c78] px-4 text-sm font-semibold text-white"
                >
                    <Plus className="size-4" /> New request
                </button>
            </div>
            <section className="rounded-2xl border border-[#e9e2e9] bg-white p-5 sm:p-6">
                <div className="mb-5 flex flex-wrap gap-3 border-b border-[#eee8ee] pb-5">
                    <label className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-[#d9cedc] px-3 py-2">
                        <Search className="size-4 text-[#837a85]" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search employee..."
                            className="w-full text-sm outline-none"
                        />
                    </label>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="rounded-lg border border-[#d9cedc] px-3 py-2 text-sm"
                    >
                        <option value="">All statuses</option>
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                    </select>
                </div>
                {error && (
                    <p role="alert" className="mb-4 text-sm text-red-700">
                        {error}
                    </p>
                )}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] text-left text-xs text-[#625968]">
                        <thead className="border-b border-[#eee9ee] text-[10px] font-semibold tracking-[0.13em] text-[#aaa0ad] uppercase">
                            <tr>
                                {[
                                    "Employee",
                                    "Leave types",
                                    "Dates",
                                    "Status",
                                    "Actions",
                                ].map((h) => (
                                    <th key={h} className="pb-3">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f1edf1]">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="py-8 text-center"
                                    >
                                        Loading leave requests...
                                    </td>
                                </tr>
                            ) : !items.length ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="py-8 text-center"
                                    >
                                        No leave requests found.
                                    </td>
                                </tr>
                            ) : (
                                items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="py-4 font-semibold text-[#3c3440]">
                                            {item.employee?.name ??
                                                "Unknown employee"}
                                            <span className="ml-2 font-normal text-[#9a909c]">
                                                {item.employee?.employee_number}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            {item.leave_type}
                                        </td>
                                        <td className="py-4">
                                            {date(item.start_date)} –{" "}
                                            {date(item.end_date)}
                                        </td>
                                        <td className="py-4">
                                            <span
                                                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${colors[item.status]}`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            {item.status === "Pending" && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            review(
                                                                item,
                                                                "Approved",
                                                            )
                                                        }
                                                        className="rounded-lg bg-[#e6f1ea] px-2.5 py-1 font-semibold text-[#56806a]"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            review(
                                                                item,
                                                                "Rejected",
                                                            )
                                                        }
                                                        className="rounded-lg bg-[#fae5e2] px-2.5 py-1 font-semibold text-[#aa665e]"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
            <section className="mt-6 rounded-2xl border border-[#e9e2e9] bg-white p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-base font-semibold text-[#352e39]">
                            Leave balances
                        </h2>
                        <p className="mt-1 text-xs text-[#9a909c]">
                            Current allocation and usage for{" "}
                            {new Date().getFullYear()}.
                        </p>
                    </div>
                    <button
                        onClick={() => setBalanceModal(true)}
                        className="rounded-lg bg-[#5b3c78] px-3 py-2 text-xs font-semibold text-white"
                    >
                        Add balance
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-left text-xs text-[#625968]">
                        <thead className="border-b border-[#eee9ee] text-[10px] font-semibold tracking-[0.13em] text-[#aaa0ad] uppercase">
                            <tr>
                                {[
                                    "Employee",
                                    "Leave type",
                                    "Allocated",
                                    "Used",
                                    "Remaining",
                                ].map((heading) => (
                                    <th key={heading} className="pb-3">
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f1edf1]">
                            {!groupedBalances.length ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="py-6 text-center"
                                    >
                                        No leave balances configured.
                                    </td>
                                </tr>
                            ) : (
                                groupedBalances.map((group) => {
                                    const employeeId = group.employee?.id ?? group.balances[0].employee_id;
                                    const expanded = expandedEmployees[employeeId];
                                    const totals = group.balances.reduce((sum, balance) => ({
                                        allocated: sum.allocated + balance.allocated_days,
                                        used: sum.used + balance.used_days,
                                        remaining: sum.remaining + balance.remaining_days,
                                    }), { allocated: 0, used: 0, remaining: 0 });
                                    return <>
                                    <tr key={employeeId} className="bg-[#fcfafc]">
                                        <td className="py-4 font-semibold text-[#3c3440]">
                                            <button type="button" onClick={() => toggleEmployee(employeeId)} className="mr-2 inline-flex align-middle text-[#79558a]" aria-label={`${expanded ? "Collapse" : "Expand"} balances for ${group.employee?.name}`}>
                                                {expanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                                            </button>
                                            {group.employee?.name}
                                            <span className="ml-2 font-normal text-[#9a909c]">
                                                {group.employee?.employee_number}
                                            </span>
                                        </td>
                                        <td className="py-4 text-[#837a85]">{group.balances.length} leave type{group.balances.length === 1 ? "" : "s"}</td>
                                        <td className="py-4">{totals.allocated} days</td>
                                        <td className="py-4">{totals.used} days</td>
                                        <td className="py-4 font-semibold text-[#56806a]">
                                            {totals.remaining} days
                                        </td>
                                    </tr>
                                    {expanded && group.balances.map((balance) => <tr key={balance.id}><td className="py-3 pl-10 text-[#837a85]">↳ {balance.leave_type}</td><td className="py-3">{balance.leave_type}</td><td className="py-3">{balance.allocated_days} days</td><td className="py-3">{balance.used_days} days</td><td className="py-3 font-semibold text-[#56806a]">{balance.remaining_days} days</td></tr>)}
                                    </>;
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
            {modal && (
                <AddLeaveRequestModal
                    employees={employees}
                    onClose={() => setModal(false)}
                    onCreated={() => {
                        setModal(false);
                        load();
                    }}
                />
            )}
            {balanceModal && (
                <AddLeaveBalanceModal
                    employees={employees}
                    onClose={() => setBalanceModal(false)}
                    onCreated={() => {
                        setBalanceModal(false);
                        load();
                    }}
                />
            )}
        </>
    );
}
