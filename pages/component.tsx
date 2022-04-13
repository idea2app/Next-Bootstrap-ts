import { PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import Container from 'react-bootstrap/Container';
import {
  TimeDistance,
  PaginationBar,
  Icon,
  Avatar,
  Nameplate,
  FilterInput,
  FilePicker,
  EditorHTML,
  CodeBlock,
} from 'idea-react';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';

import PageHead from '../components/PageHead';
import RichEditData from './api/rich-edit.json';

const Editor = dynamic(() => import('../components/Editor'), { ssr: false });

Editor.displayName = 'Editor';

function Example({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <>
      <h2 className="mt-3">{title}</h2>
      {children}
      <CodeBlock language="tsx">{children}</CodeBlock>
    </>
  );
}

export default function ComponentPage() {
  const title = 'Component examples',
    content = JSON.stringify(RichEditData);

  return (
    <>
      <PageHead title={title} />

      <Container>
        <h1 className="my-4 text-center">{title}</h1>

        <Example title="Time Distance">
          <TimeDistance date="1989-06-04" />
        </Example>

        <Example title="Pagination Bar">
          <PaginationBar
            className="my-3 justify-content-end"
            size="sm"
            count={42}
            pageCount={5}
            currentPage={1}
            onChange={console.log}
          />
        </Example>

        <Example title="Icon">
          <Icon name="heart" className="text-danger" />
        </Example>

        <Example title="Avatar">
          <Avatar src="https://github.com/idea2app.png" />
        </Example>

        <Example title="Nameplate">
          <Nameplate avatar="https://github.com/idea2app.png" name="idea2app" />
        </Example>

        <Example title="Filter Input">
          <FilterInput name="tags" />
        </Example>

        <Example title="File Picker">
          <FilePicker accept="image/*" multiple name="images" />
        </Example>

        <Example title="Editor">
          <Editor name="content" defaultValue={content} />
        </Example>

        <Example title="Editor HTML">
          <EditorHTML data={content} />
        </Example>
      </Container>
    </>
  );
}
