import type { Business } from "../data/types";
import { useAppStore } from "../store/useAppStore";

export function TaskChecklist({ business }: { business: Business }) {
  const isTaskCompleted = useAppStore((s) => s.isTaskCompleted);
  const completeTask = useAppStore((s) => s.completeTask);
  const isCollected = useAppStore((s) => s.isCollected(business.id));

  return (
    <ul className="task-checklist">
      {business.tasks.map((task) => {
        const completed = isTaskCompleted(business.id, task.id);
        const label = task.type === "simulated_qr" ? `${task.label} — Simulate QR Scan` : task.label;
        return (
          <li key={task.id} className="task-checklist__item">
            <label className="task-checklist__label">
              <span className="task-checklist__checkbox-wrap">
                <input
                  type="checkbox"
                  checked={completed}
                  disabled={isCollected || completed}
                  onChange={() => completeTask(business.id, task.id)}
                />
                {label}
              </span>
              <span className="task-checklist__points">+{task.points} pts</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
