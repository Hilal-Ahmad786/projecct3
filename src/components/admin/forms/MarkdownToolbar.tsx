'use client';

import { RefObject } from 'react';

interface MarkdownToolbarProps {
    textareaRef: RefObject<HTMLTextAreaElement | null>;
    value: string;
    onChange: (value: string) => void;
}

type InsertAction = {
    label: string;
    icon: string;
    prefix: string;
    suffix: string;
    block?: boolean;
};

const actions: InsertAction[] = [
    { label: 'Bold', icon: 'B', prefix: '**', suffix: '**' },
    { label: 'Italic', icon: 'I', prefix: '_', suffix: '_' },
    { label: 'Heading 1', icon: 'H1', prefix: '# ', suffix: '', block: true },
    { label: 'Heading 2', icon: 'H2', prefix: '## ', suffix: '', block: true },
    { label: 'Heading 3', icon: 'H3', prefix: '### ', suffix: '', block: true },
    { label: 'Bullet List', icon: '\u2022', prefix: '- ', suffix: '', block: true },
    { label: 'Numbered List', icon: '1.', prefix: '1. ', suffix: '', block: true },
    { label: 'Link', icon: '\uD83D\uDD17', prefix: '[', suffix: '](url)' },
    { label: 'Image', icon: '\uD83D\uDDBC', prefix: '![alt](', suffix: ')' },
    { label: 'Code', icon: '< >', prefix: '`', suffix: '`' },
    { label: 'Code Block', icon: '{ }', prefix: '```\n', suffix: '\n```', block: true },
    { label: 'Quote', icon: '\u201C', prefix: '> ', suffix: '', block: true },
    { label: 'Horizontal Rule', icon: '\u2014', prefix: '\n---\n', suffix: '', block: true },
    { label: 'Table', icon: '\u2637', prefix: '| Column 1 | Column 2 | Column 3 |\n| --- | --- | --- |\n| ', suffix: ' | | |', block: true },
];

export default function MarkdownToolbar({ textareaRef, value, onChange }: MarkdownToolbarProps) {
    const insertMarkdown = (action: InsertAction) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = value.slice(start, end);

        let newText: string;
        let newCursorPos: number;

        if (action.block && start > 0 && value[start - 1] !== '\n') {
            const blockPrefix = '\n' + action.prefix;
            newText = value.slice(0, start) + blockPrefix + selected + action.suffix + value.slice(end);
            newCursorPos = start + blockPrefix.length + selected.length + action.suffix.length;
        } else {
            newText = value.slice(0, start) + action.prefix + selected + action.suffix + value.slice(end);
            newCursorPos = start + action.prefix.length + selected.length + action.suffix.length;
        }

        onChange(newText);

        requestAnimationFrame(() => {
            textarea.focus();
            if (!selected) {
                const pos = start + action.prefix.length;
                textarea.setSelectionRange(pos, pos);
            } else {
                textarea.setSelectionRange(newCursorPos, newCursorPos);
            }
        });
    };

    return (
        <div className="flex flex-wrap gap-0.5 p-1.5 bg-gray-50 border border-gray-200 rounded-t-lg border-b-0">
            {actions.map((action, idx) => (
                <button
                    key={idx}
                    type="button"
                    onClick={() => insertMarkdown(action)}
                    title={action.label}
                    className="px-2 py-1 text-xs font-medium text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors min-w-[28px] text-center"
                >
                    {action.icon}
                </button>
            ))}
        </div>
    );
}
