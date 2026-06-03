import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Write your content..." 
}: RichTextEditorProps) {
  return (
    <div className="prose max-w-none w-full border rounded-md overflow-hidden">
      {/* @ts-ignore - Bypassing TypeScript strict mode for CKEditor */}
      <CKEditor
        editor={ClassicEditor as any}
        data={value}
        config={{
          placeholder: placeholder,
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'blockQuote',
            'undo',
            'redo'
          ]
        }}
        onChange={(event, editor: any) => { 
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}