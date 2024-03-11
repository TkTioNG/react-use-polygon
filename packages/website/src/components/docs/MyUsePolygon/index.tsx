import {
  usePolygon,
  BasicSVGRenderer,
} from "../../../../../react-use-polygon/src";

import { useState } from "react";

export default function MyUsePolygon() {
  const [count, setCount] = useState(0);
  const polygon = usePolygon();

  return (
    <div>
      <h1>MyCount: {count}</h1>
      <BasicSVGRenderer primitive={polygon} />
      <button onClick={() => setCount((c) => c + 1)}>Add Count</button>
    </div>
  );
}
