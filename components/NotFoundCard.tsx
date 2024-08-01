import { FC } from 'react';

import { i18n } from '../models/Translation';

export const NotFoundCard: FC = () =>
  i18n.currentLanguage.startsWith('zh') ? (
    // @ts-ignore
    <script src="//cdn.dnpw.org/404/v1.min.js" jumptarget="/" jumptime="-1" />
  ) : (
    <iframe
      className="w-100 vh-100 border-0"
      src="https://notfound-static.fwebservices.be/en/404?key=66abb751ed312"
    />
  );
