import { useEffect, useRef, useState } from "react";
import { getEmployeePositions, updateEmployee } from "../services/employeeService";

const fields = [
    ["first_name", "First name"], ["middle_name", "Middle name"], ["last_name", "Last name"],
    ["email", "Email"], ["phone_number", "Phone number"], ["address", "Address"],
    ["date_of_birth", "Date of birth"], ["date_hired", "Date hired"], ["salary", "Salary"],
];

export default function EditEmployeeModal({ employee, onClose, onUpdated }) {
    const dialogRef = useRef(null);
    const [positions, setPositions] = useState([]);
    const [form, setForm] = useState({ ...employee, middle_name: employee.middle_name ?? "", date_of_birth: employee.date_of_birth?.slice(0, 10) ?? "", date_hired: employee.date_hired?.slice(0, 10) ?? "" });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const closeModal = () => {
        if (!saving) onClose();
    };

    useEffect(() => {
        dialogRef.current.showModal();
        getEmployeePositions().then(({ data }) => setPositions(data.data ?? [])).catch(() => setError("Unable to load positions."));
        return () => dialogRef.current?.close();
    }, []);

    const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    async function submit(event) {
        event.preventDefault();
        setSaving(true); setError(""); setErrors({});
        try {
            await updateEmployee(employee.id, { ...form, position_id: Number(form.position_id), middle_name: form.middle_name || null, date_of_birth: form.date_of_birth || null });
            onUpdated();
        } catch (requestError) {
            setErrors(requestError.response?.data?.errors ?? {});
            setError(requestError.response?.status === 422 ? "Please check the highlighted fields." : "Unable to update the employee.");
            setSaving(false);
        }
    }
    return <dialog ref={dialogRef} onCancel={(event) => { event.preventDefault(); closeModal(); }} onClose={(event) => { if (saving) event.preventDefault(); }} className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-[#e9e2e9] bg-white p-6 text-[#352e39] shadow-xl backdrop:bg-black/40">
        <h2 className="text-xl font-semibold">Edit employee</h2>
        <p className="mt-2 text-sm text-[#837a85]">Update {form.first_name} {form.last_name}&apos;s information.</p>
        <form onSubmit={submit} className="mt-5">
            {error && <p role="alert" className="mb-4 text-sm text-red-700">{error}</p>}
            <fieldset disabled={saving} className="grid gap-4 sm:grid-cols-2">
                {fields.map(([name, label]) => <div key={name}><label htmlFor={`edit-${name}`} className="text-sm font-medium">{label}</label><input id={`edit-${name}`} name={name} type={name.includes("date") ? "date" : name === "salary" ? "number" : name === "email" ? "email" : "text"} value={form[name] ?? ""} onChange={change} required={!["middle_name", "date_of_birth"].includes(name)} maxLength={name === "phone_number" ? 11 : undefined} pattern={name === "phone_number" ? "09[0-9]{9}" : undefined} inputMode={name === "phone_number" ? "numeric" : undefined} title={name === "phone_number" ? "Enter 11 digits starting with 09" : undefined} step={name === "salary" ? "0.01" : undefined} className="mt-1 w-full rounded-lg border border-[#d9cedc] bg-white px-3 py-2 text-sm outline-none focus:border-[#79558a]" />{errors[name] && <p className="mt-1 text-xs text-red-700">{[].concat(errors[name]).join(" ")}</p>}</div>)}
                <div><label htmlFor="edit-gender" className="text-sm font-medium">Gender</label><select id="edit-gender" name="gender" value={form.gender} onChange={change} className="mt-1 w-full rounded-lg border border-[#d9cedc] px-3 py-2 text-sm"><option value="male">Male</option><option value="female">Female</option></select></div>
                <div><label htmlFor="edit-position_id" className="text-sm font-medium">Position</label><select id="edit-position_id" name="position_id" value={form.position_id} onChange={change} className="mt-1 w-full rounded-lg border border-[#d9cedc] px-3 py-2 text-sm">{positions.map((position) => <option key={position.id} value={position.id}>{position.name}</option>)}</select></div>
                <div><label htmlFor="edit-employment_status" className="text-sm font-medium">Employment status</label><select id="edit-employment_status" name="employment_status" value={form.employment_status} onChange={change} className="mt-1 w-full rounded-lg border border-[#d9cedc] px-3 py-2 text-sm"><option value="active">Active</option><option value="inactive">Inactive</option><option value="terminated">Terminated</option></select></div>
                <div><label htmlFor="edit-employee_type" className="text-sm font-medium">Employee type</label><select id="edit-employee_type" name="employee_type" value={form.employee_type} onChange={change} className="mt-1 w-full rounded-lg border border-[#d9cedc] px-3 py-2 text-sm"><option value="full_time">Full-time</option><option value="part_time">Part-time</option><option value="contract">Contract</option></select></div>
            </fieldset>
            <div className="mt-6 flex justify-end gap-3"><button type="button" disabled={saving} onClick={closeModal} className="rounded-lg border border-[#d9cedc] px-4 py-2 text-sm">Cancel</button><button type="submit" disabled={saving} className="rounded-lg bg-[#5b3c78] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Updating employee..." : "Save changes"}</button></div>
        </form>
    </dialog>;
}
