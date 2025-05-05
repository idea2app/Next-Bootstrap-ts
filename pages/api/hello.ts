// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createKoaRouter } from 'next-ssr-middleware';

import { withSafeKoaRouter } from './core';

const router = createKoaRouter(import.meta.url);

router.get('/', async context => {
  context.status = 401;
  context.body = { name: 'John Doe' };
});

export default withSafeKoaRouter(router);
