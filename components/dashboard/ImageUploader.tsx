"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { IMAGE_MAX_BYTES, ALLOWED_IMAGE_TYPES } from "@/lib/schemas";

interface Props {
  /** Current image URL (may be null). */
  value: string | null;
  /** Called whenever the URL changes (upload success or removal). */
  onChange: (url: string | null) => void;
}

/**
 * ImageUploader — lets the secretary pick, preview and upload an image
 * to the "church-images" Supabase Storage bucket.
 *
 * Rules:
 *   • Max 3 MB
 *   • jpg / png / webp only
 *   • Unique filename (timestamp + original name)
 *   • Preview shown immediately after selection
 *   • "Remove image" button clears the preview and URL
 */
export default function ImageUploader({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(value);

  async function handleFile(file: File) {
    setError(null);

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Only JPG, PNG and WebP images are allowed.");
      return;
    }
    if (file.size > IMAGE_MAX_BYTES) {
      setError("Image must be smaller than 3 MB.");
      return;
    }

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const filename = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;

      const { data, error: uploadError } = await supabase.storage
        .from("church-images")
        .upload(filename, file, { upsert: false });

      if (uploadError) {
        setError("Upload failed. Please try again.");
        setPreview(value); // revert to old preview
        return;
      }

      const { data: urlData } = supabase.storage
        .from("church-images")
        .getPublicUrl(data.path);

      onChange(urlData.publicUrl);
      setPreview(urlData.publicUrl);
    } finally {
      setUploading(false);
    }
  }

  function handleRemove() {
    setPreview(null);
    onChange(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Preview */}
      {preview && (
        <div className="relative w-full max-w-sm h-44 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <Image
            src={preview}
            alt="Image preview"
            fill
            className="object-cover"
            unoptimized={preview.startsWith("blob:")}
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          id="image-upload-input"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        <label
          htmlFor="image-upload-input"
          className="inline-flex items-center gap-2 cursor-pointer rounded-xl px-5 py-3 border border-[var(--color-navy)] text-[var(--color-navy)] font-semibold text-base min-h-[48px] hover:bg-[var(--color-navy)] hover:text-white transition-colors"
        >
          {uploading ? "Uploading…" : preview ? "Replace image" : "Choose image"}
        </label>

        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="rounded-xl px-5 py-3 border border-red-300 text-red-700 font-semibold text-base min-h-[48px] hover:bg-red-50 transition-colors"
          >
            Remove image
          </button>
        )}
      </div>

      <p className="text-sm text-[var(--color-muted)]">
        JPG, PNG or WebP · max 3 MB
      </p>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
