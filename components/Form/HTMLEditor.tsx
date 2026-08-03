import {
  AudioTool,
  CopyMarkdownTool,
  Editor,
  EditorProps,
  IFrameTool,
  ImageTool,
  OriginalTools,
  VideoTool,
} from 'react-bootstrap-editor';
import { Constructor } from 'web-utility';

import { upload } from '../../models/Base';

const ExcludeTools = [IFrameTool, AudioTool, VideoTool];

const CustomTools = OriginalTools.filter(
  Tool => !ExcludeTools.includes(Tool as Constructor<IFrameTool>),
);
ImageTool.prototype.save = upload;

export default function HTMLEditor(props: EditorProps) {
  return <Editor tools={[...CustomTools, CopyMarkdownTool]} {...props} />;
}
