import { useState } from "react";
import type { Business } from "../data/types";
import { useAppStore } from "../store/useAppStore";
import { CheckIcon } from "./icons";
import { VisitConfirmModal } from "./VisitConfirmModal";

export function TaskChecklist({ business }: { business: Business }) {
  const isTaskCompleted = useAppStore((s) => s.isTaskCompleted);
  const completeTask = useAppStore((s) => s.completeTask);
  const isCollected = useAppStore((s) => s.isCollected(business.id));

  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);

  function handleRowClick(taskId: string, isQr: boolean) {
    if (isQr) {
      setPendingTaskId(taskId);
      return;
    }
    completeTask(business.id, taskId);
  }

  function handleConfirmVisit() {
    if (pendingTaskId) {
      completeTask(business.id, pendingTaskId);
    }
    setPendingTaskId(null);
  }

  return (
    <>
      <ul className="task-checklist">
        {business.tasks.map((task, index) => {
          const completed = isTaskCompleted(business.id, task.id);
          const isQr = task.type === "simulated_qr";
          const label = isQr ? `${task.label} — Simulate QR Scan` : task.label;
          return (
            <li key={task.id} className="task-checklist__item">
              <button
                type="button"
                className="task-checklist__row"
                disabled={isCollected || completed}
                onClick={() => handleRowClick(task.id, isQr)}
              >
                <span className={`task-checklist__step${completed ? " task-checklist__step--done" : ""}`}>
                  {completed ? <CheckIcon /> : index + 1}
                </span>
                <span className="task-checklist__label">{label}</span>
                <span className="task-checklist__points">+{task.points} pts</span>
              </button>
            </li>
          );
        })}
      </ul>

      {pendingTaskId && (
        <VisitConfirmModal
          businessName={business.name}
          onCancel={() => setPendingTaskId(null)}
          onConfirm={handleConfirmVisit}
        />
      )}
    </>
  );
}
