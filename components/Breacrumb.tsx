'use client'
import {usePathname} from "next/navigation";
import {Slash} from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Fragment} from "react";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {doc} from "@firebase/firestore";
import {db} from "@/firebase";

function Breacrumb() {
    const pathName = usePathname();
    const segments = pathName.split("/");
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <Slash/>
                </BreadcrumbSeparator>
                {segments.map((segment, index) => {
                    if (!segment) return null;
                    const href = `/${segments.slice(0, index + 1).join("/")}`;
                    const isLast = index === segments.length - 1;
                    const [data] = useDocumentData(doc(db, "documents", segment))
                    return (
                        <Fragment key={segment}>
                            <BreadcrumbItem key={segment}>
                                {isLast ? (<BreadcrumbPage>{data?.title}</BreadcrumbPage>) :
                                    (
                                        <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>)}
                                {index < segments.length - 1 && (
                                    <BreadcrumbSeparator>
                                        <Slash/>
                                    </BreadcrumbSeparator>
                                )}

                            </BreadcrumbItem>
                        </Fragment>
                    );

                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default Breacrumb;