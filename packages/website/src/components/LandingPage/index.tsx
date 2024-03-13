import OuterFrame from "./OuterFrame";
import TransitionTunnel from "./TransitionTunnel";

import styles from "./styles.module.css";

export default function LandingPage() {
  return (
    <main className={styles.mainLanding}>
      <div className={styles.gridBackground}>
        <div className={styles.gridOverlay}></div>
      </div>
      <TransitionTunnel />
      <OuterFrame />
    </main>
  );
}
