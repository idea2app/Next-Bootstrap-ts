import { i18n } from '../../models/Translation';

export const mainNav = () => [
  {
    title: i18n.t('documentation'),
    link: 'https://nextjs.org/docs',
    summary: i18n.t('documentation_summary'),
  },
  {
    title: i18n.t('learn'),
    link: 'https://nextjs.org/learn',
    summary: i18n.t('learn_summary'),
  },
  {
    title: i18n.t('examples'),
    link: 'https://github.com/vercel/next.js/tree/master/examples',
    summary: i18n.t('examples_summary'),
  },
  {
    title: i18n.t('deploy'),
    link: 'https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app',
    summary: i18n.t('deploy_summary'),
  },
];

export const framework = [
  {
    title: 'Next.js',
    summary: 'The React Framework for Production.',
    logo: 'nextjs.png',
    link: 'https://nextjs.org/',
    repository: 'https://github.com/vercel/next.js',
  },
  {
    title: 'React Bootstrap',
    summary: 'The most popular front-end framework Rebuilt for React.',
    logo: 'reactbootstrap.svg',
    link: 'https://react-bootstrap.github.io/',
    repository: 'https://github.com/react-bootstrap/react-bootstrap',
  },
  {
    title: 'TypeScript',
    summary: 'TypeScript is JavaScript with syntax for types.',
    logo: 'typescript.png',
    link: 'https://www.typescriptlang.org/',
    repository: 'https://github.com/microsoft/TypeScript',
  },
];
