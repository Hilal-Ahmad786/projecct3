'use client';

import { ReactNode } from 'react';
import { XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface Tab {
    id: string;
    label: string;
    icon?: ReactNode;
}

interface TabbedModalProps {
    title: string;
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tab: string) => void;
    onClose: () => void;
    onSave: () => void;
    isSaving: boolean;
    saveDisabled?: boolean;
    saveLabel?: string;
    footer?: ReactNode;
    children: ReactNode;
}

export default function TabbedModal({
    title,
    tabs,
    activeTab,
    onTabChange,
    onClose,
    onSave,
    isSaving,
    saveDisabled,
    saveLabel = 'Save',
    footer,
    children,
}: TabbedModalProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-xl flex flex-col">
                {/* Sticky Header */}
                <div className="shrink-0 border-b border-gray-200">
                    <div className="px-6 py-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>
                    {/* Tabs */}
                    <div className="flex overflow-x-auto px-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                                    activeTab === tab.id
                                        ? 'border-emerald-500 text-emerald-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {children}
                </div>

                {/* Sticky Footer */}
                <div className="shrink-0 px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-500">{footer}</div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onSave}
                            disabled={saveDisabled || isSaving}
                            className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSaving && <ArrowPathIcon className="w-4 h-4 animate-spin" />}
                            {isSaving ? 'Saving...' : saveLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
