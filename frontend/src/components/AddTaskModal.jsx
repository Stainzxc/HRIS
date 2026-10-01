import { useEffect, useRef, useState } from "react";
import { createTask } from "../services/taskService";

export default function AddTaskModal({ onClose, onCreated }) {
    const dialogRef = useRef(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dialogRef.current.showModal();
        return () => dialogRef.current?.close();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        setSaving(true);
        setError("");
        setErrors({});
        const task = Object.fromEntries(new FormData(event.currentTarget));
        task.due_date = task.due_date || null;
        try {
            const { data } = await createTask(task);
            onCreated(data.data);
        } catch (requestError) {
            setErrors(requestError.response?.data?.errors ?? {});
            setError(
                requestError.response?.status === 422
                    ? "Please check the highlighted fields."
                    : "Unable to save the task. Please try again.",
            );
            setSaving(false);
        }
    }

    const inputClass =
        "mt-1 w-full rounded-lg border border-[#d9cedc] bg-white px-3 py-2 text-sm outline-none focus:border-[#79558a]";
    const fieldError = (name) =>
        errors[name] && (
            <p className="mt-1 text-xs text-red-700">
                {[].concat(errors[name]).join(" ")}
            </p>
        );

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby="add-task-title"
            onCancel={(event) => {
                event.preventDefault();
                if (!saving) onClose();
            }}
            className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border border-[#e9e2e9] bg-white p-6 text-[#352e39] shadow-xl backdrop:bg-black/40"
        >
            <h2 id="add-task-title" className="text-xl font-semibold">
                Add task
            </h2>
            <p className="mt-2 text-sm text-[#837a85]">
                Add a task to your workspace.
            </p>
            <form onSubmit={handleSubmit} className="mt-5">
                {error && (
                    <p role="alert" className="mb-4 text-sm text-red-700">
                        {error}
                    </p>
                )}
                <fieldset
                    disabled={saving}
                    className="grid gap-4 sm:grid-cols-2"
                >
                    <label className="sm:col-span-2 text-sm font-medium">
                        Title *
                        <input
                            name="title"
                            required
                            maxLength="255"
                            className={inputClass}
                        />
                        {fieldError("title")}
                    </label>
                    <label className="text-sm font-medium">
                        Owner
                        <input
                            name="owner"
                            maxLength="255"
                            className={inputClass}
                        />
                        {fieldError("owner")}
                    </label>
                    <label className="text-sm font-medium">
                        Due date
                        <input
                            name="due_date"
                            type="date"
                            className={inputClass}
                        />
                        {fieldError("due_date")}
                    </label>
                    <label className="text-sm font-medium">
                        Priority *
                        <select
                            name="priority"
                            defaultValue="Medium"
                            className={inputClass}
                        >
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                        {fieldError("priority")}
                    </label>
                    <label className="text-sm font-medium">
                        Status *
                        <select
                            name="status"
                            defaultValue="To do"
                            className={inputClass}
                        >
                            <option>To do</option>
                            <option>In progress</option>
                            <option>Completed</option>
                        </select>
                        {fieldError("status")}
                    </label>
                    <label className="sm:col-span-2 text-sm font-medium">
                        Description
                        <textarea
                            name="description"
                            rows="3"
                            className={inputClass}
                        />
                        {fieldError("description")}
                    </label>
                </fieldset>
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        disabled={saving}
                        onClick={onClose}
                        className="rounded-lg border border-[#d9cedc] px-4 py-2 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-lg bg-[#5b3c78] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                    >
                        {saving ? "Saving..." : "Save task"}
                    </button>
                </div>
            </form>
        </dialog>
    );
}
