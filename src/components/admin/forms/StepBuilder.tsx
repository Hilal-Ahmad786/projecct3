'use client';

import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Step {
    title: string;
    description: string;
}

interface StepBuilderProps {
    label: string;
    steps: Step[];
    onChange: (steps: Step[]) => void;
}

export default function StepBuilder({ label, steps, onChange }: StepBuilderProps) {
    const addStep = () => {
        onChange([...steps, { title: '', description: '' }]);
    };

    const updateStep = (index: number, field: keyof Step, value: string) => {
        const updated = [...steps];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const removeStep = (index: number) => {
        onChange(steps.filter((_, i) => i !== index));
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="space-y-3">
                {steps.map((step, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold shrink-0 mt-1">
                                {index + 1}
                            </div>
                            <div className="flex-1 space-y-2">
                                <input
                                    type="text"
                                    value={step.title}
                                    onChange={(e) => updateStep(index, 'title', e.target.value)}
                                    placeholder="Step title..."
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm font-medium"
                                />
                                <textarea
                                    value={step.description}
                                    onChange={(e) => updateStep(index, 'description', e.target.value)}
                                    placeholder="Step description..."
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm resize-none"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeStep(index)}
                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                            >
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={addStep}
                className="mt-2 flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
            >
                <PlusIcon className="w-4 h-4" />
                Add step
            </button>
        </div>
    );
}
