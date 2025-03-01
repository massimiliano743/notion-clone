'use client'
import {useRoom} from "@liveblocks/react/suspense";
import * as Y from "yjs";
import {useEffect, useState} from "react";
import {LiveblocksYjsProvider} from "@liveblocks/yjs";
import {Button} from "./button"
import {MoonIcon, SunIcon} from "lucide-react";
import {BlockNoteView} from "@blocknote/shadcn";
import {BlockNoteEditor} from "@blocknote/core";
import {useCreateBlockNote} from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";


import stringToColour from "@/lib/stringToColour";
import {useSelf} from "@liveblocks/react";

type EditorProps = {
    doc: Y.Doc;
    provider: LiveblocksYjsProvider;
    darkMode: boolean;
}

function BlockNote({doc, provider, darkMode}: EditorProps) {
    const userInfo = useSelf((me) => me.info);
    const editor: BlockNoteEditor = useCreateBlockNote({
        collaboration: {
            provider,
            fragment: doc.getXmlFragment("document-store"),
            user: {
                name: userInfo?.name || "",
                color: stringToColour(userInfo?.email || "")
            },
        }
    });
    return (
        <div className={"relative max-w-6xl mx-auto"}>
            <BlockNoteView
                className={"min-h-screen"}
                editor={editor}
                theme={!darkMode ? "light" : "dark"}
            />
        </div>
    )
}

function Editor() {
    const rooms = useRoom();
    const [doc, setDoc] = useState<Y.Doc>();
    const [provider, setProvider] = useState<LiveblocksYjsProvider>();
    const [darkmode, setDarkMode] = useState(false);

    useEffect(() => {
        const yDoc = new Y.Doc();
        const provider = new LiveblocksYjsProvider(rooms, yDoc);
        setDoc(yDoc);
        setProvider(provider);
        return () => {
            provider.destroy();
            yDoc.destroy();
        }
    }, [rooms]);

    const style = ` hover:text-white
    ${darkmode ?
        "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700" :
        "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"}`;

    if (!doc || !provider) {
        return null; // o un componente di loading
    }

    return (
        <div className={"max-w-6xl mx-auto"}>
            <div className={"flex items-center gap-2 justify-end mb-10"}>
                <Button className={style} onClick={() => setDarkMode(!darkmode)}>
                    {darkmode ? <SunIcon/> : <MoonIcon/>}
                </Button>
            </div>
            <BlockNote doc={doc} provider={provider} darkMode={darkmode}/>
        </div>
    );
}

export default Editor;