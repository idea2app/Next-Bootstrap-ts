import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { Column, RestTable } from 'mobx-restful-table';
import { PureComponent } from 'react';
import { Badge, Button, Container } from 'react-bootstrap';

import repositoryStore, { Repository } from '../models/Repository';
import { i18n } from '../models/Translation';

@observer
export default class PaginationPage extends PureComponent {
  @computed
  get columns(): Column<Repository>[] {
    const { t } = i18n;

    return [
      {
        key: 'full_name',
        type: 'url',
        renderHead: t('repository_name'),
        renderBody: ({ html_url, full_name }) => (
          <a target="_blank" href={html_url} rel="noreferrer">
            {full_name}
          </a>
        ),
      },
      {
        key: 'homepage',
        type: 'url',
        renderHead: t('home_page'),
        renderBody: ({ homepage }) =>
          homepage && (
            <a target="_blank" href={homepage} rel="noreferrer">
              {homepage}
            </a>
          ),
      },
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
      {
        renderBody: data => (
          <Button
            className="text-nowrap"
            variant="warning"
            size="sm"
            onClick={() => (repositoryStore.currentOne = data)}
          >
            {t('edit')}
          </Button>
        ),
      },
    ];
  }

  render() {
    return (
      <Container style={{ height: '91vh' }}>
        <RestTable
          className="text-center"
          striped
          hover
          editable
          columns={this.columns}
          store={repositoryStore}
          translater={i18n}
        />
      </Container>
    );
  }
}
