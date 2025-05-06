import { text2color } from 'idea-react';
import { computed, observable } from 'mobx';
import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import { Column, RestTable } from 'mobx-restful-table';
import { Component, ContextType } from 'react';
import { Badge, Container } from 'react-bootstrap';

import { PageHead } from '../components/PageHead';
import { repositoryStore } from '../models/Base';
import { i18n, I18nContext } from '../models/Translation';

@observer
export default class PaginationPage extends Component {
  static contextType = I18nContext;

  declare context: ContextType<typeof I18nContext>;

  @observable
  // @ts-expect-error MobX compatibility
  accessor observedContext = this.context;

  @computed
  get columns(): Column<GitRepository>[] {
    const { t } = this.observedContext;

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
                bg={text2color(topic, ['light'])}
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
    const { t } = this.observedContext;

    return (
      <Container style={{ height: '91vh' }}>
        <PageHead title={t('pagination')} />

        <RestTable
          className="h-100 text-center"
          striped
          hover
          editable
          deletable
          columns={this.columns}
          store={repositoryStore}
          translator={i18n}
          onCheck={console.info}
        />
      </Container>
    );
  }
}
