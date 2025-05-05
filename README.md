# Next-Bootstrap-ts

[React][1] project scaffold based on [TypeScript][2], [Next.js][3], [Bootstrap][4] & [Workbox][5]. And this project bootstrapped with [`create-next-app`][6].

[![CI & CD](https://github.com/idea2app/Next-Bootstrap-ts/actions/workflows/main.yml/badge.svg)][7]

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)][8]
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][9]

## Technology stack

- Language: [TypeScript v5][2] + [MDX v3][10]
- Component engine: [Next.js v15][3]
- Component suite: [Bootstrap v5][4]
- PWA framework: [Workbox v6][5]
- State management: [MobX v6][11]
- API router: [Koa 2][12]
- CI / CD: GitHub [Actions][13] + [Vercel][14]
- Monitor service: [Sentry][15]

## Major examples

1. [Markdown articles](pages/article/)
2. [Editor components](pages/component.tsx)
3. [Pagination table](pages/pagination.tsx)
4. [Scroll list](pages/scroll-list.tsx)
5. [Not Found page (NGO)](pages/_error.tsx)
   - Global: https://notfound.org/
   - Chinese: https://www.dnpw.org/cn/pa-notfound.html

## Best practice

1.  Install GitHub apps in your organization or account:

    1.  [Probot settings][16]: set up Issue labels & Pull Request rules
    2.  [PR badge][17]: set up Online [VS Code][18] editor entries in Pull Request description

2.  Click the **[<kbd>Use this template</kbd>][19] button** on the top of this GitHub repository's home page, then create your own repository in the app-installed namespace above

3.  Click the **[<kbd>Open in GitHub codespaces</kbd>][8] button** on the top of ReadMe file, then an **online VS Code development environment** will be started immediately

4.  Set [Vercel variables][20] as [Repository secrets][21], then every commit will get an independent **Preview URL**

5.  Recommend to add a [Notification step in GitHub actions][22] for your Team IM app

6.  Remind the PMs & users of your product to submit **Feature/Enhancement** requests or **Bug** reports with [Issue forms][23] instead of IM messages or Mobile Phone calls

7.  Collect all these issues into [Project kanbans][24], then create **Pull requests** & add `closes #issue_number` into its description for automation

## Getting Started

First, run the development server:

```bash
npm i pnpm -g
pnpm dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes][25] can be accessed on http://localhost:3000/api/hello. This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as API routes instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation][26] - learn about Next.js features and API.
- [Learn Next.js][27] - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository][28] - your feedback and contributions are welcome!

## Deployment

### Environment variables

|           name           |     file     |       description       |
| :----------------------: | :----------: | :---------------------: |
|   `SENTRY_AUTH_TOKEN`    | `.env.local` | [Official document][29] |
|       `SENTRY_ORG`       |    `.env`    | [Official document][30] |
|     `SENTRY_PROJECT`     |    `.env`    | [Official document][30] |
| `NEXT_PUBLIC_SENTRY_DSN` |    `.env`    | [Official document][31] |

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform][14] from the creators of Next.js.

Check out our [Next.js deployment documentation][32] for more details.

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
[10]: https://mdxjs.com/
[11]: https://mobx.js.org/
[12]: https://koajs.com/
[13]: https://github.com/features/actions
[14]: https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme
[15]: https://sentry.io/
[16]: https://github.com/apps/settings
[17]: https://pullrequestbadge.com/
[18]: https://code.visualstudio.com/
[19]: https://github.com/new?template_name=Next-Bootstrap-ts&template_owner=idea2app
[20]: https://github.com/idea2app/Next-Bootstrap-ts/blob/80967ed49045af9dbcf4d3695a2c39d53a6f71f1/.github/workflows/pull-request.yml#L9-L11
[21]: https://github.com/idea2app/Next-Bootstrap-ts/settings/secrets/actions
[22]: https://github.com/FreeCodeCamp-Chengdu/FreeCodeCamp-Chengdu.github.io/blob/8df9944449002758f7ec809deeb260ce08182259/.github/workflows/main.yml#L34-L63
[23]: https://github.com/idea2app/Next-Bootstrap-ts/issues/new/choose
[24]: https://github.com/idea2app/Next-Bootstrap-ts/projects
[25]: https://nextjs.org/docs/api-routes/introduction
[26]: https://nextjs.org/docs
[27]: https://nextjs.org/learn
[28]: https://github.com/vercel/next.js/
[29]: https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-configuration-files-for-source-map-upload
[30]: https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-environment-variables
[31]: https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#create-initialization-config-files
[32]: https://nextjs.org/docs/deployment
