"use client";

import Box from "@/components/Box";
import Button from "@/components/Button";
import { useUser } from "@/hooks/useUser";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";

const AccountContent = () => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const extractUsername = (email?: string) => {
    if (email) {
      const atIndex = email.indexOf("@");
      if (atIndex !== -1) return email.slice(0, atIndex);
    }
    return "stunner";
  };

  const username = extractUsername(user?.email);
  const initials = user?.email ? user.email.substring(0, 2).toUpperCase() : "ST";

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

  return (
    <Box className="relative flex min-h-screen flex-col items-center justify-center bg-[#111113] px-6 py-20 text-[#F2F0EA]">
      <style>{`
        @keyframes sonic-pulse {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sonic-bar { animation: none !important; }
        }
      `}</style>

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
          onClick={() => router.push("/account")}
          aria-label="Open account settings"
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
        Welcome back, {username}
      </h1>
      <p className="mt-2 max-w-[46ch] text-center text-[0.95rem] text-[#9A98A3]">
        Your library, your queue, your sound. All tuned to this account.
      </p>

      <Button
        onClick={() => router.push("/account")}
        className="mt-8 rounded-full px-6 py-2.5 text-sm font-medium text-[#111113] transition-opacity hover:opacity-90"
        style={{ background: "#F2F0EA" }}
      >
        Manage account
      </Button>

      <footer className="mt-20 flex flex-col items-center gap-2 text-[0.8rem] text-[#6E6C76]">
        <span>© {currentYear} Spotsonic</span>
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
