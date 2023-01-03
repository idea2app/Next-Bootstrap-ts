import {
  AudioTool,
  Editor,
  EditorProps,
  IFrameTool,
  OriginalTools,
  VideoTool,
} from 'react-bootstrap-editor';
import { Constructor } from 'web-utility';

const ExcludeTools = [IFrameTool, AudioTool, VideoTool];

const CustomTools = OriginalTools.filter(
  Tool => !ExcludeTools.includes(Tool as Constructor<IFrameTool>),
);

export default function HTMLEditor(props: EditorProps) {
  return <Editor tools={CustomTools} {...props} />;
}
