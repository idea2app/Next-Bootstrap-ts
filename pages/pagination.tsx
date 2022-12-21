import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { Column, RestTable } from 'mobx-restful-table';
import { PureComponent } from 'react';
import { Badge, Container } from 'react-bootstrap';

import { PageHead } from '../components/PageHead';
import repositoryStore, { GitRepository } from '../models/Repository';
import { i18n } from '../models/Translation';
import { withTranslation } from './api/core';

export const getServerSideProps = withTranslation();

@observer
export default class PaginationPage extends PureComponent {
  @computed
  get columns(): Column<GitRepository>[] {
    const { t } = i18n;

    return [
      {
        key: 'full_name',
        renderHead: t('repository_name'),
        renderBody: ({ html_url, full_name }) => (
          <a target="_blank" href={html_url} rel="noreferrer">
            {full_name}
          </a>
        ),
      },
      { key: 'homepage', type: 'url', renderHead: t('home_page') },
      { key: 'language', renderHead: t('programming_language') },
      {
        key: 'topics',
        renderHead: t('topic'),
        renderBody: ({ topics }) => (
          <>
            {topics?.map(topic => (
              <Badge
                key={topic}
                className="me-2"
                as="a"
                target="_blank"
                href={`https://github.com/topics/${topic}`}
              >
                {topic}
              </Badge>
            ))}
          </>
        ),
      },
      { key: 'stargazers_count', type: 'number', renderHead: t('star_count') },
    ];
  }

  render() {
    const { t } = i18n;

    return (
      <Container style={{ height: '91vh' }}>
        <PageHead title={t('pagination')} />

        <RestTable
          className="text-center"
          striped
          hover
          editable
          deletable
          columns={this.columns}
          store={repositoryStore}
          translater={i18n}
          onCheck={console.log}
        />
      </Container>
    );
  }
}
