import Code from '@editorjs/code';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import LinkTool from '@editorjs/link';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import { Editor as Core, EditorProps } from 'idea-react';

const Tools = {
  list: List,
  code: Code,
  linkTool: LinkTool,
  image: Image,
  header: Header,
  quote: Quote,
};

export default function Editor(props: Omit<EditorProps, 'tools'>) {
  return <Core tools={Tools} {...props} />;
}
