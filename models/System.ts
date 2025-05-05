import { observable, reaction } from 'mobx';
import { persist, restore } from 'mobx-restful';

import { isServer } from './configuration';

export class SystemModel {
  @persist()
  @observable
  accessor colorScheme: 'light' | 'dark' = globalThis.matchMedia?.(
    '(prefers-color-scheme: dark)',
  ).matches
    ? 'dark'
    : 'light';

  restored = !isServer() && restore(this, 'System');

  disposer = reaction(
    () => this.colorScheme,
    scheme => (document.documentElement.dataset.bsTheme = scheme),
  );

  toggleColorScheme = () =>
    (this.colorScheme = this.colorScheme === 'dark' ? 'light' : 'dark');
}

export default new SystemModel();
