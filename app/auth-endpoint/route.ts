import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import liveblock from "@/lib/liveblock";
import {adminDb} from "@/firebase-admin";

export async function POST(req: NextRequest) {
    auth.protect();
    const {sessionClaims} = await auth();
    const {room} = await req.json();

    if (!sessionClaims?.email || !sessionClaims?.fullName || !sessionClaims?.image) {
        throw new Error("Some required user information is missing");
    }

    const session = liveblock.prepareSession(sessionClaims.email, {
        userInfo: {
            name: sessionClaims.fullName,
            email: sessionClaims.email,
            avatar: sessionClaims.image
        },
    });
    const usersInRoom = await adminDb.collectionGroup("rooms")
        .where("userId", "==", sessionClaims?.email)
        .get();

    const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);
    if (userInRoom?.exists) {
        session.allow(room, session.FULL_ACCESS);
        const {body, status} = await session.authorize();
        return new Response(body, {status})
    } else {
        return NextResponse.json(
            {messagge: "You are not in this room"},
            {status: 403}
        )
    }
}