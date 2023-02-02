import { Loading } from 'idea-react';
import { observer } from 'mobx-react';
import { InferGetServerSidePropsType } from 'next';
import { FC } from 'react';
import { Container } from 'react-bootstrap';

import { GitList } from '../components/Git';
import { PageHead } from '../components/PageHead';
import repositoryStore, { RepositoryModel } from '../models/Repository';
import { i18n } from '../models/Translation';
import { withErrorLog, withTranslation } from './api/core';

export const getServerSideProps = withErrorLog(
  withTranslation(async () => {
    const list = await new RepositoryModel().getList();

    return { props: { list } };
  }),
);

const ScrollListPage: FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = observer(({ list }) => (
  <Container>
    <PageHead title={i18n.t('scroll_list')} />

    <h1 className="my-4">{i18n.t('scroll_list')}</h1>

    {repositoryStore.downloading > 0 && <Loading />}

    <GitList store={repositoryStore} defaultData={list} />
  </Container>
));

export default ScrollListPage;
