'use client';

import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ArrayEditorProps {
    label: string;
    items: string[];
    onChange: (items: string[]) => void;
    placeholder?: string;
    maxItems?: number;
}

export default function ArrayEditor({ label, items, onChange, placeholder = 'Enter item...', maxItems }: ArrayEditorProps) {
    const addItem = () => {
        if (maxItems && items.length >= maxItems) return;
        onChange([...items, '']);
    };

    const updateItem = (index: number, value: string) => {
        const updated = [...items];
        updated[index] = value;
        onChange(updated);
    };

    const removeItem = (index: number) => {
        onChange(items.filter((_, i) => i !== index));
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => updateItem(index, e.target.value)}
                            placeholder={placeholder}
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
            {(!maxItems || items.length < maxItems) && (
                <button
                    type="button"
                    onClick={addItem}
                    className="mt-2 flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    Add item
                </button>
            )}
            {items.length === 0 && (
                <p className="mt-1 text-xs text-gray-400">No items yet. Click &quot;Add item&quot; to get started.</p>
            )}
        </div>
    );
}
