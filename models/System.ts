import { autorun, observable } from 'mobx';
import { persist, restore } from 'mobx-restful';
import { setCookie } from 'web-utility';

import { isServer } from './configuration';

export type ColorScheme = 'light' | 'dark';

const matchColorScheme = (color: ColorScheme) =>
  globalThis.matchMedia?.(`(prefers-color-scheme: ${color})`);

export class SystemModel {
  @persist()
  @observable
  accessor colorScheme: 'light' | 'dark' = matchColorScheme('dark')?.matches
    ? 'dark'
    : 'light';

  restored =
    !isServer() &&
    restore(this, 'System').then(() =>
      matchColorScheme('dark')?.addEventListener(
        'change',
        ({ matches }) => (this.colorScheme = matches ? 'dark' : 'light'),
      ),
    );
  disposer =
    !isServer() &&
    autorun(() => {
      document.documentElement.dataset.bsTheme = this.colorScheme;
      setCookie('colorScheme', this.colorScheme);
    });

  toggleColorScheme = () =>
    (this.colorScheme = this.colorScheme === 'dark' ? 'light' : 'dark');
}

export default new SystemModel();
