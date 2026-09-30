import { useEffect, useMemo, useState } from "react";
import {
    BriefcaseBusiness,
    ChevronLeft,
    ChevronRight,
    Pencil,
    Plus,
    Search,
    Trash2,
    X,
} from "lucide-react";
import { getDepartments } from "../services/departmentService";
import {
    createPosition,
    deletePosition,
    getPositions,
    updatePosition,
} from "../services/positionService";

const emptyForm = { name: "", description: "", department_id: "" };

export default function PositionManagement() {
    const [positions, setPositions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        last: 1,
        total: 0,
        from: 0,
        to: 0,
    });
    const [form, setForm] = useState(emptyForm);
    const [editing, setEditing] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({ search: "", department_id: "" });
    const [appliedFilters, setAppliedFilters] = useState({
        search: "",
        department_id: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const load = () => {
        setLoading(true);
        return Promise.all([
            getPositions(appliedFilters, page),
            getDepartments(),
        ])
            .then(([positionResponse, departmentResponse]) => {
                const departmentData =
                    departmentResponse.data.data ?? departmentResponse.data;
                setDepartments(departmentData);
                const positionData =
                    positionResponse.data.data ?? positionResponse.data;
                setPositions(positionData);
                setPagination({
                    current: positionResponse.data.meta?.current_page ?? page,
                    last: positionResponse.data.meta?.last_page ?? 1,
                    total:
                        positionResponse.data.meta?.total ??
                        positionData.length,
                    from: positionResponse.data.meta?.from ?? 0,
                    to: positionResponse.data.meta?.to ?? positionData.length,
                });
            })
            .catch(() => setError("Unable to load positions."))
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        load();
    }, [page, appliedFilters]);
    const totalPages = Math.max(1, pagination.last);
    const visiblePositions = positions;
    const applyFilters = (event) => {
        event.preventDefault();
        setPage(1);
        setAppliedFilters(filters);
    };
    const submit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        try {
            const payload = {
                name: form.name,
                department_id: Number(form.department_id),
                description: form.description,
            };
            if (editing) await updatePosition(editing.id, payload);
            else await createPosition(payload);
            setForm(emptyForm);
            setEditing(null);
            setModalOpen(false);
            setPage(1);
            await load();
        } catch (requestError) {
            setError(
                requestError.response?.data?.message ??
                    "Unable to save position.",
            );
        } finally {
            setSaving(false);
        }
    };
    const beginAdd = () => {
        setEditing(null);
        setForm({ ...emptyForm, department_id: departments[0]?.id ?? "" });
        setModalOpen(true);
    };
    const beginEdit = (position) => {
        setEditing(position);
        setForm({
            name: position.name,
            description: position.description ?? "",
            department_id: position.department?.id ?? "",
        });
        setModalOpen(true);
    };
    const closeModal = () => {
        if (!saving) {
            setModalOpen(false);
            setEditing(null);
            setForm(emptyForm);
        }
    };
    const remove = async (position) => {
        if (!window.confirm(`Delete ${position.name}?`)) return;
        try {
            await deletePosition(position.id);
            if (page > 1 && positions.length === 1) setPage(page - 1);
            else await load();
        } catch {
            setError("Unable to delete position. It may still be in use.");
        }
    };
    return (
        <>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
                <div>
                    <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-[#9b82a4] uppercase">
                        Organization
                    </p>
                    <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                        Position management
                    </h1>
                    <p className="mt-2 text-sm text-[#837a85]">
                        Manage roles and assign them to departments.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={beginAdd}
                    disabled={!departments.length}
                    className="flex items-center gap-2 rounded-xl bg-[#5b3c78] px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
                >
                    <Plus className="size-4" />
                    Add position
                </button>
            </div>
            {error && (
                <p
                    role="alert"
                    className="mb-5 rounded-lg bg-[#fbefef] p-3 text-sm text-[#a05f61]"
                >
                    {error}
                </p>
            )}
            <section className="overflow-hidden rounded-2xl border border-[#e9e2e9] bg-white">
                <form
                    onSubmit={applyFilters}
                    className="flex flex-wrap gap-3 border-b border-[#eee8ee] p-5 sm:p-6"
                >
                    <label className="flex min-w-60 flex-1 items-center gap-2 rounded-lg border border-[#d9cedc] px-3 py-2">
                        <Search className="size-4 text-[#837a85]" />
                        <input
                            value={filters.search}
                            onChange={(event) =>
                                setFilters({
                                    ...filters,
                                    search: event.target.value,
                                })
                            }
                            placeholder="Search positions..."
                            className="w-full text-sm outline-none"
                        />
                    </label>
                    <select
                        value={filters.department_id}
                        onChange={(event) =>
                            setFilters({
                                ...filters,
                                department_id: event.target.value,
                            })
                        }
                        className="rounded-lg border border-[#d9cedc] px-3 py-2 text-sm"
                    >
                        <option value="">All departments</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="rounded-lg bg-[#5b3c78] px-4 py-2 text-sm font-semibold text-white"
                    >
                        Filter
                    </button>
                </form>
                <div className="flex items-center justify-between p-5 sm:p-6">
                    <h2 className="text-lg font-semibold">All positions</h2>
                    <span className="text-xs text-[#837a85]">
                        {positions.length} total
                    </span>
                </div>
                {loading ? (
                    <p className="p-6 text-sm text-[#837a85]">
                        Loading positions...
                    </p>
                ) : !positions.length ? (
                    <div className="p-10 text-center">
                        <BriefcaseBusiness
                            className="mx-auto size-8 text-[#b4a5b8]"
                            strokeWidth={1.5}
                        />
                        <p className="mt-3 text-sm text-[#837a85]">
                            No positions yet.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[680px] text-left text-sm">
                                <thead className="border-y border-[#eee8ee] bg-[#fcfbf9] text-xs text-[#837a85]">
                                    <tr>
                                        <th className="px-5 py-3 font-semibold">
                                            Position
                                        </th>
                                        <th className="px-5 py-3 font-semibold">
                                            Department
                                        </th>
                                        <th className="px-5 py-3 font-semibold">
                                            Description
                                        </th>
                                        <th className="px-5 py-3 text-right font-semibold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#eee8ee]">
                                    {visiblePositions.map((position) => (
                                        <tr
                                            key={position.id}
                                            className="hover:bg-[#fdfbfc]"
                                        >
                                            <td className="px-5 py-4 font-semibold">
                                                {position.name}
                                            </td>
                                            <td className="px-5 py-4 text-[#76548b]">
                                                {position.department?.name ??
                                                    "Unassigned"}
                                            </td>
                                            <td className="max-w-xs truncate px-5 py-4 text-[#837a85]">
                                                {position.description ||
                                                    "No description"}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            beginEdit(position)
                                                        }
                                                        className="rounded-lg p-2 text-[#76548b] hover:bg-[#f4eff4]"
                                                        aria-label={`Edit ${position.name}`}
                                                    >
                                                        <Pencil className="size-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            remove(position)
                                                        }
                                                        className="rounded-lg p-2 text-[#a05f61] hover:bg-[#fbefef]"
                                                        aria-label={`Delete ${position.name}`}
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-center justify-between border-t border-[#eee8ee] px-5 py-4 text-xs text-[#837a85]">
                            <span>
                                Showing {pagination.from}-{pagination.to} of{" "}
                                {pagination.total}
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                    className="rounded-lg border border-[#d9cedc] p-2 disabled:opacity-40"
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft className="size-4" />
                                </button>
                                <span>
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    type="button"
                                    disabled={page === totalPages}
                                    onClick={() => setPage(page + 1)}
                                    className="rounded-lg border border-[#d9cedc] p-2 disabled:opacity-40"
                                    aria-label="Next page"
                                >
                                    <ChevronRight className="size-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </section>
            {modalOpen && (
                <div
                    className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
                    role="presentation"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closeModal();
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">
                                {editing ? "Edit position" : "Add position"}
                            </h2>
                            <button
                                type="button"
                                onClick={closeModal}
                                aria-label="Close modal"
                            >
                                <X className="size-5" />
                            </button>
                        </div>
                        <form onSubmit={submit} className="mt-5 space-y-4">
                            <div>
                                <label
                                    htmlFor="position-name"
                                    className="text-sm font-medium"
                                >
                                    Name
                                </label>
                                <input
                                    id="position-name"
                                    required
                                    autoFocus
                                    value={form.name}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            name: event.target.value,
                                        })
                                    }
                                    className="mt-1 w-full rounded-lg border border-[#d9cedc] px-3 py-2 text-sm"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="position-department"
                                    className="text-sm font-medium"
                                >
                                    Department
                                </label>
                                <select
                                    id="position-department"
                                    required
                                    value={form.department_id}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            department_id: event.target.value,
                                        })
                                    }
                                    className="mt-1 w-full rounded-lg border border-[#d9cedc] px-3 py-2 text-sm"
                                >
                                    {departments.map((department) => (
                                        <option
                                            key={department.id}
                                            value={department.id}
                                        >
                                            {department.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="position-description"
                                    className="text-sm font-medium"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="position-description"
                                    rows="4"
                                    value={form.description}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            description: event.target.value,
                                        })
                                    }
                                    className="mt-1 w-full rounded-lg border border-[#d9cedc] px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-lg border border-[#d9cedc] px-4 py-2 text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={saving}
                                    className="rounded-lg bg-[#5b3c78] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                                >
                                    {saving
                                        ? "Saving..."
                                        : editing
                                          ? "Save changes"
                                          : "Add position"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
