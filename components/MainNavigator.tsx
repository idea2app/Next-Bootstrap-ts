import { Option, Select } from 'idea-react';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { FC } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

import { i18n, LanguageName } from '../models/Translation';

const Name = process.env.NEXT_PUBLIC_SITE_NAME || '';

export const MainNavigator: FC = observer(() => {
  const { currentLanguage, t } = i18n;

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
            <Link href="/component" passHref>
              <Nav.Link>{t('component')}</Nav.Link>
            </Link>
            <Link href="/pagination" passHref>
              <Nav.Link>{t('pagination')}</Nav.Link>
            </Link>
            <Link href="/scroll-list" passHref>
              <Nav.Link>{t('scroll_list')}</Nav.Link>
            </Link>
            <Nav.Link
              target="_blank"
              href="https://github.com/idea2app/Next-Bootstrap-TS"
            >
              {t('source_code')}
            </Nav.Link>
          </Nav>

          <Select
            value={currentLanguage}
            onChange={key => i18n.changeLanguage(key as typeof currentLanguage)}
          >
            {Object.entries(LanguageName).map(([key, name]) => (
              <Option key={key} value={key}>
                {name}
              </Option>
            ))}
          </Select>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});
