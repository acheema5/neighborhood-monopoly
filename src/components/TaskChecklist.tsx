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
        return (
          <li key={task.id} className="task-checklist__item">
            <label className="task-checklist__label">
              <input
                type="checkbox"
                checked={completed}
                disabled={isCollected || (task.type === "qr" && completed)}
                onChange={() => completeTask(business.id, task.id)}
              />
              {task.type === "qr" ? `${task.label} — Simulate QR Scan` : task.label}
            </label>
          </li>
        );
      })}
    </ul>
  );
}
