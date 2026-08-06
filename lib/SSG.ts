import 'core-js/full/array/from-async';

import { DataObject } from 'mobx-restful';
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Minute, Second } from 'web-utility';

import { CI } from '../models/configuration';

export const skipBuilding =
  <Props extends DataObject, Params extends ParsedUrlQuery = ParsedUrlQuery>(
    rawHandler: GetStaticProps<Props, Params>,
    revalidate = Minute / Second,
  ): GetStaticProps<Props, Params> =>
  async context => {
    const fallback: GetStaticPropsResult<any> = { notFound: true, revalidate };

    if (CI) return fallback;

    try {
      return await rawHandler(context);
    } catch (error) {
      console.error(error);

      return fallback;
    }
  };
export const skipBuildingAll: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
});
