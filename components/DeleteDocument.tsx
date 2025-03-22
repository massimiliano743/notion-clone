import {Button} from "./ui/button";

'use client '
import React, {useTransition} from 'react';

import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {usePathname, useRouter} from "next/navigation";
import {deleteDocument} from "@/actions/actions";
import {toast} from "sonner";

function DeleteDocument() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const router = useRouter();
    const handleDelete = async () => {
        const roomId: string = pathname.split("/").pop();
        console.log("room id", roomId);
        if (!roomId) return;
        startTransition(async () => {
            const success = await deleteDocument(roomId);
            if (success) {
                setIsOpen(false);
                router.replace("/");
                toast.success("Room deleted successfully")
            } else {
                toast.error("Failed to delete room")
            }
        })
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant="destructive">
                <DialogTrigger>Delete</DialogTrigger>
            </Button>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This will permanently delete the document and removing all user from the document. This action
                        cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className={"sm:justify-end gap-2"}>
                    <Button type="submit"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isPending}>
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                    <DialogClose asChild>
                        <Button type={"button"} variant={"secondary"}>Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}

export default DeleteDocument;