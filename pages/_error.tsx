import * as Sentry from '@sentry/nextjs';
import type { NextPage } from 'next';
import type { ErrorProps } from 'next/error';
import Error from 'next/error';

import { NotFoundCard } from '../components/NotFoundCard';

const CustomErrorComponent: NextPage<ErrorProps> = props => (
  <>
    <Error {...props} />

    <NotFoundCard {...props} />
  </>
);
const enableSentry =
  process.env.NODE_ENV === 'development' || !process.env.SENTRY_AUTH_TOKEN;

CustomErrorComponent.getInitialProps = async contextData => {
  if (enableSentry) await Sentry.captureUnderscoreErrorException(contextData);

  return Error.getInitialProps(contextData);
};

export default CustomErrorComponent;
