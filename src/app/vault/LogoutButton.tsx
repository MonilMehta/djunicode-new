"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { logout } from "./actions";

export function LogoutButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        bottom: "1.25rem",
        right: "1.25rem",
        zIndex: 2147483647, // max z-index
        pointerEvents: "all",
      }}
    >
      <form action={logout}>
        <button
          type="submit"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            background: "rgba(220, 38, 38, 0.9)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "0.5rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 24px rgba(220,38,38,0.35)",
            letterSpacing: "0.02em",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = "rgba(185, 28, 28, 0.95)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = "rgba(220, 38, 38, 0.9)")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </form>
    </div>,
    document.body
  );
}
