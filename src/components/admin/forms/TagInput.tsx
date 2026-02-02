'use client';

import { useState, KeyboardEvent } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface TagInputProps {
    label: string;
    tags: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    suggestions?: string[];
}

export default function TagInput({ label, tags, onChange, placeholder = 'Type and press Enter...', suggestions }: TagInputProps) {
    const [input, setInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const addTag = (tag: string) => {
        const trimmed = tag.trim();
        if (trimmed && !tags.includes(trimmed)) {
            onChange([...tags, trimmed]);
        }
        setInput('');
        setShowSuggestions(false);
    };

    const removeTag = (index: number) => {
        onChange(tags.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
            e.preventDefault();
            addTag(input);
        } else if (e.key === 'Backspace' && !input && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    };

    const filteredSuggestions = suggestions?.filter(
        s => s.toLowerCase().includes(input.toLowerCase()) && !tags.includes(s)
    );

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="border border-gray-200 rounded-lg p-2 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent">
                <div className="flex flex-wrap gap-1.5 mb-1">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md text-sm"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(index)}
                                className="text-emerald-400 hover:text-emerald-700 transition-colors"
                            >
                                <XMarkIcon className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    ))}
                </div>
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                        placeholder={tags.length === 0 ? placeholder : 'Add more...'}
                        className="w-full px-1 py-1 text-sm border-none focus:ring-0 focus:outline-none"
                    />
                    {showSuggestions && filteredSuggestions && filteredSuggestions.length > 0 && input && (
                        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                            {filteredSuggestions.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => addTag(suggestion)}
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <p className="mt-1 text-xs text-gray-400">Press Enter or comma to add a tag</p>
        </div>
    );
}
