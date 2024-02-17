import { generateMeme } from "@/lib/image/generateMeme";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const texts = searchParams.get("texts");

    if (texts) {
        let allURIComponents = decodeURIComponent(texts);

        let textsRaw = allURIComponents.replace(".png", "");

        let svg = await generateMeme(JSON.parse(textsRaw));

        const pngBuffer = await sharp(Buffer.from(svg))
            .toFormat("png")
            .toBuffer();

        return new NextResponse(pngBuffer, {
            headers: {
                "Content-Type": "image/png",
                "Cache-Control": "max-age=1",
            },
        });
    }

    return new NextResponse(JSON.stringify({ status: "notok" }), {
        status: 400,
    });
}
