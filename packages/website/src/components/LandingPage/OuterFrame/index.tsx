import Link from "@docusaurus/Link";
import LogoSVG from "@site/static/img/logo.svg";
import FaBookmark from "@site/static/img/fa-bookmark.svg";
import FaGithub from "@site/static/img/fa-github.svg";
import FaShapes from "@site/static/img/fa-shapes.svg";
import { motion } from "framer-motion";

import styles from "./styles.module.css";

export default function OuterFrame() {
  return (
    <div className={styles.outerFrame}>
      <h1 className={styles.logoName}>
        <LogoSVG />
        react-use-polygon
      </h1>
      <div className={styles.description}>Polygon hooks for react</div>
      <h1 className={styles.codeStyle}>{"usePolygon({ sides: n })"}</h1>
      <div className={styles.links}>
        <ul>
          <motion.li whileHover={{ translateX: 16 }}>
            <Link to="/docs/getting-started">
              <FaBookmark />
              Documentation
            </Link>
          </motion.li>
          <motion.li whileHover={{ translateX: 16 }}>
            <Link to="/docs/demos">
              <FaShapes />
              Demos
            </Link>
          </motion.li>
          <motion.li whileHover={{ translateX: 16 }}>
            <Link
              to="https://github.com/TkTioNG/react-use-polygon/"
              target="_blank"
            >
              <FaGithub />
              Github
            </Link>
          </motion.li>
        </ul>
      </div>
    </div>
  );
}
