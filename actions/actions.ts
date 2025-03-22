"use server";

import {auth} from "@clerk/nextjs/server";
import {adminDb} from "@/firebase-admin";
import liveblocks from "@/lib/liveblock";

export async function CreateNewDocument() {
    const {sessionClaims} = await auth(); // Ensure authentication
    if (!sessionClaims?.email) {
        throw new Error("Unauthorized: No email found in session claims.");
    }

    const docsCollectionRef = adminDb.collection("documents");
    const docsRef = await docsCollectionRef.add({
        title: "newDocs",
        createdAt: Date.now(),
    });

    await adminDb
        .collection("users")
        .doc(sessionClaims.email)
        .collection("rooms")
        .doc(docsRef.id)
        .set({
            userId: sessionClaims.email,
            role: "owner",
            createdAt: new Date(),
            roomId: docsRef.id,
        });

    return {docID: docsRef.id};
}

export async function deleteDocument(roomId: string) {
    const {sessionClaims} = await auth(); // Ensure authentication
    if (!sessionClaims?.email) {
        throw new Error("Unauthorized: No email found in session claims.");
    }


    try {
        console.log("Deleting document with roomId:", roomId);
        await adminDb.collection("documents").doc(roomId).delete();

        const query = await adminDb
            .collectionGroup("rooms")
            .where("roomId", "==", roomId)
            .get();

        const batch = adminDb.batch();
        query.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        await liveblocks.deleteRoom(roomId);
        return {success: true};
    } catch (error) {
        console.log("errore " + error);
        return {success: false};
    }
}

export async function inviteUserToDocument(roomId: string, email: string) {
    const {sessionClaims} = await auth(); // Ensure authentication
    if (!sessionClaims?.email) {
        throw new Error("Unauthorized: No email found in session claims.");
    }


    try {
        console.log("invite users to :", roomId, email);
        await adminDb
            .collection("users")
            .doc(email)
            .collection("rooms")
            .doc(roomId)
            .set({
                userId: email,
                role: "editor",
                createdAt: new Date(),
                roomId,
            });

        return {success: true};
    } catch (error) {
        console.log("errore " + error);
        return {success: false};
    }
}

export async function removeUserFromDocument(roomId: string, email: string) {
    const {sessionClaims} = await auth(); // Ensure authentication
    if (!sessionClaims?.email) {
        throw new Error("Unauthorized: No email found in session claims.");
    }
    try {
        console.log("remove users to :", roomId, email);
        await adminDb
            .collection("users")
            .doc(email)
            .collection("rooms")
            .doc(roomId)
            .delete();

        return {success: true};

    } catch (error) {
        console.log("errore " + error);
        return {success: false};
    }


}

