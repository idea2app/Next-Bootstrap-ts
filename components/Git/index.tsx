import { observer } from 'mobx-react';
import { ScrollList, ScrollListProps } from 'mobx-restful-table';
import { Col,Row } from 'react-bootstrap';

import { GitRepository, RepositoryModel } from '../../models/Repository';
import { i18n } from '../../models/Translation';
import { GitCard } from './Card';

export interface GitListProps extends ScrollListProps<GitRepository> {
  store: RepositoryModel;
}

@observer
export class GitList extends ScrollList<GitListProps> {
  store = this.props.store;
  translater = i18n;

  constructor(props: GitListProps) {
    super(props);

    this.boot();
  }

  renderList() {
    const { allItems } = this.store;

    return (
      <Row as="ul" className="list-unstyled g-4" xs={1} sm={2}>
        {allItems.map(item => (
          <Col as="li" key={item.id}>
            <GitCard className="h-100 shadow-sm" {...item} />
          </Col>
        ))}
      </Row>
    );
  }
}
