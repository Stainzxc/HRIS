import { useEffect, useState } from "react";
import { Building2, Pencil, Plus, Trash2, X } from "lucide-react";
import {
    createDepartment,
    deleteDepartment,
    getDepartments,
    updateDepartment,
} from "../services/employeeService";

const emptyForm = { name: "", description: "" };

export default function DepartmentManagement() {
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editing, setEditing] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const load = () =>
        getDepartments()
            .then(({ data }) => setDepartments(data.data ?? data))
            .catch(() => setError("Unable to load departments."))
            .finally(() => setLoading(false));
    useEffect(() => {
        load();
    }, []);
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
            await load();
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
            <section className="rounded-2xl border border-[#e9e2e9] bg-white p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">All departments</h2>
                    <span className="text-xs text-[#837a85]">
                        {departments.length} total
                    </span>
                </div>
                {loading ? (
                    <p className="text-sm text-[#837a85]">
                        Loading departments...
                    </p>
                ) : departments.length === 0 ? (
                    <div className="py-10 text-center">
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
                    <div className="divide-y divide-[#eee8ee]">
                        {departments.map((department) => (
                            <div
                                key={department.id}
                                className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
                            >
                                <div>
                                    <h3 className="font-semibold">
                                        {department.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-[#837a85]">
                                        {department.description ||
                                            "No description"}
                                    </p>
                                    <p className="mt-2 text-xs text-[#9b82a4]">
                                        {department.positions?.length ?? 0}{" "}
                                        position
                                        {department.positions?.length === 1
                                            ? ""
                                            : "s"}
                                    </p>
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        type="button"
                                        onClick={() => beginEdit(department)}
                                        aria-label={`Edit ${department.name}`}
                                        className="rounded-lg p-2 text-[#76548b] hover:bg-[#f4eff4]"
                                    >
                                        <Pencil className="size-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => remove(department)}
                                        aria-label={`Delete ${department.name}`}
                                        className="rounded-lg p-2 text-[#a05f61] hover:bg-[#fbefef]"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
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
