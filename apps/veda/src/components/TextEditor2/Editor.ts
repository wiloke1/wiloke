// @ts-nocheck
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [Bold, Essentials, FontColor, FontFamily, FontSize, Heading, Indent, Italic, Link, List, Paragraph, Underline];

// Editor configuration.
Editor.defaultConfig = {
  toolbar: {
    items: [
      '|',
      'heading',
      'bold',
      'italic',
      'underline',
      '|',
      'fontBackgroundColor',
      'fontColor',
      'fontSize',
      'fontFamily',
      'link',
      '|',
      'bulletedList',
      'numberedList',
      'outdent',
      'indent',
      '|',
      'insertTable',
      'undo',
      'redo',
    ],
  },
  language: 'en',
};

export default Editor;
