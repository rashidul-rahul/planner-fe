import { TopNavbar } from "@/components/layout/TopNavbar";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Settings } from "lucide-react";

export default function SettingsPage() {
    return (
        <>
            <TopNavbar title="Settings" />
            <main className="pt-16 px-6 py-7 max-w-[1400px]">
                <SectionHeader title="Settings" subtitle="Manage your preferences and account" />
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                        <Settings className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-base font-600 text-slate-600 mb-1" style={{ fontWeight: 600 }}>Settings coming soon</h3>
                    <p className="text-sm text-slate-400">Profile, theme, and notification settings will appear here.</p>
                </div>
            </main>
        </>
    );
}
