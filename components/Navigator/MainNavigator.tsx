import {
  Container,
  Drawer,
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  NavLink,
} from 'idea-react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import dynamic from 'next/dynamic';
import { Component } from 'react';

import { Name } from '../../models/configuration';
import { i18n, I18nContext } from '../../models/Translation';

const LightSwitch = dynamic(() => import('./LightSwitch'), { ssr: false }),
  LanguageMenu = dynamic(() => import('./LanguageMenu'), { ssr: false });

@observer
export class MainNavigator extends Component<{}, typeof i18n> {
  static contextType = I18nContext;

  declare context: typeof i18n;

  @observable accessor open = false;

  show = action(() => (this.open = true));

  hide = action(() => (this.open = false));

  render() {
    const { t } = this.context;

    return (
      <Navbar className="fixed-top bg-primary" theme="dark" expand="sm">
        <Container>
          <NavbarBrand href="/">{Name}</NavbarBrand>

          <NavbarToggler
            expanded={this.open}
            aria-label="Toggle navigation"
            onClick={this.show}
          />

          <Drawer
            className="w-100"
            bodyClassName="d-flex"
            title={Name}
            responsive="sm"
            placement="end"
            open={this.open}
            onDismiss={this.hide}
          >
            <NavbarNav className="flex-fill">
              <NavLink href="/article" onClick={this.hide}>
                {t('article')}
              </NavLink>
              <NavLink href="/component" onClick={this.hide}>
                {t('component')}
              </NavLink>
              <NavLink href="/pagination" onClick={this.hide}>
                {t('pagination')}
              </NavLink>
              <NavLink href="/scroll-list" onClick={this.hide}>
                {t('scroll_list')}
              </NavLink>
              <NavLink
                target="_blank"
                href="https://github.com/idea2app/Next-Bootstrap-TS"
                onClick={this.hide}
              >
                {t('source_code')}
              </NavLink>
            </NavbarNav>
            <div className="d-flex gap-3">
              <LightSwitch className="my-3 my-sm-0 mx-sm-3" />
              <LanguageMenu />
            </div>
          </Drawer>
        </Container>
      </Navbar>
    );
  }
}
