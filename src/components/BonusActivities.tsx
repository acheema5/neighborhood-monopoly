import type { Business } from "../data/types";
import { useAppStore } from "../store/useAppStore";
import { CheckIcon } from "./icons";

/** Optional bonus activities for a business — never block collecting the property. */
export function BonusActivities({ business }: { business: Business }) {
  const isBonusTaskCompleted = useAppStore((s) => s.isBonusTaskCompleted);
  const completeBonusTask = useAppStore((s) => s.completeBonusTask);

  if (business.bonusTasks.length === 0) return null;

  return (
    <ul className="bonus-list">
      {business.bonusTasks.map((task) => {
        const completed = isBonusTaskCompleted(business.id, task.id);
        return (
          <li key={task.id} className="bonus-list__item">
            <button
              type="button"
              className="bonus-list__row"
              disabled={completed}
              onClick={() => completeBonusTask(business.id, task.id)}
            >
              <span className={`bonus-list__check${completed ? " bonus-list__check--done" : ""}`}>
                {completed && <CheckIcon />}
              </span>
              <span className="bonus-list__label">{task.label}</span>
              <span className="bonus-list__points">+{task.points} pts</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
