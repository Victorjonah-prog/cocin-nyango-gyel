"use client";

import { useState } from "react";

interface Props {
  /** Label shown on the delete trigger button. */
  triggerLabel?: string;
  /** The item name shown in the "Are you sure?" message. */
  itemName: string;
  /** Called when the user confirms deletion. */
  onConfirm: () => void | Promise<void>;
  /** Disable while a parent action is in flight. */
  disabled?: boolean;
}

/**
 * ConfirmDelete — renders a small "Delete" button.
 * On click, shows an inline confirmation dialog asking "Are you sure?".
 * The secretary must click "Yes, delete" to proceed.
 */
export default function ConfirmDelete({
  triggerLabel = "Delete",
  itemName,
  onConfirm,
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleConfirm() {
    setBusy(true);
    try {
      await onConfirm();
    } finally {
      setBusy(false);
      setOpen(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 border border-red-300 text-red-700 font-medium text-sm min-h-[40px] hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1 disabled:opacity-50"
      >
        {triggerLabel}
      </button>
    );
  }

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label="Confirm deletion"
      className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 max-w-xs"
    >
      <p className="text-sm font-semibold text-red-800">
        Are you sure you want to delete{" "}
        <span className="font-bold">&ldquo;{itemName}&rdquo;</span>? This
        cannot be undone.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={handleConfirm}
          className="flex-1 rounded-lg bg-red-600 text-white font-semibold text-sm py-2 min-h-[40px] hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {busy ? "Deleting…" : "Yes, delete"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex-1 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm py-2 min-h-[40px] hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
