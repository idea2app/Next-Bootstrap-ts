import { components } from '@octokit/openapi-types';
import { memoize } from 'lodash';
import { ListModel, toggle } from 'mobx-restful';
import { averageOf, buildURLData } from 'web-utility';

import { githubClient } from './Base';

type Repository = components['schemas']['minimal-repository'];

export interface GitRepository extends Repository {
  languages?: string[];
}
export type Organization = components['schemas']['organization-full'];

const getGitLanguages = memoize(async (URI: string) => {
  const { body: languageCount } = await githubClient.get<
    Record<string, number>
  >(`repos/${URI}/languages`);

  const languageAverage = averageOf(...Object.values(languageCount!));

  const languageList = Object.entries(languageCount!)
    .filter(([_, score]) => score >= languageAverage)
    .sort(([_, a], [__, b]) => b - a);

  return languageList.map(([name]) => name);
});

export class RepositoryModel extends ListModel<GitRepository> {
  client = githubClient;
  baseURI = 'orgs/idea2app/repos';
  indexKey = 'name' as const;

  @toggle('downloading')
  async getOne(URI: string) {
    const { body } = await this.client.get<Repository>(`repos/${URI}`);

    return (this.currentOne = {
      ...body!,
      languages: await getGitLanguages(URI),
    });
  }

  async loadPage(page: number, per_page: number) {
    const { body: list } = await this.client.get<Repository[]>(
      `${this.baseURI}?${buildURLData({
        type: 'public',
        sort: 'pushed',
        page,
        per_page,
      })}`,
    );
    const pageData = await Promise.all(
      list!.map(async ({ full_name, ...item }) => ({
        ...item,
        full_name,
        languages: await getGitLanguages(full_name),
      })),
    );
    const [_, organization] = this.baseURI.split('/');

    const { body } = await this.client.get<Organization>(
      `orgs/${organization}`,
    );
    return { pageData, totalCount: body!.public_repos };
  }
}

export default new RepositoryModel();
