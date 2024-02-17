import { join } from "path";
import satori from "satori";
import fs from "fs";

export const generateMeme = async (texts: string[]) => {
    const fontPath = join(process.cwd(), "norwester.otf");
    let fontData = fs.readFileSync(fontPath);
    return await satori(
        <div
            style={{
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                backgroundImage: `url("https://i.imgflip.com/5c7lwq.png")`,
            }}
        >
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    flex: "1",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flex: "1",
                        justifyContent: "center",
                        alignItems: "flex-end",
                    }}
                >
                    <p
                        style={{
                            color: "white",
                            fontSize: "40px",
                        }}
                    >
                        {texts && texts[0] ? texts[0] : "TEXT 1"}
                    </p>
                </div>
                <div
                    style={{
                        display: "flex",
                        flex: "1",
                        justifyContent: "center",
                        alignItems: "flex-end",
                    }}
                >
                    <p
                        style={{
                            color: "white",
                            fontSize: "40px",
                        }}
                    >
                        {texts && texts[1] ? texts[1] : "TEXT 2"}
                    </p>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flex: 1,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        paddingRight: "100px",
                        flex: 1,
                    }}
                >
                    <p
                        style={{
                            color: "white",
                            fontSize: "40px",
                        }}
                    >
                        {texts && texts[2] ? texts[2] : "TEXT 3"}
                    </p>
                </div>
                <div style={{ display: "flex" }}></div>
            </div>
        </div>,
        {
            width: 750,
            height: 750,
            fonts: [
                {
                    data: fontData,
                    name: "Norwester",
                    style: "normal",
                    weight: 400,
                },
            ],
        }
    );
};
