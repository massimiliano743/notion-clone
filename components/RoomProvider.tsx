'use client'
import {
    ClientSideSuspense,
    RoomProvider as RoomProviderWrapper,
} from "@liveblocks/react/suspense";
import LoadingSpinner from "@/components/loadingSpinner";
import LivecursorProvider from "@/components/LivecursorProvider";

function RoomProvider({roomId, children}: { roomId: string, children: React.ReactNode }) {
    return (
        <RoomProviderWrapper
            id={roomId}
            initialPresence={{
                cursor: null
            }}
        >
            <ClientSideSuspense fallback={<LoadingSpinner/>}>
                <LivecursorProvider>
                    {children}
                </LivecursorProvider>
            </ClientSideSuspense>
        </RoomProviderWrapper>
    );
}

export default RoomProvider;