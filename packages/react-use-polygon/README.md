# react-use-polygon

![landing-page.png](./packages/website/static/img/landing-page.png)

## What is react-use-polygon?

Simple and easy ways of rendering polygon, shapes and geometry primitives in React using hooks 🚀

It will provide basic primitive data for user, and enable user to render them with **SVG** and **canvas**.

For more details, please view [our website](https://tktiong.github.io/react-use-polygon/).

## Features

- Full of 2D polygons, i.e. circle, triangle, rectangle and more
- Special spaces, i.e. kite and star
- Other geometry primitives, like: lines, curves, arcs
- Lightweight and tree-shakable
- Built with Typescript
- Proper [documentation](https://tktiong.github.io/react-use-polygon/docs)

## Install

Using npm:

```bash
npm install react-use-polygon
```

Or yarn:

```bash
yarn add react-use-polygon
```

Or pnpm:

```bash
pnpm add react-use-polygon
```

## Example Usage

```tsx
import { usePolygon } from "react-use-polygon";

// Pentagon
const { svgPath } = usePolygon({ sides: 5 });

// Render it later using SVG path
<svg>
  <path d={svgPath} />
</svg>
```

## TODOs 📒

- More primitives?
- More utilities for more complex UI usage
- More helpers for rendering

## Credits

- [VueXYZ](https://github.com/vuexyz/vuexyz) 

## License

[MIT](https://github.com/TkTioNG/react-use-polygon/blob/master/LICENSE)