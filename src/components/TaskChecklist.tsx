import type { Business } from "../data/types";
import { useAppStore } from "../store/useAppStore";
import { CheckIcon } from "./icons";

export function TaskChecklist({ business }: { business: Business }) {
  const isTaskCompleted = useAppStore((s) => s.isTaskCompleted);
  const completeTask = useAppStore((s) => s.completeTask);
  const isCollected = useAppStore((s) => s.isCollected(business.id));

  return (
    <ul className="task-checklist">
      {business.tasks.map((task, index) => {
        const completed = isTaskCompleted(business.id, task.id);
        const label = task.type === "simulated_qr" ? `${task.label} — Simulate QR Scan` : task.label;
        return (
          <li key={task.id} className="task-checklist__item">
            <button
              type="button"
              className="task-checklist__row"
              disabled={isCollected || completed}
              onClick={() => completeTask(business.id, task.id)}
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
  );
}
