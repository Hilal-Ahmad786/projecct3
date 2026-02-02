'use client';

import { useState } from 'react';
import { PlusIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQBuilderProps {
    label: string;
    items: FAQItem[];
    onChange: (items: FAQItem[]) => void;
}

export default function FAQBuilder({ label, items, onChange }: FAQBuilderProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const addItem = () => {
        onChange([...items, { question: '', answer: '' }]);
        setExpandedIndex(items.length);
    };

    const updateItem = (index: number, field: keyof FAQItem, value: string) => {
        const updated = [...items];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const removeItem = (index: number) => {
        onChange(items.filter((_, i) => i !== index));
        if (expandedIndex === index) setExpandedIndex(null);
    };

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div
                            className="flex items-center gap-2 px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => toggleExpand(index)}
                        >
                            <span className="text-xs font-medium text-gray-400 w-6">Q{index + 1}</span>
                            <span className="flex-1 text-sm font-medium text-gray-700 truncate">
                                {item.question || 'New question...'}
                            </span>
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); removeItem(index); }}
                                className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                            >
                                <TrashIcon className="w-4 h-4" />
                            </button>
                            {expandedIndex === index ? (
                                <ChevronUpIcon className="w-4 h-4 text-gray-400" />
                            ) : (
                                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                            )}
                        </div>
                        {expandedIndex === index && (
                            <div className="p-4 space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Question</label>
                                    <input
                                        type="text"
                                        value={item.question}
                                        onChange={(e) => updateItem(index, 'question', e.target.value)}
                                        placeholder="Enter the question..."
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Answer</label>
                                    <textarea
                                        value={item.answer}
                                        onChange={(e) => updateItem(index, 'answer', e.target.value)}
                                        placeholder="Enter the answer..."
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm resize-none"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={addItem}
                className="mt-2 flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
            >
                <PlusIcon className="w-4 h-4" />
                Add FAQ item
            </button>
        </div>
    );
}
