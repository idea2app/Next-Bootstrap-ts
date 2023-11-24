# Next-Bootstrap.ts

[React][1] project scaffold based on [TypeScript][2], [Next.js][3], [Bootstrap][4] & [Workbox][5]. And this project bootstrapped with [`create-next-app`][6].

[![CI & CD](https://github.com/idea2app/Next-Bootstrap-ts/actions/workflows/main.yml/badge.svg)][7]

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)][8]
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][9]

## Technology stack

- Language: [TypeScript v5][2] + [MDX v3][11]
- Component engine: [Nextjs v14][3]
- Component suite: [Bootstrap v5][4]
- PWA framework: [Workbox v6][5]
- State management: [MobX v6][10]
- CI / CD: GitHub [Actions][12] + [Vercel][13]

## Major examples

1. [Markdown articles](pages/article/)
2. [Editor components](pages/component.tsx)
3. [Pagination table](pages/pagination.tsx)
4. [Scroll list](pages/scroll-list.tsx)

## Getting Started

First, run the development server:

```bash
npm i pnpm -g
pnpm dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes][14] can be accessed on http://localhost:3000/api/hello. This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes][14] instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation][15] - learn about Next.js features and API.
- [Learn Next.js][16] - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository][17] - your feedback and contributions are welcome!

## Deployment

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform][13] from the creators of Next.js.

Check out our [Next.js deployment documentation][18] for more details.

### Docker

```shell
pnpm pack-image
pnpm container
```

[1]: https://react.dev/
[2]: https://www.typescriptlang.org/
[3]: https://nextjs.org/
[4]: https://getbootstrap.com/
[5]: https://developers.google.com/web/tools/workbox
[6]: https://github.com/vercel/next.js/tree/canary/packages/create-next-app
[7]: https://github.com/idea2app/Next-Bootstrap-ts/actions/workflows/main.yml
[8]: https://codespaces.new/idea2app/Next-Bootstrap-ts
[9]: https://gitpod.io/?autostart=true#https://github.com/idea2app/Next-Bootstrap-ts
[10]: https://github.com/mobxjs/mobx/tree/mobx4and5/docs
[11]: https://mdxjs.com/
[12]: https://github.com/features/actions
[13]: https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme
[14]: https://nextjs.org/docs/api-routes/introduction
[15]: https://nextjs.org/docs
[16]: https://nextjs.org/learn
[17]: https://github.com/vercel/next.js/
[18]: https://nextjs.org/docs/deployment
