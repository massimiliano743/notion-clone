'use client'
import Document from "@/components/Document"
import {use} from "react"

async function resolveParams(paramsPromise: Promise<{ id: string }>) {
    return await paramsPromise
}

function DocumentPage(props: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(resolveParams(props.params))

    return (
        <div className="flex flex-col flex-1 min-h-screen">
            <Document id={resolvedParams.id}/>
        </div>
    )
}

export default DocumentPage