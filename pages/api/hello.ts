// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createKoaRouter, withKoaRouter } from 'next-ssr-middleware';

import { safeAPI } from '../../lib/API';

const router = createKoaRouter(import.meta.url);

router.get('/', safeAPI, async context => {
  context.status = 401;
  context.body = { name: 'John Doe' };
});

export default withKoaRouter(router);
