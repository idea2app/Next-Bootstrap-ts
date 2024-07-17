import Code from '@editorjs/code';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import LinkTool from '@editorjs/link';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import { Editor as Core, EditorProps } from 'idea-react';

import { upload } from '../models/Base';

async function uploadByFile(file: File) {
  try {
    const url = await upload(file);

    return { success: 1, file: { url } };
  } catch (error) {
    console.error(error);
    return { success: 0 };
  }
}

const Tools = {
  list: List,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: { uploader: { uploadByFile } },
  },
  header: Header,
  quote: Quote,
};

export default function Editor(props: Omit<EditorProps, 'tools'>) {
  // @ts-ignore
  return <Core tools={Tools} {...props} />;
}
