import { observer } from 'mobx-react';
import dynamic from 'next/dynamic';
import { FC, useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

import { Name } from '../models/configuration';
import { I18nContext } from '../models/Translation';

const LightSwitch = dynamic(() => import('./LightSwitch'), { ssr: false }),
  LanguageMenu = dynamic(() => import('./LanguageMenu'), { ssr: false });

export const MainNavigator: FC = observer(() => {
  const { t } = useContext(I18nContext);

  return (
    <Navbar
      bg="primary"
      variant="dark"
      fixed="top"
      expand="sm"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand href="/">{Name}</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-inner" />

        <Navbar.Collapse id="navbar-inner">
          <Nav className="me-auto">
            <Nav.Link href="/article">{t('article')}</Nav.Link>

            <Nav.Link href="/component">{t('component')}</Nav.Link>

            <Nav.Link href="/pagination">{t('pagination')}</Nav.Link>

            <Nav.Link href="/scroll-list">{t('scroll_list')}</Nav.Link>

            <Nav.Link
              target="_blank"
              href="https://github.com/idea2app/Next-Bootstrap-TS"
            >
              {t('source_code')}
            </Nav.Link>
          </Nav>

          <LightSwitch className="my-3 my-sm-0 mx-sm-3" />
          <LanguageMenu />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});
