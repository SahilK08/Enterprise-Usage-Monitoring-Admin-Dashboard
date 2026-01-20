import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Users, Server, AlertTriangle } from 'lucide-react';
import { MockApi } from '../services/mockApi';

const StatCard = ({ title, value, icon: Icon, color, loading }) => (
    <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-${color}`}>
            <Icon size={64} />
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 rounded-lg bg-${color}/10 text-${color}`}>
                    <Icon size={20} />
                </div>
                <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
            </div>
            {loading ? (
                <div className="h-8 w-24 bg-white/5 animate-pulse rounded"></div>
            ) : (
                <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
            )}
        </div>
    </div>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-panel p-3 rounded-lg border border-white/10 text-xs">
                <p className="text-gray-300 mb-1">{label}</p>
                <p className="text-primary font-bold">Calls: {payload[0].value}</p>
                <p className="text-red-400 font-bold">Errors: {payload[1].value}</p>
            </div>
        );
    }
    return null;
};

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await MockApi.getStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        };
        // Initial fetch
        fetchData();

        // Poll every 5 seconds
        const intervalId = setInterval(fetchData, 5000);

        // Cleanup on unmount
        return () => clearInterval(intervalId);    
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white text-glow">Dashboard</h2>
                    <p className="text-gray-400 mt-1">Real-time system overview</p>
                </div>
                <button className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 rounded-lg text-sm font-medium transition-all">
                    Generate Report
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total API Calls"
                    value={stats?.totalCalls.toLocaleString()}
                    icon={Server}
                    color="primary"
                    loading={loading}
                />
                <StatCard
                    title="Active Users"
                    value={stats?.activeUsers}
                    icon={Users}
                    color="accent"
                    loading={loading}
                />
                <StatCard
                    title="System Health"
                    value={`${stats?.healthScore}%`}
                    icon={Activity}
                    color="purple-500" // using tailwind default color for now
                    loading={loading}
                />
            </div>

            {/* Main Chart Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl h-[400px]">
                    <h3 className="text-lg font-semibold text-white mb-6">Usage Trends (7 Days)</h3>
                    {loading ? (
                        <div className="h-full flex items-center justify-center text-gray-500">Loading Chart Data...</div>
                    ) : (
                        <ResponsiveContainer width="100%" height="85%">
                            <AreaChart data={stats?.trends}>
                                <defs>
                                    <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorErrors" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
                                <Area type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCalls)" />
                                <Area type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorErrors)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Live Logs / Alerts */}
                <div className="glass-panel p-6 rounded-2xl h-[400px] overflow-hidden flex flex-col">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-amber-400" />
                        Recent Alerts
                    </h3>
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                        {/* Simulating some static logs for now, connected to dynamic later */}
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="flex gap-3 text-sm p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <span className="text-xs font-mono text-gray-500 mt-1">10:42:{10 + i}</span>
                                <div>
                                    <p className="text-gray-200">High latency detected on <span className="text-accent font-mono">us-east-1</span></p>
                                    <p className="text-xs text-amber-500 mt-1">WARN_LATENCY_SPIKE</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
