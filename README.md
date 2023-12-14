# Next-Bootstrap.ts

[React][1] project scaffold based on [TypeScript][2], [Next.js][3], [Bootstrap][4] & [Workbox][5]. And this project bootstrapped with [`create-next-app`][6].

[![CI & CD](https://github.com/idea2app/Next-Bootstrap-ts/actions/workflows/main.yml/badge.svg)][7]

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)][8] [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][9]

## Technology stack

- Language: [TypeScript v5][10] + [MDX v3][11]
- Component engine: [Nextjs v14][12]
- Component suite: [Bootstrap v5][13]
- PWA framework: [Workbox v6][14]
- State management: [MobX v6][15]
- CI / CD: GitHub [Actions][16] + [Vercel][17]

## Major examples

1. [Markdown articles](pages/article/)
2. [Editor components](pages/component.tsx)
3. [Pagination table](pages/pagination.tsx)
4. [Scroll list](pages/scroll-list.tsx)

## Best practice

1.  Install **[Settings][18] GitHub app** in your account or organization

2.  Click the **[<kbd>Use this template</kbd>][19] button** on the top of this GitHub repository's home page, then create your own repository in the app-installed namespace above

3.  Click the **[<kbd>Open in GitHub codespaces</kbd>][20] button** on the top of ReadMe file, then an **online VS Code development environment** will be started immediately

4.  Set [Vercel variables][21] as [Repository secrets][22], then every commit will get an independent **Preview URL**

5.  Recommend to add a [Notification step in GitHub actions][23] for your Team IM app

6.  Remind the PMs & users of your product to submit **Feature/Enhancement** requests or **Bug** reports with [Issue forms][24] instead of IM messages or Mobile Phone calls

7.  Collect all these issues into [Project kanbans][25], then create **Pull requests** & add `closes #issue_number` into its description for automation

## Getting Started

First, run the development server:

```bash
npm i pnpm -g
pnpm dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes][26] can be accessed on http://localhost:3000/api/hello. This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes][27] instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation][28] - learn about Next.js features and API.
- [Learn Next.js][29] - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository][30] - your feedback and contributions are welcome!

## Deployment

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform][17] from the creators of Next.js.

Check out our [Next.js deployment documentation][31] for more details.

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
[10]: https://www.typescriptlang.org/
[11]: https://mdxjs.com/
[12]: https://nextjs.org/
[13]: https://getbootstrap.com/
[14]: https://developers.google.com/web/tools/workbox
[15]: https://mobx.js.org/
[16]: https://github.com/features/actions
[17]: https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme
[18]: https://github.com/apps/settings
[19]: https://github.com/new?template_name=Next-Bootstrap-ts&template_owner=idea2app
[20]: https://codespaces.new/idea2app/Next-Bootstrap-ts
[21]: https://github.com/idea2app/Next-Bootstrap-ts/blob/80967ed49045af9dbcf4d3695a2c39d53a6f71f1/.github/workflows/pull-request.yml#L9-L12
[22]: https://github.com/idea2app/Next-Bootstrap-ts/settings/secrets/actions
[23]: https://github.com/kaiyuanshe/kaiyuanshe.github.io/blob/bb4675a56bf1d6b207231313da5ed0af7cf0ebd6/.github/workflows/pull-request.yml#L32-L56
[24]: https://github.com/idea2app/Next-Bootstrap-ts/issues/new/choose
[25]: https://github.com/idea2app/Next-Bootstrap-ts/projects
[26]: https://nextjs.org/docs/api-routes/introduction
[27]: https://nextjs.org/docs/api-routes/introduction
[28]: https://nextjs.org/docs
[29]: https://nextjs.org/learn
[30]: https://github.com/vercel/next.js/
[31]: https://nextjs.org/docs/deployment
