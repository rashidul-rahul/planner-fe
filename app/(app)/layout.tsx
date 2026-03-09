import { AppSidebar } from "@/components/layout/AppSidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-background">
            <AppSidebar />
            <div className="flex-1 ml-60 min-h-screen">{children}</div>
        </div>
    );
}
