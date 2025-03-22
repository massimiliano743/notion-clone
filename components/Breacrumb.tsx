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
import {Fragment, useEffect, useState} from "react";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {doc} from "@firebase/firestore";
import {db} from "@/firebase";

function BreadcrumbComponent() {
    const pathName = usePathname();
    const segments = pathName.split("/").filter(Boolean);

    const [docsData, setDocsData] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        const fetchData = async () => {
            const newDocsData: { [key: string]: any } = {};

            await Promise.all(
                segments.map(async (segment) => {
                    const ref = doc(db, "documents", segment);
                    const [data] = await useDocumentData(ref);
                    newDocsData[segment] = data;
                })
            );

            setDocsData(newDocsData);
        };

        fetchData();
    }, [segments]);

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
                    const data = docsData[segment];

                    return (
                        <Fragment key={segment}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{data?.title || segment}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={href}>{data?.title || segment}</BreadcrumbLink>
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

export default BreadcrumbComponent;
