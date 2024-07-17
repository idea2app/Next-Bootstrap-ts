import { Loading } from 'idea-react';
import { RepositoryModel } from 'mobx-github';
import { observer } from 'mobx-react';
import { ScrollList } from 'mobx-restful-table';
import { InferGetServerSidePropsType } from 'next';
import { cache, compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { GitCard } from '../components/Git/Card';
import { PageHead } from '../components/PageHead';
import { repositoryStore } from '../models/Base';
import { i18n } from '../models/Translation';

export const getServerSideProps = compose(
  errorLogger,
  cache(),
  translator(i18n),
  async () => {
    const list = await new RepositoryModel('idea2app').getList();

    return { props: { list } };
  },
);

const ScrollListPage: FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = observer(({ list }) => (
  <Container>
    <PageHead title={i18n.t('scroll_list')} />

    <h1 className="my-4">{i18n.t('scroll_list')}</h1>

    {repositoryStore.downloading > 0 && <Loading />}

    <ScrollList
      translator={i18n}
      store={repositoryStore}
      renderList={allItems => (
        <Row as="ul" className="list-unstyled g-4" xs={1} sm={2}>
          {allItems.map(item => (
            <Col as="li" key={item.id}>
              <GitCard className="h-100 shadow-sm" {...item} />
            </Col>
          ))}
        </Row>
      )}
      defaultData={list}
    />
  </Container>
));

export default ScrollListPage;
