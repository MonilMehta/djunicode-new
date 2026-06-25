"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { useTheme } from "@/lib/theme-context";

// Mono face carries the terminal concept — used for the session itself.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

// Grotesk handles the one display moment so the mono face isn't
// doing double duty as both "terminal flavor" and "big headline type".
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});

const ROUTES: Record<string, string> = {
  home: "/",
  projects: "/projects",
  about: "/about",
  contact: "/contact",
};

const COMMAND_NAMES = ["help", "ls", "cd", "pwd", "whoami", "history", "clear", "sudo"];

type Line = {
  id: number;
  kind: "cmd" | "out" | "err" | "ok";
  text: string;
};

let lineId = 0;
const nextId = () => lineId++;

function helpText(): string[] {
  return [
    "available commands:",
    "  help              show this list",
    "  ls                list where you can go",
    "  cd <place>         navigate to home, projects, about, contact",
    "  pwd               print the path that 404'd",
    "  whoami            ...",
    "  history           show commands from this session",
    "  clear             clear the screen",
  ];
}

export default function NotFoundClient() {
  const { isLight } = useTheme();
  const router = useRouter();

  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState<number | null>(null);
  const [booted, setBooted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
  }, []);

  // Boot sequence: two scripted lines, then hand control to the visitor.
  useEffect(() => {
    const boot: Line[] = [
      { id: nextId(), kind: "cmd", text: "cd /the-page-you-wanted" },
      { id: nextId(), kind: "err", text: "bash: cd: no such file or directory" },
    ];
    if (reduceMotion) {
      setLines(boot);
      setBooted(true);
      return;
    }
    const t = setTimeout(() => {
      setLines(boot);
      setBooted(true);
    }, 300);
    return () => clearTimeout(t);
  }, [reduceMotion]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const push = (kind: Line["kind"], text: string) =>
    setLines((prev) => [...prev, { id: nextId(), kind, text }]);

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    push("cmd", trimmed);
    if (trimmed.length === 0) return;

    setCmdHistory((h) => [...h, trimmed]);
    setHistIndex(null);

    const [cmd, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(" ").toLowerCase();

    switch (cmd.toLowerCase()) {
      case "help":
        helpText().forEach((l) => push("out", l));
        return;

      case "ls":
        push("out", "home/      projects/      about/      contact/");
        return;

      case "pwd":
        push("out", "/the-page-you-wanted  (does not exist)");
        return;

      case "whoami":
        push("out", "a visitor who took a wrong turn — happens to the best of us");
        return;

      case "history":
        if (cmdHistory.length === 0) {
          push("out", "no commands yet");
        } else {
          cmdHistory.forEach((c, i) => push("out", `  ${i + 1}  ${c}`));
        }
        return;

      case "clear":
        setLines([]);
        return;

      case "sudo":
        push("err", "permission denied: you have no power here");
        return;

      case "cd": {
        const dest = arg.replace(/\/$/, "");
        if (!dest) {
          push("err", "cd: missing operand");
          return;
        }
        const path = ROUTES[dest];
        if (path) {
          push("ok", `→ heading to ${dest}/ ...`);
          setTimeout(() => router.push(path), 450);
        } else {
          push("err", `bash: cd: ${dest}: no such file or directory`);
        }
        return;
      }

      default:
        push("err", `bash: ${cmd}: command not found  (try 'help')`);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      if (!partial) return;
      const pool = input.includes(" ") ? Object.keys(ROUTES) : COMMAND_NAMES;
      const lastToken = input.split(" ").pop() ?? "";
      const match = pool.find((c) => c.startsWith(lastToken.toLowerCase()));
      if (match) {
        const tokens = input.split(" ");
        tokens[tokens.length - 1] = match;
        setInput(tokens.join(" "));
      }
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const next = histIndex === null ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setInput(cmdHistory[next]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex === null) return;
      const next = histIndex + 1;
      if (next >= cmdHistory.length) {
        setHistIndex(null);
        setInput("");
      } else {
        setHistIndex(next);
        setInput(cmdHistory[next]);
      }
      return;
    }
  };

  const ink = isLight ? "#161614" : "#e8e8e3";
  const dim = isLight ? "rgba(22,22,20,0.45)" : "rgba(232,232,227,0.4)";
  const faint = isLight ? "rgba(22,22,20,0.3)" : "rgba(232,232,227,0.28)";
  const border = isLight ? "rgba(22,22,20,0.1)" : "rgba(232,232,227,0.12)";
  const surface = isLight ? "rgba(22,22,20,0.025)" : "rgba(232,232,227,0.03)";
  const green = isLight ? "#0f8a52" : "#7fff9f";
  const coral = isLight ? "#c4452f" : "#ff6b5e";

  return (
    <main
      className={`${mono.variable} ${display.variable} min-h-[80vh] w-full flex flex-col items-center justify-center relative overflow-hidden pt-20 px-6`}
      style={{ backgroundColor: "transparent", color: ink }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Faint dot grid — circuit-board texture rather than a generic glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,#000_30%,transparent_100%)]"
        style={{
          backgroundImage: `radial-gradient(${isLight ? "rgba(22,22,20,0.12)" : "rgba(232,232,227,0.1)"} 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-[600px]">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: "var(--font-display)", color: dim }}
          className="text-[13px] font-medium tracking-[0.08em] uppercase mb-4 self-start ml-1"
        >
          Error 404
        </motion.p>

        {/* The terminal window — signature element, now a real shell */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full rounded-lg overflow-hidden"
          style={{ border: `1px solid ${border}`, background: surface }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Window chrome */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: `1px solid ${border}` }}
          >
            <span className="w-[10px] h-[10px] rounded-full" style={{ background: coral, opacity: 0.7 }} />
            <span className="w-[10px] h-[10px] rounded-full" style={{ background: isLight ? "#d4a017" : "#e6c34a", opacity: 0.7 }} />
            <span className="w-[10px] h-[10px] rounded-full" style={{ background: green, opacity: 0.7 }} />
            <span className="ml-2 text-[12px]" style={{ fontFamily: "var(--font-mono)", color: dim }}>
              djunicode — zsh
            </span>
          </div>

          {/* Scrollback */}
          <div
            ref={scrollRef}
            className="px-5 pt-5 text-[13px] leading-[1.85] sm:text-[14px] max-h-[260px] overflow-y-auto"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {lines.map((l) => {
              if (l.kind === "cmd") {
                return (
                  <div key={l.id} className="flex gap-2">
                    <span style={{ color: green }}>$</span>
                    <span style={{ color: ink }}>{l.text}</span>
                  </div>
                );
              }
              const color = l.kind === "err" ? coral : l.kind === "ok" ? green : dim;
              return (
                <div key={l.id} style={{ color, whiteSpace: "pre-wrap" }}>
                  {l.text}
                </div>
              );
            })}

            {/* Live input line */}
            {booted && (
              <div className="flex gap-2 items-center pb-1">
                <span style={{ color: green }}>$</span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    aria-label="Terminal command input"
                    className="w-full bg-transparent outline-none border-none caret-current"
                    style={{ color: ink, fontFamily: "var(--font-mono)", fontSize: "inherit" }}
                  />
                  {input.length === 0 && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 pointer-events-none"
                      style={{ color: faint }}
                    >
                      type &apos;help&apos; to get unstuck
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* UI-friendly fallback: direct nav, no typing required */}
          <div
            className="flex items-center gap-2 px-5 py-3 flex-wrap"
            style={{ borderTop: `1px solid ${border}` }}
          >
            <span className="text-[11px] mr-1" style={{ color: faint, fontFamily: "var(--font-mono)" }}>
              or just go to
            </span>
            <Link
              href="/"
              className="text-[12px] px-3 py-1.5 rounded-full transition-colors"
              style={{
                fontFamily: "var(--font-mono)",
                color: ink,
                border: `1px solid ${border}`,
                background: isLight ? "rgba(22,22,20,0.04)" : "rgba(232,232,227,0.05)",
              }}
            >
              home
            </Link>
            <Link
              href="/projects"
              className="text-[12px] px-3 py-1.5 rounded-full transition-colors"
              style={{
                fontFamily: "var(--font-mono)",
                color: ink,
                border: `1px solid ${border}`,
                background: isLight ? "rgba(22,22,20,0.04)" : "rgba(232,232,227,0.05)",
              }}
            >
              projects
            </Link>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-[12px] mt-5 text-center"
          style={{ color: dim, fontFamily: "var(--font-mono)" }}
        >
          dj unicode — the page you wanted doesn&apos;t exist, but this terminal does.
        </motion.p>
      </div>
    </main>
  );
}