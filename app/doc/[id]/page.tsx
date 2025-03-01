'use client'
import Document from "@/components/Document"
import {use} from "react"

function DocumentPage({params}: {
    params: Promise<{ id: string }> | { id: string }
}) {
    const resolvedParams = use(params as Promise<{ id: string }>)

    return (
        <div className="flex flex-col flex-1 min-h-screen">
            <Document id={resolvedParams.id}/>
        </div>
    )
}

export default DocumentPage