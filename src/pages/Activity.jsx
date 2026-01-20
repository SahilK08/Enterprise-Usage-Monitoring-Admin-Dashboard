import React, { useEffect, useState } from 'react';
import { Terminal, Clock, Filter, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { MockApi } from '../services/mockApi';
import clsx from 'clsx';

const LogIcon = ({ type }) => {
    switch (type) {
        case 'error': return <AlertCircle size={16} className="text-red-500" />;
        case 'warning': return <AlertCircle size={16} className="text-amber-500" />;
        case 'success': return <CheckCircle size={16} className="text-emerald-500" />;
        default: return <Info size={16} className="text-blue-500" />;
    }
};

const Activity = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching initial logs
        const fetchLogs = async () => {
            const data = await MockApi.getActivityLogs();
            setLogs(data);
            setLoading(false);
        };
        fetchLogs();

        // Simulate incoming stream
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const newLog = {
                    id: Date.now(),
                    message: `Auto-scaling trigger: CPU usage > ${(Math.random() * 20 + 70).toFixed(1)}%`,
                    type: Math.random() > 0.9 ? 'warning' : 'info',
                    timestamp: new Date().toLocaleTimeString()
                };
                setLogs(prev => [newLog, ...prev].slice(0, 50));
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white text-glow">Activity Logs</h2>
                    <p className="text-gray-400 mt-1">System events and audit trail</p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                        <Filter size={20} />
                    </button>
                    <button className="px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-white/10 rounded-lg text-sm font-mono text-gray-300 transition-colors flex items-center gap-2">
                        <Terminal size={14} />
                        Export Logs
                    </button>
                </div>
            </div>

            <div className="glass-panel p-1 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="bg-[#0c0c0c] p-4 border-b border-white/5 flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                    </div>
                    <span className="ml-4 text-xs font-mono text-gray-500">system-monitor-v2.log</span>
                </div>
                <div className="p-6 h-[600px] overflow-y-auto custom-scrollbar font-mono text-sm space-y-1">
                    {loading ? (
                        <div className="text-gray-500 animate-pulse">Initializing log stream...</div>
                    ) : (
                        logs.map((log) => (
                            <div key={log.id} className="flex gap-4 hover:bg-white/5 p-1 rounded transition-colors group">
                                <span className="text-gray-600 select-none min-w-[80px]">{log.timestamp}</span>
                                <div className="flex items-center gap-2 min-w-[30px]">
                                    <LogIcon type={log.type} />
                                </div>
                                <span className={clsx(
                                    "flex-1",
                                    log.type === 'error' && "text-red-400",
                                    log.type === 'warning' && "text-amber-400",
                                    log.type === 'info' && "text-gray-300",
                                    log.type === 'success' && "text-emerald-400"
                                )}>
                                    {log.message}
                                </span>
                            </div>
                        ))
                    )}
                    <div className="h-4 w-2 bg-primary/50 animate-pulse mt-2"></div>
                </div>
            </div>
        </div>
    );
};

export default Activity;
