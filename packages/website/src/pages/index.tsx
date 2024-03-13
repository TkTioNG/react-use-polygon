import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

const LINKS = [{ label: "DOCUMENTATION", url: "/docs/getting-started" }];

function OuterFrame() {
  return (
    <div className={styles.outerFrame}>
      <div className={styles.logoName}>Hello</div>
      <div className={styles.description}>Geometry hooks for react</div>
      <div className={styles.links}>
        <ul>
          {LINKS.map((link) => (
            <li key={link.label}>
              <Link to={link.url}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </>
  );
}
