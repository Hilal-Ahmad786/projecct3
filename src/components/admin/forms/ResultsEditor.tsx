'use client';

import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ResultItem {
    metric: string;
    value: string;
}

interface ResultsEditorProps {
    label: string;
    items: ResultItem[];
    onChange: (items: ResultItem[]) => void;
}

export default function ResultsEditor({ label, items, onChange }: ResultsEditorProps) {
    const addItem = () => {
        onChange([...items, { metric: '', value: '' }]);
    };

    const updateItem = (index: number, field: keyof ResultItem, value: string) => {
        const updated = [...items];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const removeItem = (index: number) => {
        onChange(items.filter((_, i) => i !== index));
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="space-y-2">
                {items.length > 0 && (
                    <div className="grid grid-cols-[1fr_1fr_40px] gap-2 text-xs font-medium text-gray-500 px-1">
                        <span>Metric</span>
                        <span>Value</span>
                        <span></span>
                    </div>
                )}
                {items.map((item, index) => (
                    <div key={index} className="grid grid-cols-[1fr_1fr_40px] gap-2 items-center">
                        <input
                            type="text"
                            value={item.metric}
                            onChange={(e) => updateItem(index, 'metric', e.target.value)}
                            placeholder="e.g., Revenue Increase"
                            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                        />
                        <input
                            type="text"
                            value={item.value}
                            onChange={(e) => updateItem(index, 'value', e.target.value)}
                            placeholder="e.g., 250%"
                            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
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
            <button
                type="button"
                onClick={addItem}
                className="mt-2 flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
            >
                <PlusIcon className="w-4 h-4" />
                Add result
            </button>
        </div>
    );
}
