import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-dark-900 text-white selection:bg-primary selection:text-white">
            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] opacity-30"></div>
            </div>

            <Sidebar />

            <main className="ml-64 min-h-screen relative z-10 transition-all duration-300">
                <div className="p-8 max-w-7xl mx-auto">
                    {/* Header Area (Optional, consistent wrapper) */}
                    <header className="mb-8 flex justify-between items-center">
                        <div>
                            {/* Breadcrumbs or Page Interaction could go here */}
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#10b981]"></span>
                            <span className="text-xs font-mono text-accent">SYSTEM: ONLINE</span>
                        </div>
                    </header>

                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
