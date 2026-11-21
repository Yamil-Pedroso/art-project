import { useEffect, useState } from "react";
import CreativeWorkspace, { type WorkspaceDesign } from "./CreativeWorkspace";
import styles from "./DesignPresentation.module.css";

const STORAGE_KEY = "yami-atelier:digital-design-layout";

const getSavedDesign = (): WorkspaceDesign => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "design-2"
      ? "design-2"
      : "design-1";
  } catch {
    return "design-1";
  }
};

const DesignPresentation = () => {
  const [design, setDesign] = useState<WorkspaceDesign>(getSavedDesign);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, design);
    } catch {
      // Layout selection still works for this visit if storage is unavailable.
    }
  }, [design]);

  return (
    <div className={styles.presentation}>
      <div
        className={styles.switcher}
        role="group"
        aria-label="Choose presentation design"
      >
        {(["design-1", "design-2"] as const).map((option, index) => (
          <button
            key={option}
            type="button"
            onClick={() => setDesign(option)}
            aria-pressed={design === option}
            className={design === option ? styles.active : ""}
          >
            <span
              className={index === 0 ? styles.organicIcon : styles.editorIcon}
              aria-hidden="true"
            />
            Design {index + 1}
          </button>
        ))}
      </div>
      <CreativeWorkspace design={design} />
    </div>
  );
};

export default DesignPresentation;
