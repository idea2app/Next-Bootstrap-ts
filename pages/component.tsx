import { Card, CodeBlock, Container, MarkdownView } from 'idea-react';
import { textJoin } from 'mobx-i18n';
import { observer } from 'mobx-react';
import dynamic from 'next/dynamic';
import { FC, PropsWithChildren, useContext } from 'react';

import { PageHead } from '../components/Layout/PageHead';
import { I18nContext } from '../models/Translation';

const HTMLEditor = dynamic(() => import('../components/Form/HTMLEditor'), {
  ssr: false,
});
HTMLEditor.displayName = 'HTMLEditor';

const Example: FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => (
  <>
    <h2 className="mt-3">{title}</h2>
    {children}
    <Card body className="my-3 bg-light">
      <CodeBlock language="tsx">{children}</CodeBlock>
    </Card>
  </>
);

const ComponentPage = observer(() => {
  const { t } = useContext(I18nContext);

  const title = textJoin(t('component'), t('examples'));

  return (
    <>
      <PageHead title={title} />

      <Container>
        <h1 className="my-4 text-center">{title}</h1>

        <Example title="HTML Editor">
          <HTMLEditor defaultValue="Hello, HTML!" onChange={console.info} />
        </Example>

        <Example title="Markdown to HTML">
          <MarkdownView>
            {'## Markdown demo\n\nRendered with **Idea React**.'}
          </MarkdownView>
        </Example>
      </Container>
    </>
  );
});
export default ComponentPage;
