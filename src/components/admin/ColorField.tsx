"use client";

import { useState } from "react";
import { labelCls } from "./ui";

export function ColorField({
  label,
  name,
  value,
}: {
  label: string;
  name: string;
  value: string;
}) {
  const [color, setColor] = useState(value);
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="flex items-center gap-2">
        <input
          name={name}
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-11 w-14 rounded-lg border border-slate-700 bg-slate-800 cursor-pointer"
        />
        <input
          readOnly
          value={color}
          className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-300 text-sm font-mono"
        />
      </div>
    </div>
  );
}
