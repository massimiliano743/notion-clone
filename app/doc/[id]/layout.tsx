import {auth} from "@clerk/nextjs/server";
import {ReactNode} from "react";
import RoomProvider from "@/components/RoomProvider";

async function DocLayout({
                             children,
                             params: {id},
                         }: {
    children: ReactNode;
    params: { id: string };
}) {
    await auth();

    return (
        <RoomProvider roomId={id}>
            {children}
        </RoomProvider>
    );
}

export default DocLayout;