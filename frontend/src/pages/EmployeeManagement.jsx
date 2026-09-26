import { useEffect, useState } from "react";
import EditEmployeeModal from "../components/EditEmployeeModal";
import { getEmployees } from "../services/employeeService";

function Icon({ name, className = "" }) {
    const paths = {
        plus: <><path d="M12 5v14M5 12h14" /></>,
        search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
    };
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`size-5 shrink-0 ${className}`}>{paths[name]}</svg>;
}

export default function EmployeeContent({ onAddEmployee }) {
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [employeesData, setEmployeesData] = useState([]);
    const [filters, setFilters] = useState({ search: "", employment_status: "", employee_type: "" });
    const [appliedFilters, setAppliedFilters] = useState(filters);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ current: 1, last: 1, total: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;
        setLoading(true);
        setError("");
        getEmployees(appliedFilters, page)
            .then((response) => {
                if (!Array.isArray(response.data.data)) throw new Error("Invalid employee response");
                if (!ignore) {
                    setEmployeesData(response.data.data);
                    setPagination({
                        current: response.data.meta?.current_page ?? page,
                        last: response.data.meta?.last_page ?? 1,
                        total: response.data.meta?.total ?? response.data.data.length,
                    });
                }
            })
            .catch(() => {
                if (!ignore) setError("Unable to load employees. Please try again later.");
            })
            .finally(() => { if (!ignore) setLoading(false); });
        return () => { ignore = true; };
    }, [appliedFilters, page]);

    const applyFilters = () => {
        setPage(1);
        setAppliedFilters(filters);
    };
    
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
    const count = (value) => error ? "?" : value;
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
                    [count(pagination.total), "Total employees"],
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
            <section aria-busy={loading} className="rounded-2xl border border-[#e9e2e9] bg-white p-5 sm:p-6">
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
                                value={filters.search}
                                onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
                                aria-label="Search employees"
                                className="h-9 w-full rounded-lg border border-[#e7e0e7] bg-[#fcfbf9] pl-9 text-xs outline-none placeholder:text-[#b0a6b1] focus:border-[#a786b5]"
                            />
                        </div>
                        <button type="button" onClick={applyFilters} className="rounded-lg border border-[#e3dbe5] px-3 text-xs font-semibold text-[#675b6b]">
                            Search
                        </button>
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 border-t border-[#f1edf1] pt-4">
                    <select aria-label="Filter by employment status" value={filters.employment_status} onChange={(event) => setFilters((current) => ({ ...current, employment_status: event.target.value }))} className="h-9 rounded-lg border border-[#e7e0e7] bg-[#fcfbf9] px-3 text-xs text-[#675b6b]">
                        <option value="">All statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="terminated">Terminated</option>
                    </select>
                    <select aria-label="Filter by employee type" value={filters.employee_type} onChange={(event) => setFilters((current) => ({ ...current, employee_type: event.target.value }))} className="h-9 rounded-lg border border-[#e7e0e7] bg-[#fcfbf9] px-3 text-xs text-[#675b6b]">
                        <option value="">All employee types</option>
                        <option value="full_time">Full-time</option>
                        <option value="part_time">Part-time</option>
                        <option value="contract">Contract</option>
                    </select>
                    {(filters.search || filters.employment_status || filters.employee_type) && <button type="button" onClick={() => { const clearedFilters = { search: "", employment_status: "", employee_type: "" }; setFilters(clearedFilters); setPage(1); setAppliedFilters(clearedFilters); }} className="text-xs font-semibold text-[#76548b]">Clear filters</button>}
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
                                            {loading ? <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-[#d9cedc] border-t-[#5b3c78]" /> Loading employees...</span> : error || "No employees found."}
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
                                        <td className="py-4 text-right text-[#9a909c]"><button type="button" onClick={() => setEditingEmployee(employeesData.find((employee) => employee.id === id))} aria-label={`Edit ${name}`} title="Edit employee" className="inline-flex items-center justify-center rounded px-2 py-2 hover:bg-[#f4eff4] hover:text-[#5b3c78]"><span aria-hidden="true" className="flex flex-col gap-0.5"><span className="size-1 rounded-full bg-current" /><span className="size-1 rounded-full bg-current" /><span className="size-1 rounded-full bg-current" /></span></button>
                                        </td>
                                    </tr>
                                ),
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-[#f1edf1] pt-4 text-[11px] text-[#9a909c]">
                    <span>{loading ? "Fetching employees..." : error ? "Employees unavailable" : `Showing ${directoryEmployees.length} of ${pagination.total} employees`}</span>
                    {!loading && !error && pagination.last > 1 && <div className="flex items-center gap-2">
                        <button type="button" disabled={page === 1} onClick={() => setPage((currentPage) => currentPage - 1)} className="rounded-md border border-[#e3dbe5] px-2.5 py-1.5 font-semibold disabled:opacity-40">Previous</button>
                        <span>Page {pagination.current} of {pagination.last}</span>
                        <button type="button" disabled={page >= pagination.last} onClick={() => setPage((currentPage) => currentPage + 1)} className="rounded-md border border-[#e3dbe5] px-2.5 py-1.5 font-semibold disabled:opacity-40">Next</button>
                    </div>}
                </div>
            </section>
            {editingEmployee && <EditEmployeeModal employee={editingEmployee} onClose={() => setEditingEmployee(null)} onUpdated={() => { setEditingEmployee(null); setPage(1); setAppliedFilters({ ...appliedFilters }); }} />}
        </>
    );
}

