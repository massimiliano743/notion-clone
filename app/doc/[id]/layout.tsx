import {auth} from "@clerk/nextjs/server";
import {ReactNode} from "react";
import RoomProvider from "@/components/RoomProvider";

async function DocLayout(
    props: {
        children: ReactNode;
        params: Promise<{ id: string }>;
    }
) {
    const params = await props.params;

    const {
        id
    } = params;

    const {
        children
    } = props;

    await auth();

    return (
        <RoomProvider roomId={id}>
            {children}
        </RoomProvider>
    );
}

export default DocLayout;