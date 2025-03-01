import LiveBlockProvider from "@/components/liveBlockProvider";

function PageLayout({children}: { children: React.ReactNode }) {
    return (
        <LiveBlockProvider>{children}</LiveBlockProvider>
    );
}

export default PageLayout;