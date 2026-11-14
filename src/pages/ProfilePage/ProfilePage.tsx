import { Camera, Mail, User } from "lucide-react";

type ProfileUser = {
  name: string;
  email: string;
  avatarUrl?: string | null;
};

// Swap this for your real user from AuthProvider later
const placeholderUser: ProfileUser = {
  name: "Your Name",
  email: "you@example.com",
  avatarUrl: null,
};

export default function ProfilePage({ user = placeholderUser }: { user?: ProfileUser }) {
  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
      <div
      className="min-h-screen bg-[#0A0A0A] px-8 py-10"
      style={{  
        backgroundImage:
          "radial-gradient(circle, #1C1B1B 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="mx-auto max-w-xl px-4 py-10">
        <h1 className="mb-6 text-2xl font-semibold text-neutral-200">Profile</h1>

        <div className="overflow-hidden rounded-xl bg-[#1C1B1B] shadow-sm ring-1 ring-slate-200">
          {/* Banner, same blue feel as a board header */}
          <div className="h-24 bg-gradient-to-r from-blue-600 to-sky-500" />

          <div className="px-6 pb-6">
            {/* Avatar placeholder */}
            <div className="-mt-12 mb-6 flex items-end gap-4">
              <button
                type="button"
                className="group relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-neutral-200 text-2xl font-semibold text-neutral-600 ring-4 ring-white"
                aria-label="Change profile picture"
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  initials
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                  <Camera className="h-6 w-6 text-white" />
                </span>
              </button>
              <p className="pb-2 text-sm text-neutral-500">Upload coming soon</p>
            </div>

            {/* Info rows */}
            <div className="space-y-4">
              <div>
                <label className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
                  <User className="h-4 w-4" /> Name
                </label>
                <div className="rounded-md border border-neutral-700 bg-[#0A0A0A] text-neutral-100.0 px-3 py-2 text-slate-800">
                  {user.name}
                </div>
              </div>

              <div>
                <label className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
                  <Mail className="h-4 w-4" /> Email
                </label>
                <div className="rounded-md border border-neutral-700 bg-[#0A0A0A] text-neutral-100. px-3 py-2 text-slate-800">
                  {user.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}