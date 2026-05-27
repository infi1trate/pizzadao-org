import { ReactNode } from "react";
import type { BountyStatus } from "./bountiesData";

/**
 * Status pill shared by the bounty list + detail.
 * Open = butter, In progress = ink, Completed = quiet outline.
 */
const StatusPill = ({ status }: { status: BountyStatus }) => {
  let cls = "";
  let label: ReactNode = "";
  if (status === "open") {
    cls = "bg-butter text-ink ring-ink/15";
    label = (
      <>
        <span
          aria-hidden
          className="relative inline-flex h-1.5 w-1.5"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tomato/60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-tomato" />
        </span>
        Open
      </>
    );
  } else if (status === "in-progress") {
    cls = "bg-ink text-cream ring-ink";
    label = "In progress";
  } else {
    cls = "bg-transparent text-ink/65 ring-ink/15";
    label = "Completed";
  }

  return (
    <span
      className={
        "ui inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 " +
        cls
      }
    >
      {label}
    </span>
  );
};

export default StatusPill;
