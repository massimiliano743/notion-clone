'use client'

import React from 'react';
import {Button} from "@/components/ui/button";
import {useTransition} from "react";
import {useRouter} from "next/navigation";
import {CreateNewDocument} from "@/actions/actions";

function NewDocumentButton() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const handleCreateNewDocument = (): void => {
        startTransition(async () => {
            const {docID} = await CreateNewDocument();
            router.push(`/doc/${docID}`);
        });
    };
    return (
        <div><Button onClick={handleCreateNewDocument}
                     disabled={isPending}>{isPending ? "Creating..." : "New Document"}</Button></div>
    );
}

export default NewDocumentButton;