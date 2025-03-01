import {Liveblocks} from "@liveblocks/node";

const key = process.env.NEXT_PRIVATE_LIVE_BLOCK_KEY;

if (!key) {
    throw new Error("NEXT_PRIVATE_LIVE_BLOCK_KEY is not defined");
}
const liveblocks = new Liveblocks({
    secret: key
})

export default liveblocks;
