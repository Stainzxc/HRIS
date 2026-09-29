import { useState } from "react";

function SettingToggle({ label, description, checked, onChange }) {
    return (
        <label className="flex cursor-pointer items-center justify-between gap-4 py-4">
            <span>
                <span className="block text-sm font-semibold">{label}</span>
                <span className="mt-1 block text-xs leading-5 text-[#837a85]">
                    {description}
                </span>
            </span>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="size-4 accent-[#5b3c78]"
            />
        </label>
    );
}

export default function AccountSettings() {
    const [saved, setSaved] = useState(false);
    const [settings, setSettings] = useState({
        emailNotifications: true,
        taskReminders: true,
        compactMode: false,
    });
    const update = (name) =>
        setSettings((current) => ({ ...current, [name]: !current[name] }));
    const submit = (event) => {
        event.preventDefault();
        setSaved(true);
    };
    return (
        <>
            <div className="mb-8">
                <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-[#9b82a4] uppercase">
                    Preferences
                </p>
                <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                    Account settings
                </h1>
                <p className="mt-2 text-sm text-[#837a85]">
                    Control how your HRIS workspace works for you.
                </p>
            </div>
            {saved && (
                <p
                    role="status"
                    className="mb-5 rounded-lg bg-[#e6f1ea] p-3 text-sm text-[#56806a]"
                >
                    Your settings have been saved.
                </p>
            )}
            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <section className="rounded-2xl border border-[#e9e2e9] bg-white p-5 sm:p-6">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <div className="divide-y divide-[#eee8ee]">
                        <SettingToggle
                            label="Email notifications"
                            description="Receive important workspace updates by email."
                            checked={settings.emailNotifications}
                            onChange={() => update("emailNotifications")}
                        />
                        <SettingToggle
                            label="Task reminders"
                            description="Get reminders for tasks approaching their due date."
                            checked={settings.taskReminders}
                            onChange={() => update("taskReminders")}
                        />
                    </div>
                </section>
                <section className="rounded-2xl border border-[#e9e2e9] bg-white p-5 sm:p-6">
                    <h2 className="text-lg font-semibold">Display</h2>
                    <div className="divide-y divide-[#eee8ee]">
                        <SettingToggle
                            label="Compact mode"
                            description="Use denser spacing in tables and workspace lists."
                            checked={settings.compactMode}
                            onChange={() => update("compactMode")}
                        />
                    </div>
                </section>
                <section className="rounded-2xl border border-[#e9e2e9] bg-white p-5 sm:p-6">
                    <h2 className="text-lg font-semibold">
                        Regional preferences
                    </h2>
                    <label
                        htmlFor="settings-timezone"
                        className="mt-5 block text-sm font-medium"
                    >
                        Timezone
                    </label>
                    <select
                        id="settings-timezone"
                        className="mt-1 w-full max-w-sm rounded-lg border border-[#d9cedc] px-3 py-2 text-sm"
                    >
                        <option>Asia/Manila</option>
                        <option>Asia/Singapore</option>
                        <option>Asia/Tokyo</option>
                        <option>UTC</option>
                    </select>
                </section>
                <div className="flex justify-end">
                    <button className="rounded-lg bg-[#5b3c78] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4f326c]">
                        Save settings
                    </button>
                </div>
            </form>
        </>
    );
}
