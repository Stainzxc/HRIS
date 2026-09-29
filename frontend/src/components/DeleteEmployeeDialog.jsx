import { useEffect, useRef, useState } from "react";

export default function DeleteEmployeeDialog({ employee, onClose, onConfirm }) {
    const dialogRef = useRef(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        dialogRef.current.showModal();
        return () => dialogRef.current?.close();
    }, []);

    const confirm = async () => {
        setDeleting(true);
        await onConfirm();
        setDeleting(false);
    };

    return (
        <dialog
            ref={dialogRef}
            onCancel={(event) => {
                event.preventDefault();
                if (!deleting) onClose();
            }}
            className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-[#e9e2e9] bg-white p-6 text-[#352e39] shadow-xl backdrop:bg-black/40"
        >
            <h2 className="text-lg font-semibold">Delete employee?</h2>
            <p className="mt-2 text-sm leading-6 text-[#837a85]">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-[#352e39]">
                    {employee.first_name} {employee.last_name}
                </span>
                ? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
                <button
                    type="button"
                    disabled={deleting}
                    onClick={onClose}
                    className="rounded-lg border border-[#d9cedc] px-4 py-2 text-sm"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    disabled={deleting}
                    onClick={confirm}
                    className="rounded-lg bg-[#a05f61] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                    {deleting ? "Deleting..." : "Delete employee"}
                </button>
            </div>
        </dialog>
    );
}
