"use client";

import Box from "@/components/Box";
import Button from "@/components/Button";
import { useUser } from "@/hooks/useUser";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";

type EditableFields = {
  name: string;
  email: string;
};

const AccountContent = () => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const currentYear = new Date().getFullYear();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [draft, setDraft] = useState<EditableFields>({ name: "", email: "" });

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    // Keep the draft in sync with the underlying user record (first load,
    // or after a save completes elsewhere).
    setDraft({
      name: (user as any)?.name ?? "",
      email: user?.email ?? "",
    });
  }, [user]);

  const extractUsername = (email?: string) => {
    if (email) {
      const atIndex = email.indexOf("@");
      if (atIndex !== -1) return email.slice(0, atIndex);
    }
    return "stunner";
  };

  const username = extractUsername(user?.email);
  const initials = user?.email ? user.email.substring(0, 2).toUpperCase() : "ST";

  // NOTE: point this at whatever your auth layer actually exposes, e.g.
  // session.user.provider from NextAuth. Using "has a profile photo" as a
  // stand-in signal for Google until that field exists on `user`.
  const provider: "google" | "credentials" =
    (user as any)?.provider === "google" || (user as any)?.image ? "google" : "credentials";
  const isGoogleAccount = provider === "google";

  // Every account gets its own two-tone gradient, derived from the email —
  // the same idea Spotsonic uses for auto-generated playlist covers.
  const gradient = useMemo(() => {
    const seed = user?.email ?? "stunner";
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hueA = Math.abs(hash) % 360;
    const hueB = (hueA + 46) % 360;
    return `linear-gradient(135deg, hsl(${hueA} 82% 58%), hsl(${hueB} 88% 52%))`;
  }, [user?.email]);

  const barHeights = [14, 26, 18, 32, 20, 28, 16];

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      // TODO: point this at your real account-update endpoint.
      const res = await fetch("/api/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: draft.name,
          // Google-managed emails are never sent — the field stays read-only below.
          ...(isGoogleAccount ? {} : { email: draft.email }),
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      setSaved(true);
      setIsEditing(false);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setSaveError("Couldn't save your changes. Please give it another try later.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setDraft({ name: (user as any)?.name ?? "", email: user?.email ?? "" });
    setSaveError(null);
    setIsEditing(false);
  };

  return (
    <Box className="relative flex min-h-screen flex-col items-center bg-[#111113] px-6 py-20 text-[#F2F0EA]">
      <style>{`
        @keyframes sonic-pulse {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sonic-bar { animation: none !important; }
        }
      `}</style>

      <div className="flex flex-col items-center">
        <Tooltip
          arrow
          placement="top"
          title={
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
              @{username}
            </span>
          }
        >
          <button
            aria-label="Account avatar"
            className="flex h-36 w-36 items-center justify-center rounded-full text-3xl text-white transition-transform duration-300 ease-out hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2F0EA]"
            style={{ background: gradient, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
          >
            {initials}
          </button>
        </Tooltip>

        <div className="mt-6 flex items-end gap-[3px]" aria-hidden="true">
          {barHeights.map((h, i) => (
            <span
              key={i}
              className="sonic-bar w-[3px] rounded-full"
              style={{
                height: `${h}px`,
                background: gradient,
                transformOrigin: "bottom",
                animation: `sonic-pulse ${1.1 + (i % 3) * 0.25}s ease-in-out infinite`,
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>

        <h1
          className="mt-8 text-center text-[2rem] leading-tight tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
        >
          Wired in, {username}
        </h1>
        <p className="mt-2 max-w-[46ch] text-center text-[0.95rem] text-[#9A98A3]">
          Your library, your queue, your taste. All tuned to this account.
        </p>

        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          aria-expanded={isEditing}
          aria-controls="account-details-panel"
          className="mt-8 rounded-full px-6 py-2.5 text-sm font-medium text-[#111113] transition-opacity hover:opacity-90"
          style={{ background: "#F2F0EA" }}
        >
          {isEditing ? "Close details" : "Manage account"}
        </Button>
      </div>

      <div
        id="account-details-panel"
        className="mt-8 w-full max-w-md overflow-hidden rounded-2xl border border-[#2A2A2E] bg-[#18181B] transition-[max-height,opacity] duration-300 ease-out"
        style={{ maxHeight: isEditing ? "640px" : "0px", opacity: isEditing ? 1 : 0 }}
      >
        <div className="flex flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6E6C76]">Signed in with</span>
            <span className="flex items-center gap-2 rounded-full bg-[#111113] px-3 py-1.5 text-sm">
              {isGoogleAccount ? (
                <>
                  <FcGoogle size={16} />
                  Google
                </>
              ) : (
                <>
                  <HiOutlineMail size={16} className="text-[#9A98A3]" />
                  Email &amp; password
                </>
              )}
            </span>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-[#9A98A3]">Display name</span>
            <input
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              placeholder="Add a name (Leave blank to keep current one.)"
              className="rounded-lg border border-[#2A2A2E] bg-[#111113] px-3 py-2 text-[0.95rem] text-[#F2F0EA] outline-none transition-colors focus:border-[#F2F0EA]"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-[#9A98A3]">Email address</span>
            <input
              value={draft.email}
              disabled={isGoogleAccount}
              onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
              className="rounded-lg border border-[#2A2A2E] bg-[#111113] px-3 py-2 text-[0.95rem] text-[#F2F0EA] outline-none transition-colors focus:border-[#F2F0EA] disabled:cursor-not-allowed disabled:opacity-50"
            />
            {isGoogleAccount && (
              <span className="text-xs text-[#6E6C76]">Managed by your Google account.</span>
            )}
          </label>

          {!isGoogleAccount && (
            <button
              type="button"
              onClick={() => router.push("#/account/password")}
              className="self-start text-sm text-[#9A98A3] underline-offset-4 transition-colors hover:text-[#F2F0EA] hover:underline"
            >
              Change password
            </button>
          )}

          {saveError && <p className="text-sm text-[#FF6B5B]">{saveError}</p>}
          {saved && <p className="text-sm text-[#7CE0C1]">Saved.</p>}

          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-full px-5 py-2 text-sm font-medium text-[#111113] transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ background: "#F2F0EA" }}
            >
              {isSaving ? "Saving…" : "Save changes"}
            </Button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-full px-5 py-2 text-sm font-medium text-[#9A98A3] transition-colors hover:text-[#F2F0EA]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <footer className="mt-20 flex flex-col items-center gap-2 text-[0.8rem] text-[#6E6C76]">
        <span>© {currentYear} Spotsonic AY.</span>
        <span>
          Find us on{" "}
          <a
            href="#@realspotsonic"
            className="text-[#9A98A3] transition-colors duration-200 hover:text-[#F2F0EA] hover:underline"
          >
            Socials
          </a>{" "}
          or{" "}
          <a
            href="mailto:devycotorg@gmail.com"
            className="text-[#9A98A3] transition-colors duration-200 hover:text-[#F2F0EA] hover:underline"
          >
            send us a note
          </a>
          .
        </span>
      </footer>
    </Box>
  );
};

export default AccountContent;
