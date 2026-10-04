import { useEffect, useRef, useState } from "react";
import { createLeaveRequest } from "../services/leaveRequestService";

export default function AddLeaveRequestModal({
    employees,
    onClose,
    onCreated,
}) {
    const dialogRef = useRef(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    useEffect(() => {
        dialogRef.current.showModal();
        return () => dialogRef.current?.close();
    }, []);
    async function submit(event) {
        event.preventDefault();
        setSaving(true);
        setError("");
        setErrors({});
        const data = Object.fromEntries(new FormData(event.currentTarget));
        try {
            const response = await createLeaveRequest(data);
            onCreated(response.data.data);
        } catch (e) {
            setErrors(e.response?.data?.errors ?? {});
            setError(
                e.response?.status === 422
                    ? "Please check the highlighted fields."
                    : "Unable to save the request.",
            );
            setSaving(false);
        }
    }
    const input =
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
            onCancel={(e) => {
                e.preventDefault();
                if (!saving) onClose();
            }}
            className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border border-[#e9e2e9] bg-white p-6 text-[#352e39] shadow-xl backdrop:bg-black/40"
        >
            <h2 className="text-xl font-semibold">New leave request</h2>
            <p className="mt-2 text-sm text-[#837a85]">
                Submit time off for an employee.
            </p>
            <form onSubmit={submit} className="mt-5">
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
                        Employee
                        <select name="employee_id" required className={input}>
                            <option value="">Select employee</option>
                            {employees.map((e) => (
                                <option key={e.id} value={e.id}>
                                    {e.name} ({e.employee_number})
                                </option>
                            ))}
                        </select>
                        {fieldError("employee_id")}
                    </label>
                    <label className="text-sm font-medium">
                        Leave type
                        <input
                            name="leave_type"
                            required
                            placeholder="Vacation leave"
                            className={input}
                        />
                        {fieldError("leave_type")}
                    </label>
                    <label className="text-sm font-medium">
                        Reason
                        <input name="reason" className={input} />
                        {fieldError("reason")}
                    </label>
                    <label className="text-sm font-medium">
                        Start date
                        <input
                            name="start_date"
                            type="date"
                            required
                            className={input}
                        />
                        {fieldError("start_date")}
                    </label>
                    <label className="text-sm font-medium">
                        End date
                        <input
                            name="end_date"
                            type="date"
                            required
                            className={input}
                        />
                        {fieldError("end_date")}
                    </label>
                </fieldset>
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-[#d9cedc] px-4 py-2 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={saving}
                        className="rounded-lg bg-[#5b3c78] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                    >
                        {saving ? "Saving..." : "Submit request"}
                    </button>
                </div>
            </form>
        </dialog>
    );
}
