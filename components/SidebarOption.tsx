'usc client'
import React from 'react';
import Link from "next/link";
import {doc} from "@firebase/firestore";
import {db} from "@/firebase";
import {usePathname} from "next/navigation";
import {useDocumentData} from "react-firebase-hooks/firestore";

function SidebarOption({href, id}: {
    href: string,
    id: string
}) {
    const [data] = useDocumentData(doc(db, "documents", id))
    const pathName = usePathname();
    const isActive = href.includes(pathName) && pathName !== "/";

    if (!data) return null;

    return (
        <Link href={href} className={` border p-2 rounded-md 
        ${isActive ? "bg-gray-300 font-bold border-black" : "border-gray-400"}`}>
            <p className={"truncate"}>{data?.title}</p>
        </Link>
    );
}

export default SidebarOption;