import { observable, reaction } from 'mobx';
import { setCookie } from 'mobx-i18n';
import { persist, restore } from 'mobx-restful';

import { isServer } from './configuration';

export type ColorScheme = 'light' | 'dark';

const matchColorScheme = (color: ColorScheme) =>
  globalThis.matchMedia?.(`(prefers-color-scheme: ${color})`);

export class SystemModel {
  @persist()
  @observable
  accessor colorScheme: 'light' | 'dark' = matchColorScheme('dark').matches
    ? 'dark'
    : 'light';

  restored =
    !isServer() &&
    restore(this, 'System').then(() =>
      matchColorScheme('dark').addEventListener(
        'change',
        ({ matches }) => (this.colorScheme = matches ? 'dark' : 'light'),
      ),
    );
  disposer = reaction(
    () => this.colorScheme,
    scheme => {
      document.documentElement.dataset.bsTheme = scheme;
      setCookie('colorScheme', scheme);
    },
  );

  toggleColorScheme = () =>
    (this.colorScheme = this.colorScheme === 'dark' ? 'light' : 'dark');
}

export default new SystemModel();
