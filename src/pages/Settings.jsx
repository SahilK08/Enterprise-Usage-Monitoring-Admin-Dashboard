import React, { useState } from 'react';
import { Bell, Lock, Globe, Moon, Save } from 'lucide-react';
import clsx from 'clsx';

const Toggle = ({ enabled, onChange }) => (
    <button
        onClick={() => onChange(!enabled)}
        className={clsx(
            "w-12 h-6 rounded-full transition-colors relative",
            enabled ? "bg-primary" : "bg-white/10"
        )}
    >
        <div className={clsx(
            "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform shadow-md",
            enabled ? "translate-x-6" : "translate-x-0"
        )}></div>
    </button>
);

const SettingSection = ({ title, icon: Icon, children }) => (
    <div className="glass-panel p-6 rounded-2xl border border-white/5">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white/5 rounded-lg text-primary">
                <Icon size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <div className="space-y-6">
            {children}
        </div>
    </div>
);

const Settings = () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold text-white text-glow">System Settings</h2>
                <p className="text-gray-400 mt-1">Configure platform preferences</p>
            </div>

            <SettingSection title="Notifications" icon={Bell}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-gray-200">Email Alerts</p>
                        <p className="text-sm text-gray-500">Receive daily digest summaries</p>
                    </div>
                    <Toggle enabled={notifications} onChange={setNotifications} />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-gray-200">Real-time Push</p>
                        <p className="text-sm text-gray-500">Critical system alerts via websockets</p>
                    </div>
                    <Toggle enabled={true} onChange={() => { }} />
                </div>
            </SettingSection>

            <SettingSection title="Security" icon={Lock}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-gray-200">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Require 2FA for admin actions</p>
                    </div>
                    <Toggle enabled={twoFactor} onChange={setTwoFactor} />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-2">API Key (Read Only)</label>
                    <div className="flex gap-2">
                        <input disabled value="sk_test_51Mz..." className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-gray-500 font-mono text-sm" />
                        <button className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors">Regenerate</button>
                    </div>
                </div>
            </SettingSection>

            <div className="flex justify-end pt-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium shadow-lg shadow-primary/25 transition-all active:scale-95">
                    <Save size={18} />
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Settings;
