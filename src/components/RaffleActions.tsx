"use client";

import { useState, useTransition } from "react";
import { toggleRaffleLike } from "@/app/_actions/public";

interface RaffleActionsProps {
  raffleId: string;
  code: string;
  title: string;
  details: string;
  initialLikeCount: number;
  initialLiked: boolean;
}

export default function RaffleActions({
  raffleId,
  code,
  title,
  details,
  initialLikeCount,
  initialLiked,
}: RaffleActionsProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [liked, setLiked] = useState(initialLiked);
  const [pending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  const onLike = () => {
    if (pending) return;
    const prevLiked = liked;
    const prevCount = likeCount;
    setLiked(!prevLiked);
    setLikeCount(prevCount + (prevLiked ? -1 : 1));
    startTransition(async () => {
      const res = await toggleRaffleLike(raffleId);
      if (res.ok) {
        setLiked(res.likedByMe);
        setLikeCount(res.likeCount);
      } else {
        setLiked(prevLiked);
        setLikeCount(prevCount);
      }
    });
  };

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onShare = async () => {
    const url = `${window.location.origin}/rifa/${encodeURIComponent(code)}`;
    const text = details.trim() ? `${title}\n\n${details.trim()}` : title;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    await copyText(`${text}\n\n${url}`);
  };

  return (
    <div className="w-full flex items-center justify-between gap-2 px-1 py-1 shrink-0">
      <div className="inline-flex min-w-0 items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[11px] sm:text-xs shadow-sm">
        <span className="w-2 h-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
        <span className="truncate">EVENTO #{code}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onLike}
          aria-pressed={liked}
          aria-label={liked ? "Quitar me gusta" : "Me gusta"}
          className={
            "flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border text-[11px] sm:text-xs font-bold transition-all active:scale-95 " +
            (liked ? "border-rose-500/50" : "border-white/10 hover:border-rose-500/40")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={"transition-colors " + (liked ? "text-rose-500" : "text-rose-400")}
            aria-hidden="true"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <span className="text-slate-300 tabular-nums">{likeCount}</span>
        </button>
        <button
          type="button"
          onClick={onShare}
          aria-label="Compartir rifa"
          title={copied ? "Enlace copiado" : "Compartir"}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-sky-500/40 text-[11px] sm:text-xs font-bold text-slate-300 transition-all active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-sky-400" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
          </svg>
          {copied && <span className="text-sky-300">Copiado</span>}
        </button>
      </div>
    </div>
  );
}
