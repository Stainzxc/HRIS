import { useEffect, useState } from "react";
import {
    Building2,
    ChevronLeft,
    ChevronRight,
    Pencil,
    Plus,
    Trash2,
    X,
} from "lucide-react";
import {
    createDepartment,
    deleteDepartment,
    getDepartments,
    updateDepartment,
} from "../services/departmentService";

const emptyForm = { name: "", description: "" };

export default function DepartmentManagement() {
    const [departments, setDepartments] = useState([]);
    const [page, setPage] = useState(1);
    const [isPaginating, setIsPaginating] = useState(false);
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
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const load = () =>
        getDepartments(page)
            .then(({ data }) => {
                const rows = data.data ?? data;
                setDepartments(rows);
                setPagination({
                    current: data.meta?.current_page ?? page,
                    last: data.meta?.last_page ?? 1,
                    total: data.meta?.total ?? rows.length,
                    from: data.meta?.from ?? 0,
                    to: data.meta?.to ?? rows.length,
                });
            })
            .catch(() => setError("Unable to load departments."))
            .finally(() => {
                setLoading(false);
                setIsPaginating(false);
            });
    useEffect(() => {
        load();
    }, [page]);
    const submit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        try {
            if (editing) await updateDepartment(editing.id, form);
            else await createDepartment(form);
            setForm(emptyForm);
            setEditing(null);
            setModalOpen(false);
            await load();
        } catch (requestError) {
            setError(
                requestError.response?.data?.message ??
                    "Unable to save department.",
            );
        } finally {
            setSaving(false);
        }
    };
    const beginAdd = () => {
        setEditing(null);
        setForm(emptyForm);
        setModalOpen(true);
    };
    const beginEdit = (department) => {
        setEditing(department);
        setForm({
            name: department.name,
            description: department.description ?? "",
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
    const remove = async (department) => {
        if (!window.confirm(`Delete ${department.name}?`)) return;
        try {
            await deleteDepartment(department.id);
            if (page > 1 && departments.length === 1) setPage(page - 1);
            else await load();
        } catch {
            setError("Unable to delete department. It may still be in use.");
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
                        Department management
                    </h1>
                    <p className="mt-2 text-sm text-[#837a85]">
                        Organize your teams and the positions within them.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={beginAdd}
                    className="flex items-center gap-2 rounded-xl bg-[#5b3c78] px-4 py-3 text-sm font-semibold text-white"
                >
                    <Plus className="size-4" />
                    Add department
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
                <div className="flex items-center justify-between p-5 sm:p-6">
                    <h2 className="text-lg font-semibold">All departments</h2>
                    <span className="text-xs text-[#837a85]">
                        {pagination.total} total
                    </span>
                </div>
                {loading && departments.length === 0 ? (
                    <p className="p-6 text-sm text-[#837a85]">
                        Loading departments...
                    </p>
                ) : departments.length === 0 ? (
                    <div className="p-10 text-center">
                        <Building2
                            className="mx-auto size-8 text-[#b4a5b8]"
                            strokeWidth={1.5}
                        />
                        <p className="mt-3 text-sm text-[#837a85]">
                            No departments yet. Add your first department to get
                            started.
                        </p>
                    </div>
                ) : (
                    <div className="relative overflow-x-auto">
                        {(loading || isPaginating) && (
                            <div className="absolute inset-0 z-10 grid place-items-center bg-white/70">
                                <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm text-[#837a85] shadow-sm" role="status" aria-live="polite">
                                    <span className="size-4 animate-spin rounded-full border-2 border-[#d9cedc] border-t-[#5b3c78]" />
                                    Loading departments...
                                </div>
                            </div>
                        )}
                        <table className="w-full min-w-[680px] text-left text-sm">
                            <thead className="border-y border-[#eee8ee] bg-[#fcfbf9] text-xs text-[#837a85]">
                                <tr>
                                    <th className="px-5 py-3 font-semibold">
                                        Department
                                    </th>
                                    <th className="px-5 py-3 font-semibold">
                                        Description
                                    </th>
                                    <th className="px-5 py-3 font-semibold">
                                        Positions
                                    </th>
                                    <th className="px-5 py-3 text-right font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y divide-[#eee8ee] ${loading || isPaginating ? "opacity-50" : ""}`}>
                                {departments.map((department) => (
                                    <tr
                                        key={department.id}
                                        className="hover:bg-[#fdfbfc]"
                                    >
                                        <td className="px-5 py-4 font-semibold">
                                            {department.name}
                                        </td>
                                        <td className="max-w-xs truncate px-5 py-4 text-[#837a85]">
                                            {department.description ||
                                                "No description"}
                                        </td>
                                        <td className="px-5 py-4 text-[#76548b]">
                                            {department.positions?.length ?? 0}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        beginEdit(department)
                                                    }
                                                    aria-label={`Edit ${department.name}`}
                                                    className="rounded-lg p-2 text-[#76548b] hover:bg-[#f4eff4]"
                                                >
                                                    <Pencil className="size-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        remove(department)
                                                    }
                                                    aria-label={`Delete ${department.name}`}
                                                    className="rounded-lg p-2 text-[#a05f61] hover:bg-[#fbefef]"
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
                )}
                {departments.length > 0 && (
                    <div className="flex items-center justify-between border-t border-[#eee8ee] px-5 py-4 text-xs text-[#837a85]">
                        <span>{loading || isPaginating ? "Loading departments..." : `Showing ${pagination.from}-${pagination.to} of ${pagination.total}`}</span>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={loading || isPaginating || pagination.current <= 1}
                                onClick={() => { setIsPaginating(true); setPage(page - 1); }}
                                className="rounded-lg border border-[#d9cedc] p-2 disabled:opacity-40"
                                aria-label="Previous page"
                            >
                                <ChevronLeft className="size-4" />
                            </button>
                            <span>
                                Page {pagination.current} of{" "}
                                {Math.max(1, pagination.last)}
                            </span>
                            <button
                                type="button"
                                disabled={loading || isPaginating || pagination.current >= pagination.last}
                                onClick={() => { setIsPaginating(true); setPage(page + 1); }}
                                className="rounded-lg border border-[#d9cedc] p-2 disabled:opacity-40"
                                aria-label="Next page"
                            >
                                <ChevronRight className="size-4" />
                            </button>
                        </div>
                    </div>
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
                        aria-labelledby="department-modal-title"
                        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <h2
                                id="department-modal-title"
                                className="text-xl font-semibold"
                            >
                                {editing ? "Edit department" : "Add department"}
                            </h2>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="rounded-lg p-2 text-[#837a85] hover:bg-[#f4eff4]"
                                aria-label="Close modal"
                            >
                                <X className="size-5" />
                            </button>
                        </div>
                        <form onSubmit={submit} className="mt-5 space-y-4">
                            <div>
                                <label
                                    htmlFor="department-name"
                                    className="text-sm font-medium"
                                >
                                    Name
                                </label>
                                <input
                                    id="department-name"
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
                                    htmlFor="department-description"
                                    className="text-sm font-medium"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="department-description"
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
                                          : "Add department"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
