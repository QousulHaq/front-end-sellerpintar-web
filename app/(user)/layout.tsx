import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen md:min-h-auto">
                {children}
            </main>
            <Footer />
        </>
    );
}
