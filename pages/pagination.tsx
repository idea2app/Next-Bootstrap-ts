import { computed } from 'mobx';
import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { BadgeBar, Column, RestTable } from 'mobx-restful-table';
import { Container } from 'react-bootstrap';

import { PageHead } from '../components/PageHead';
import { repositoryStore } from '../models/Base';
import { i18n, I18nContext } from '../models/Translation';

@observer
export default class PaginationPage extends ObservedComponent<{}, typeof i18n> {
  static contextType = I18nContext;

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
        required: true,
        minLength: 3,
        invalidMessage: 'Input 3 characters at least',
      },
      { key: 'homepage', type: 'url', renderHead: t('home_page') },
      { key: 'language', renderHead: t('programming_language') },
      {
        key: 'topics',
        renderHead: t('topic'),
        renderBody: ({ topics }) => (
          <BadgeBar
            list={(topics || []).map(text => ({
              text,
              link: `https://github.com/topics/${text}`,
            }))}
          />
        ),
      },
      { key: 'stargazers_count', type: 'number', renderHead: t('star_count') },
      { key: 'description', renderHead: t('description'), rows: 3 },
    ];
  }

  render() {
    const i18n = this.observedContext;

    return (
      <Container style={{ height: '91vh' }}>
        <PageHead title={i18n.t('pagination')} />

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
