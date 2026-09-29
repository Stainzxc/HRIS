import { useEffect, useState } from "react";
import { BriefcaseBusiness, Pencil, Plus, Trash2, X } from "lucide-react";
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
    const [form, setForm] = useState(emptyForm);
    const [editing, setEditing] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const load = () =>
        Promise.all([getPositions(), getDepartments()])
            .then(([positionResponse, departmentResponse]) => {
                const departmentData =
                    departmentResponse.data.data ?? departmentResponse.data;
                setDepartments(departmentData);
                const departmentByPosition = new Map(
                    departmentData.flatMap((department) =>
                        (department.positions ?? []).map((position) => [
                            position.id,
                            department,
                        ]),
                    ),
                );
                setPositions(
                    (positionResponse.data.data ?? positionResponse.data).map(
                        (position) => ({
                            ...position,
                            department: departmentByPosition.get(position.id),
                        }),
                    ),
                );
            })
            .catch(() => setError("Unable to load positions."))
            .finally(() => setLoading(false));
    useEffect(() => {
        load();
    }, []);
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
            await load();
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
            <section className="rounded-2xl border border-[#e9e2e9] bg-white p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">All positions</h2>
                    <span className="text-xs text-[#837a85]">
                        {positions.length} total
                    </span>
                </div>
                {loading ? (
                    <p className="text-sm text-[#837a85]">
                        Loading positions...
                    </p>
                ) : !positions.length ? (
                    <div className="py-10 text-center">
                        <BriefcaseBusiness
                            className="mx-auto size-8 text-[#b4a5b8]"
                            strokeWidth={1.5}
                        />
                        <p className="mt-3 text-sm text-[#837a85]">
                            No positions yet.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-[#eee8ee]">
                        {positions.map((position) => (
                            <div
                                key={position.id}
                                className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
                            >
                                <div>
                                    <h3 className="font-semibold">
                                        {position.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-[#837a85]">
                                        {position.description ||
                                            "No description"}
                                    </p>
                                    <p className="mt-2 text-xs text-[#9b82a4]">
                                        {position.department?.name ??
                                            "Unassigned"}
                                    </p>
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        type="button"
                                        onClick={() => beginEdit(position)}
                                        className="rounded-lg p-2 text-[#76548b] hover:bg-[#f4eff4]"
                                        aria-label={`Edit ${position.name}`}
                                    >
                                        <Pencil className="size-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => remove(position)}
                                        className="rounded-lg p-2 text-[#a05f61] hover:bg-[#fbefef]"
                                        aria-label={`Delete ${position.name}`}
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
