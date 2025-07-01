'use client';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

type TextEditorProps = {
    readonly value: string;
    readonly onChange: (content: string) => void;
};

export default function TextEditor({ value, onChange }: TextEditorProps) {
    return (
        <div>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                placeholder="Input your content here..."
                modules={{
                    toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline', 'strike'], [{ color: [] }, { background: [] }], [{ list: 'ordered' }, { list: 'bullet' }], ['link'], ['clean']]
                }}
                formats={['header', 'bold', 'italic', 'underline', 'strike', 'color', 'background', 'list', 'link']}
            />
        </div>
    );
}
