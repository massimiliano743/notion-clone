'use client'
import {usePathname} from "next/navigation";
import {Slash} from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {Fragment} from "react";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {doc} from "@firebase/firestore";
import {db} from "@/firebase";

function Breacrumb() {
    const pathName = usePathname();
    const segments = pathName.split("/").filter(Boolean);

    // 1. Ottieni i dati per ogni segmento con Hook separati
    const [segment1] = useDocumentData(doc(db, "documents", segments[0] || "dummy"));
    const [segment2] = useDocumentData(doc(db, "documents", segments[1] || "dummy"));
    const [segment3] = useDocumentData(doc(db, "documents", segments[2] || "dummy"));
    const [segment4] = useDocumentData(doc(db, "documents", segments[3] || "dummy"));
    const [segment5] = useDocumentData(doc(db, "documents", segments[4] || "dummy"));

    // 2. Mappa i dati ai segmenti
    const segmentData = {
        [segments[0]]: segment1,
        [segments[1]]: segment2,
        [segments[2]]: segment3,
        [segments[3]]: segment4,
        [segments[4]]: segment5,
    };

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
                    const href = `/${segments.slice(0, index + 1).join("/")}`;
                    const isLast = index === segments.length - 1;
                    const data = segmentData[segment];
                    return (
                        <Fragment key={segment}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{data?.title || segment}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                                )}
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