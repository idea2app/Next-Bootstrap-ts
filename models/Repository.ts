import { components } from '@octokit/openapi-types';
import { ListModel } from 'mobx-restful';
import { buildURLData } from 'web-utility';

import { githubClient } from './Base';

export type Repository = components['schemas']['minimal-repository'];

export type Organization = components['schemas']['organization-full'];

export class RepositoryModel extends ListModel<Repository> {
  client = githubClient;
  baseURI = 'orgs/idea2app/repos';
  indexKey = 'name' as const;

  async loadPage(page: number, per_page: number) {
    const { body: list } = await this.client.get<Repository[]>(
      `${this.baseURI}?${buildURLData({ page, per_page })}`,
    );
    const [_, organization] = this.baseURI.split('/');

    const { body } = await this.client.get<Organization>(
      `orgs/${organization}`,
    );
    return { pageData: list!, totalCount: body!.public_repos };
  }
}

export default new RepositoryModel();
