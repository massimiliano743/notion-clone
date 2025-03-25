'use client';
import {useMyPresence, useOthers} from "@liveblocks/react/suspense";
import {PointerEvent, useEffect} from "react";
import FollowPointer from "@/components/FollowPointer";

function LivecursorProvider({children}: { children: React.ReactNode }) {
    const [myPresence, updateMyPresence] = useMyPresence();
    const others = useOthers();

    useEffect(() => {
        if (myPresence) {
        }
    }, [myPresence]);

    function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
        const cursor = {x: Math.floor(e.clientX), y: Math.floor(e.clientY)};
        updateMyPresence({cursor});
    }

    function handlePointerLeave(e: PointerEvent<HTMLDivElement>) {
        void e;
        updateMyPresence({cursor: null});
    }

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >

            {others
                .filter((other) => other.presence?.cursor !== null)
                .map((other) => (
                    <FollowPointer
                        key={other.connectionId}
                        info={other.info}
                        x={other.presence.cursor!.x}
                        y={other.presence.cursor!.y}
                    />
                ))}
            {children}
        </div>
    );
}

export default LivecursorProvider;