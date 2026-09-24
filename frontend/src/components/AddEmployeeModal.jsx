import { useEffect, useRef, useState } from "react";
import { createEmployee, getEmployeePositions } from "../services/employeeService";

const fields = [
    { name: "employee_number", label: "Employee number", maxLength: 255 },
    { name: "first_name", label: "First name", maxLength: 255 },
    { name: "middle_name", label: "Middle name", optional: true },
    { name: "last_name", label: "Last name", maxLength: 255 },
    { name: "email", label: "Email", type: "email", maxLength: 255 },
    { name: "phone_number", label: "Phone number", type: "tel", pattern: "09[0-9]{9}", title: "Enter 11 digits starting with 09", placeholder: "09123456789" },
    { name: "gender", label: "Gender", options: [["male", "Male"], ["female", "Female"]] },
    { name: "date_of_birth", label: "Date of birth", type: "date", optional: true },
    { name: "address", label: "Address", maxLength: 500 },
    { name: "position_id", label: "Position", options: [] },
    { name: "employment_status", label: "Employment status", defaultValue: "active", options: [["active", "Active"], ["inactive", "Inactive"], ["terminated", "Terminated"]] },
    { name: "employee_type", label: "Employee type", defaultValue: "full_time", options: [["full_time", "Full-time"], ["part_time", "Part-time"], ["contract", "Contract"]] },
    { name: "date_hired", label: "Date hired", type: "date" },
    { name: "salary", label: "Salary", type: "number", min: "0", step: "0.01" },
];

export default function AddEmployeeModal({ onClose, onCreated }) {
    const dialogRef = useRef(null);
    const submittingRef = useRef(false);
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [positionError, setPositionError] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const dialog = dialogRef.current;
        dialog.showModal();
        let ignore = false;
        getEmployeePositions()
            .then(({ data }) => {
                if (!Array.isArray(data.data)) throw new Error("Invalid positions response");
                if (!ignore) setPositions(data.data);
            })
            .catch(() => {
                if (!ignore) setPositionError("Unable to load positions. Close and reopen this form to try again.");
            })
            .finally(() => { if (!ignore) setLoading(false); });
        return () => {
            ignore = true;
            dialog.close();
        };
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        if (submittingRef.current || loading || positionError || !positions.length) return;
        const employee = Object.fromEntries(new FormData(event.currentTarget));
        employee.position_id = Number(employee.position_id);
        employee.middle_name = employee.middle_name.trim() || null;
        employee.date_of_birth = employee.date_of_birth || null;
        submittingRef.current = true;
        setSaving(true);
        setError("");
        setErrors({});
        try {
            await createEmployee(employee);
        } catch (requestError) {
            setErrors(requestError.response?.data?.errors ?? {});
            setError(requestError.response?.status === 422
                ? "Please check the highlighted fields."
                : "Unable to save the employee. Please try again.");
            submittingRef.current = false;
            setSaving(false);
            return;
        }
        onCreated();
    }

    return (
        <dialog ref={dialogRef} aria-labelledby="add-employee-title"
            onCancel={(event) => { event.preventDefault(); if (!saving) onClose(); }}
            className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-[#e9e2e9] bg-white p-6 text-[#352e39] shadow-xl backdrop:bg-black/40">
            <h2 id="add-employee-title" className="text-xl font-semibold">Add employee</h2>
            <p className="mt-2 text-sm text-[#837a85]">Department is determined by the selected position. Fields marked * are required.</p>
            <form onSubmit={handleSubmit} className="mt-5">
                {error && <p role="alert" className="mb-4 text-sm text-red-700">{error}</p>}
                {positionError && <p role="alert" className="mb-4 text-sm text-red-700">{positionError}</p>}
                {loading && <p role="status" className="mb-4 text-sm">Loading positions...</p>}
                {!loading && !positionError && positions.length === 0 && <p role="status" className="mb-4 text-sm">Create a position before adding employees.</p>}
                <fieldset disabled={saving} className="grid gap-4 sm:grid-cols-2">
                    {fields.map(({ name, label, optional, options, defaultValue, ...attributes }) => {
                        const choices = name === "position_id" ? positions.map((position) => [position.id, position.name]) : options;
                        const inputProps = {
                            id: `employee-${name}`, name, required: !optional,
                            "aria-invalid": Boolean(errors[name]),
                            "aria-describedby": errors[name] ? `error-${name}` : undefined,
                            className: "mt-1 w-full rounded-lg border border-[#d9cedc] bg-white px-3 py-2 text-sm outline-none focus:border-[#79558a] disabled:opacity-60",
                        };
                        return (
                            <div key={name}>
                                <label htmlFor={inputProps.id} className="text-sm font-medium">{label}{optional ? " (optional)" : " *"}</label>
                                {choices ? (
                                    <select {...inputProps} defaultValue={defaultValue ?? ""} disabled={name === "position_id" && (loading || Boolean(positionError))}>
                                        <option value="" disabled>Select {label.toLowerCase()}</option>
                                        {choices.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
                                    </select>
                                ) : <input {...inputProps} {...attributes} />}
                                {errors[name] && <p id={`error-${name}`} className="mt-1 text-xs text-red-700">{[].concat(errors[name]).join(" ")}</p>}
                            </div>
                        );
                    })}
                </fieldset>
                <div className="mt-6 flex justify-end gap-3">
                    <button type="button" disabled={saving} onClick={onClose} className="rounded-lg border border-[#d9cedc] px-4 py-2 text-sm disabled:opacity-60">Cancel</button>
                    <button type="submit" disabled={saving || loading || Boolean(positionError) || positions.length === 0} className="rounded-lg bg-[#5b3c78] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Saving..." : "Save employee"}</button>
                </div>
            </form>
        </dialog>
    );
}
