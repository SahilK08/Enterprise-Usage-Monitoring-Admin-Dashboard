import React from 'react';
import { LayoutDashboard, Users, Activity, Settings, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const NavItem = ({ to, icon: Icon, children }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                isActive
                    ? "bg-primary-glow text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
            )
        }
    >
        <Icon size={20} className={clsx("transition-transform group-hover:scale-110")} />
        <span className="font-medium tracking-wide">{children}</span>
    </NavLink>
);

const Sidebar = () => {
    return (
        <aside className="w-64 h-screen fixed left-0 top-0 glass-panel flex flex-col border-r border-white/5 z-50">
            {/* Logo Area */}
            <div className="p-6 border-b border-white/5">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tighter">
                    MASTER<span className="text-white">ADMIN</span>
                </h1>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Enterprise Monitor</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <NavItem to="/" icon={LayoutDashboard}>Dashboard</NavItem>
                <NavItem to="/users" icon={Users}>Users</NavItem>
                <NavItem to="/activity" icon={Activity}>Usage & Logs</NavItem>
                <NavItem to="/settings" icon={Settings}>Settings</NavItem>
            </nav>

            {/* User Footer */}
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-transparent group-hover:ring-primary/50 transition-all">
                        AD
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <h4 className="text-sm font-semibold truncate text-white group-hover:text-primary transition-colors">Admin User</h4>
                        <p className="text-xs text-gray-400 truncate">admin@workplace.com</p>
                    </div>
                    <LogOut size={16} className="text-gray-500 group-hover:text-red-400 transition-colors" />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
