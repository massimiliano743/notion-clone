'use client'
import {Input} from "@/components/ui/input";
import {FormEvent, useEffect, useState, useTransition} from "react";
import {Button} from "@/components/ui/button";
import {doc, updateDoc} from "@firebase/firestore";
import {db} from "@/firebase";
import {useDocumentData} from "react-firebase-hooks/firestore";
import Editor from "@/components/ui/Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "@/components/DeleteDocument";
import InviteUser from "@/components/InviteUser";
import ManageUsers from "@/components/ManageUsers";
import Avatars from "@/components/Avatars";

function Document({id}: {
    id: string
}) {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id))
    const [input, setInput] = useState("");
    const [isUpdating, startTransition] = useTransition();

    const isOwner = useOwner();

    useEffect(() => {
        if (data) {
            setInput(data.title)
        }
    }, [data])

    const updateTitle = (e: FormEvent) => {
        e.preventDefault()
        if (input.trim()) {
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {
                    title: input
                })
            });
        }

    }
    return (
        <div className={"flex-1 h-full p-5 bg-white"}>
            <div className={"flex max-w-6xl mx-auto justify-between pb-5"}>
                <form onSubmit={updateTitle} className={"flex flex-1 space-x-2 "}>
                    <Input
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value)
                        }}
                    />
                    <Button type={"submit"} disabled={isUpdating}>{isUpdating ? "Updating..." : "Update"}</Button>

                    {isOwner && (
                        <>
                            <InviteUser/>
                            <DeleteDocument/>
                        </>
                    )}
                </form>
            </div>

            <div className={"flex m-w-6xl mx-auto justify-between items-center mb-5"}>
                <ManageUsers/>
                <Avatars/>

            </div>
            <hr className={"pb-10"}></hr>
            <Editor/>
        </div>
    );
}

export default Document;
