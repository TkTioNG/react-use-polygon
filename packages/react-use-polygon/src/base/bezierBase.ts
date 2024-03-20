import { Vertex } from "../types";

interface VertexWithTime extends Vertex {
  t: number;
}

export class CubicBezier {
  p0: Vertex;
  p1: Vertex;
  p2: Vertex;
  p3: Vertex;

  constructor(p0: Vertex, p1: Vertex, p2: Vertex, p3: Vertex) {
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }

  computePointAtT(t: number): VertexWithTime {
    const { p0, p1, p2, p3 } = this;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const t2 = t * t;
    const a = mt2 * mt;
    const b = mt2 * t * 3;
    const c = mt * t2 * 3;
    const d = t * t2;

    return {
      x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
      y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
      z: a * (p0.z ?? 0) + b * (p1.z ?? 0) + c * (p2.z ?? 0) + d * (p3.z ?? 0),
      t,
    };
  }

  computeLUT(steps: number = 100) {
    // n steps means n+1 points
    steps++;
    const lut: VertexWithTime[] = [];
    for (let i = 0, p, t; i < steps; i++) {
      t = i / (steps - 1);
      p = this.computePointAtT(t);
      lut.push(p);
    }
    return lut;
  }

  project(point: Vertex) {
    // step 1: coarse check
    const lut = this.computeLUT();
    const l = lut.length - 1;
    const closest = this.closest(lut, point);
    const mpos = closest.mpos;
    const t1 = (mpos - 1) / l;
    const t2 = (mpos + 1) / l;
    const step = 0.1 / l;

    // step 2: fine check
    let mdist = closest.mdist,
      t = t1,
      ft = t,
      p;
    mdist += 1;
    for (let d; t < t2 + step; t += step) {
      p = this.computePointAtT(t);
      d = this.distance(point, p);
      if (d < mdist) {
        mdist = d;
        ft = t;
      }
    }
    ft = ft < 0 ? 0 : ft > 1 ? 1 : ft;
    p = this.computePointAtT(ft);

    return p;
  }

  distance(p1: Vertex, p2: Vertex) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  closest(lut: Vertex[], point: Vertex) {
    let mdist = Math.pow(2, 63);
    let mpos = 0;
    let d = 0;

    lut.forEach((p, idx) => {
      d = this.distance(point, p);
      if (d < mdist) {
        mdist = d;
        mpos = idx;
      }
    });
    return { mdist: mdist, mpos: mpos };
  }

  /**
   * @todo Update this
   * @param t0
   * @param t1
   * @returns
   */
  split(t0: number, t1: number) {
    console.log(t0, t1);
    return {
      points: [this.p0, this.p1, this.p2, this.p3],
    };
  }
}
