'use client';

interface Lead {
    id: string;
    name: string;
    email: string;
    subject: string;
    status: 'new' | 'contacted' | 'qualified' | 'closed';
    date: string;
}

const mockLeads: Lead[] = [
    { id: '1', name: 'John Smith', email: 'john@example.com', subject: 'Web Development', status: 'new', date: '2024-01-15' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@company.com', subject: 'AI Solutions', status: 'contacted', date: '2024-01-14' },
    { id: '3', name: 'Michael Chen', email: 'michael@startup.io', subject: 'Mobile App', status: 'qualified', date: '2024-01-13' },
    { id: '4', name: 'Emma Wilson', email: 'emma@business.co', subject: 'E-commerce', status: 'new', date: '2024-01-12' },
    { id: '5', name: 'David Brown', email: 'david@corp.com', subject: 'Automation', status: 'closed', date: '2024-01-11' },
];

const statusColors = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    qualified: 'bg-emerald-100 text-emerald-700',
    closed: 'bg-gray-100 text-gray-700',
};

export default function RecentLeadsTable() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {mockLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                                        <div className="text-sm text-gray-500">{lead.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.subject}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[lead.status]}`}>
                                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
