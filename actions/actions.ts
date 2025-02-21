"use server";

import {auth} from "@clerk/nextjs/server";
import {adminDb} from "@/firebase-admin";

export async function CreateNewDocument() {
    const {sessionClaims} = await auth(); // Ensure authentication
    if (!sessionClaims?.email) {
        throw new Error("Unauthorized: No email found in session claims.");
    }

    const docsCollectionRef = adminDb.collection("documents");
    const docsRef = await docsCollectionRef.add({
        title: "newDocs",
        createdAt: new Date(),
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
