"use client";

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function Chip({
  label,
  selected,
  onClick,
  disabled = false,
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex items-center px-5 py-2.5 rounded-[var(--radius-chip)]",
        "text-[15px] font-mono font-normal border transition-all duration-150",
        selected
          ? "bg-accent-bg border-text-primary text-text-primary shadow-sm"
          : "bg-transparent border-border text-text-secondary",
        !disabled && !selected
          ? "hover:border-border-hover hover:text-text-primary hover:scale-[1.02]"
          : "",
        !disabled && selected ? "hover:scale-[1.02]" : "",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer active:scale-[0.98]",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </button>
  );
}
