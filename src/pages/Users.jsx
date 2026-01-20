import React, { useEffect, useState } from 'react';
import { Search, Plus, MoreVertical, Trash2, Edit } from 'lucide-react';
import { MockApi } from '../services/mockApi';
import clsx from 'clsx';

const RoleBadge = ({ role }) => {
    const styles = {
        Admin: "bg-purple-500/20 text-purple-400 border-purple-500/50",
        Editor: "bg-blue-500/20 text-blue-400 border-blue-500/50",
        Viewer: "bg-gray-500/20 text-gray-400 border-gray-500/50",
    };
    return (
        <span className={clsx("px-3 py-1 rounded-full text-xs font-medium border", styles[role] || styles.Viewer)}>
            {role}
        </span>
    );
};

const StatusBadge = ({ status }) => {
    const styles = {
        Active: "bg-emerald-500/20 text-emerald-400",
        Inactive: "bg-red-500/20 text-red-400",
        Pending: "bg-amber-500/20 text-amber-400",
    };
    return (
        <span className={clsx("flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium w-fit", styles[status])}>
            <span className={clsx("w-1.5 h-1.5 rounded-full animate-pulse", status === 'Active' ? 'bg-emerald-400' : status === 'Inactive' ? 'bg-red-400' : 'bg-amber-400')}></span>
            {status}
        </span>
    );
};

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await MockApi.getUsers();
                setUsers(data);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white text-glow">User Management</h2>
                    <p className="text-gray-400 mt-1">Manage system access and permissions</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full glass-panel pl-10 pr-4 py-2.5 rounded-xl bg-dark-800/50 border-white/10 focus:border-primary/50 outline-none text-sm transition-all text-white placeholder:text-gray-500"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-primary/20">
                        <Plus size={18} />
                        <span className="hidden sm:inline">Add User</span>
                    </button>
                </div>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                                <th className="p-4 font-medium">User</th>
                                <th className="p-4 font-medium">Role</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Last Active</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                // Loading Skeletons
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}>
                                        <td className="p-4"><div className="h-10 w-32 bg-white/5 rounded animate-pulse"></div></td>
                                        <td className="p-4"><div className="h-6 w-16 bg-white/5 rounded animate-pulse"></div></td>
                                        <td className="p-4"><div className="h-6 w-20 bg-white/5 rounded animate-pulse"></div></td>
                                        <td className="p-4"><div className="h-4 w-24 bg-white/5 rounded animate-pulse"></div></td>
                                        <td className="p-4 text-right"><div className="h-8 w-8 bg-white/5 rounded-full inline-block animate-pulse"></div></td>
                                    </tr>
                                ))
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="group hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-white/10" />
                                                <div>
                                                    <p className="font-semibold text-white">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <RoleBadge role={user.role} />
                                        </td>
                                        <td className="p-4">
                                            <StatusBadge status={user.status} />
                                        </td>
                                        <td className="p-4 text-sm text-gray-400">
                                            {new Date(user.lastActive).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                                                    <Edit size={16} />
                                                </button>
                                                <button className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {!loading && filteredUsers.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        No users found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
