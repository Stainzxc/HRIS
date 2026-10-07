import { useEffect, useRef, useState } from "react";
import { createLeaveBalance } from "../services/leaveBalanceService";

const leaveTypes = [
    "Vacation leave",
    "Sick leave",
    "Emergency leave",
    "Bereavement leave",
    "Maternity leave",
    "Paternity leave",
    "Service incentive leave",
    "Other leave",
];

export default function AddLeaveBalanceModal({
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
        data.used_days = data.used_days || 0;
        try {
            const response = await createLeaveBalance(data);
            onCreated(response.data.data);
        } catch (requestError) {
            setErrors(requestError.response?.data?.errors ?? {});
            setError(
                requestError.response?.status === 422
                    ? "Please check the highlighted fields."
                    : "Unable to save the leave balance.",
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
            onCancel={(event) => {
                event.preventDefault();
                if (!saving) onClose();
            }}
            className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border border-[#e9e2e9] bg-white p-6 text-[#352e39] shadow-xl backdrop:bg-black/40"
        >
            <h2 className="text-xl font-semibold">Add leave balance</h2>
            <p className="mt-2 text-sm text-[#837a85]">
                Set an employee&apos;s annual leave allocation.
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
                        Employee <span className="text-red-700">*</span>
                        <select name="employee_id" required className={input}>
                            <option value="">Select employee</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.name} ({employee.employee_number})
                                </option>
                            ))}
                        </select>
                        {fieldError("employee_id")}
                    </label>
                    <label className="text-sm font-medium">
                        Leave type <span className="text-red-700">*</span>
                        <select
                            name="leave_type"
                            required
                            defaultValue=""
                            className={input}
                        >
                            <option value="" disabled>
                                Select leave type
                            </option>
                            {leaveTypes.map((type) => (
                                <option key={type}>{type}</option>
                            ))}
                        </select>
                        {fieldError("leave_type")}
                    </label>
                    <label className="text-sm font-medium">
                        Year <span className="text-red-700">*</span>
                        <input
                            name="year"
                            type="number"
                            min="2000"
                            max="2100"
                            defaultValue={new Date().getFullYear()}
                            required
                            className={input}
                        />
                        {fieldError("year")}
                    </label>
                    <label className="text-sm font-medium">
                        Allocated days <span className="text-red-700">*</span>
                        <input
                            name="allocated_days"
                            type="number"
                            min="0"
                            required
                            className={input}
                        />
                        {fieldError("allocated_days")}
                    </label>
                    <label className="text-sm font-medium">
                        Used days
                        <input
                            name="used_days"
                            type="number"
                            min="0"
                            defaultValue="0"
                            className={input}
                        />
                        {fieldError("used_days")}
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
                        disabled={saving}
                        className="rounded-lg bg-[#5b3c78] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                    >
                        {saving ? "Saving..." : "Save balance"}
                    </button>
                </div>
            </form>
        </dialog>
    );
}
