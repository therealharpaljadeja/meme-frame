import {
    FrameButton,
    FrameContainer,
    FrameImage,
    FrameInput,
    FrameReducer,
    NextServerPageProps,
    getPreviousFrame,
    useFramesReducer,
    getFrameMessage,
} from "frames.js/next/server";
import Link from "next/link";
import { DEBUG_HUB_OPTIONS } from "./debug/constants";
import { getTokenUrl } from "frames.js";
import { BASE_URL } from "@/lib/constants";

type State = {
    active: string;
    total_button_presses: number;
};

const initialState = { active: "1", total_button_presses: 0 };

const reducer: FrameReducer<State> = (state, action) => {
    return {
        total_button_presses: state.total_button_presses + 1,
        active: action.postBody?.untrustedData.buttonIndex
            ? String(action.postBody?.untrustedData.buttonIndex)
            : "1",
    };
};

// This is a react server component only
export default async function Home({
    params,
    searchParams,
}: NextServerPageProps) {
    const previousFrame = getPreviousFrame<State>(searchParams);

    const frameMessage = await getFrameMessage(previousFrame.postBody, {
        ...DEBUG_HUB_OPTIONS,
    });

    if (frameMessage && !frameMessage?.isValid) {
        throw new Error("Invalid frame payload");
    }

    const [state, dispatch] = useFramesReducer<State>(
        reducer,
        initialState,
        previousFrame
    );

    // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
    // example: load the users credentials & check they have an NFT
    const baseUrl = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";

    // then, when done, return next frame
    return (
        <div className="p-4">
            frames.js starter kit. The Template Frame is on this page, it&apos;s
            in the html meta tags (inspect source).{" "}
            <Link href={`/debug?url=${baseUrl}`} className="underline">
                Debug
            </Link>
            <FrameContainer
                postUrl="/api/post_url"
                pathname="/api/post_url"
                state={state}
                previousFrame={previousFrame}
            >
                <FrameImage
                    aspectRatio="1:1"
                    src={`${BASE_URL}/template.png`}
                />
                <FrameInput text="TEXT 1" />
                <FrameButton>Submit</FrameButton>
            </FrameContainer>
        </div>
    );
}
