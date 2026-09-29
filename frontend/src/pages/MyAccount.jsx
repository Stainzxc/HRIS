import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";

export default function MyAccount() {
    const [saved, setSaved] = useState(false);
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        role: "Administrator",
        phone: "",
        timezone: "Asia/Manila",
    });
    useEffect(() => {
        const cachedUser = JSON.parse(
            localStorage.getItem("hris-user") || "null",
        );
        if (cachedUser)
            setProfile((current) => ({
                ...current,
                name: cachedUser.name ?? "",
                email: cachedUser.email ?? "",
            }));
        getCurrentUser()
            .then(({ data }) => {
                const user = data.user;
                localStorage.setItem("hris-user", JSON.stringify(user));
                setProfile((current) => ({
                    ...current,
                    name: user.name ?? "",
                    email: user.email ?? "",
                }));
            })
            .catch(() => {});
    }, []);
    const change = (event) =>
        setProfile({ ...profile, [event.target.name]: event.target.value });
    const submit = (event) => {
        event.preventDefault();
        setSaved(true);
    };
    return (
        <>
            <div className="mb-8">
                <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-[#9b82a4] uppercase">
                    Workspace account
                </p>
                <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                    My account
                </h1>
                <p className="mt-2 text-sm text-[#837a85]">
                    Manage your profile and account preferences.
                </p>
            </div>
            {saved && (
                <p
                    role="status"
                    className="mb-5 rounded-lg bg-[#e6f1ea] p-3 text-sm text-[#56806a]"
                >
                    Your profile changes have been saved.
                </p>
            )}
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <form
                    onSubmit={submit}
                    className="rounded-2xl border border-[#e9e2e9] bg-white p-5 sm:p-6"
                >
                    <div className="flex items-center gap-4 border-b border-[#eee8ee] pb-5">
                        <span className="grid size-16 place-items-center rounded-full bg-[#eadcf0] text-lg font-semibold text-[#79558a]">
                            AJ
                        </span>
                        <div>
                            <h2 className="text-lg font-semibold">
                                Personal information
                            </h2>
                            <p className="mt-1 text-sm text-[#837a85]">
                                Update the details associated with your account.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="account-name"
                                className="text-sm font-medium"
                            >
                                Full name
                            </label>
                            <input
                                id="account-name"
                                name="name"
                                value={profile.name}
                                onChange={change}
                                className="mt-1 w-full rounded-lg border border-[#d9cedc] px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="account-role"
                                className="text-sm font-medium"
                            >
                                Role
                            </label>
                            <input
                                id="account-role"
                                name="role"
                                value={profile.role}
                                className="mt-1 w-full rounded-lg border border-[#d9cedc] bg-[#f8f7f4] px-3 py-2 text-sm"
                                readOnly
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="account-email"
                                className="text-sm font-medium"
                            >
                                Email address
                            </label>
                            <input
                                id="account-email"
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={change}
                                className="mt-1 w-full rounded-lg border border-[#d9cedc] px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="account-phone"
                                className="text-sm font-medium"
                            >
                                Phone number
                            </label>
                            <input
                                id="account-phone"
                                name="phone"
                                value={profile.phone}
                                onChange={change}
                                placeholder="Not provided"
                                className="mt-1 w-full rounded-lg border border-[#d9cedc] px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="account-timezone"
                                className="text-sm font-medium"
                            >
                                Timezone
                            </label>
                            <select
                                id="account-timezone"
                                name="timezone"
                                value={profile.timezone}
                                onChange={change}
                                className="mt-1 w-full rounded-lg border border-[#d9cedc] px-3 py-2 text-sm"
                            >
                                <option>Asia/Manila</option>
                                <option>Asia/Singapore</option>
                                <option>Asia/Tokyo</option>
                                <option>UTC</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button className="rounded-lg bg-[#5b3c78] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4f326c]">
                            Save changes
                        </button>
                    </div>
                </form>
                <div className="space-y-6">
                    <section className="rounded-2xl border border-[#e9e2e9] bg-white p-5 sm:p-6">
                        <h2 className="text-lg font-semibold">Security</h2>
                        <p className="mt-2 text-sm leading-6 text-[#837a85]">
                            Keep your account secure by using a strong password
                            and reviewing your access.
                        </p>
                        <button
                            type="button"
                            className="mt-5 rounded-lg border border-[#d9cedc] px-4 py-2 text-sm font-semibold text-[#5b3c78]"
                        >
                            Change password
                        </button>
                    </section>
                    <section className="rounded-2xl border border-[#e9e2e9] bg-white p-5 sm:p-6">
                        <h2 className="text-lg font-semibold">
                            Account status
                        </h2>
                        <div className="mt-4 flex items-center justify-between text-sm">
                            <span className="text-[#837a85]">Status</span>
                            <span className="rounded-full bg-[#e6f1ea] px-2.5 py-1 text-xs font-semibold text-[#56806a]">
                                Active
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="text-[#837a85]">Access</span>
                            <span className="font-medium">Administrator</span>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
