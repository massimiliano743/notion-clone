import {motion} from "framer-motion";
import stringToColour from "@/lib/stringToColour";

function FollowPointer({x, y, info}: {
    x: number,
    y: number,
    info: {
        name: string,
        email: string,
        avatar: string
    }
}) {
    const color = stringToColour(info.email || '1')
    return (
        <motion.div className={"h-4 w-4 rounded-full absolute z-50"}
                    style={{
                        top: y,
                        left: x,
                        pointerEvents: "none"
                    }}
                    initial={{
                        scale: 1,
                        opacity: 1
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1
                    }}
                    exit={{
                        scale: 0,
                        opacity: 0
                    }}>
            <svg
                stroke={color} fill={color}
                strokeWidth="1"
                /*className={`h-6 w-6 text-[${color}] transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-[${color}]`}*/
                width="16px"
                height="16px"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M17.09 1.853a4.999 4.999 0 0 0-5.276 5.596l7.557 81.087c.483 3.938 5.137 5.773 8.176 3.223l15.947-12.932l7.15 12.385c4.112 7.122 10.636 8.872 17.758 4.76s8.87-10.638 4.758-17.76l-7.125-12.34l18.896-7.244c3.728-1.357 4.467-6.306 1.3-8.693L19.784 2.847a4.995 4.995 0 0 0-2.695-.994z"
                    fill={color}></path>
            </svg>
            <motion.div
                style={{
                    background: color
                }}
                initial={{
                    scale: 0.5,
                    opacity: 0
                }}
                animate={{
                    scale: 1,
                    opacity: 1
                }}
                exit={{
                    scale: 0.5,
                    opacity: 0
                }}
                className={"px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full"}>
                {info?.name || info?.email}
            </motion.div>
        </motion.div>
    );
}

export default FollowPointer;