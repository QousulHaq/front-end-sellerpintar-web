import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="admin-layout-container flex flex-row justify-between items-start">
            <Sidebar />
            <main className="flex-1">
                <Topbar />
                <div className="main-content-container p-6 bg-gray-100 ">
                    {children}
                </div>
            </main>
        </div>
    );
}
