import { Configuration, OpenAIApi } from "openai";
import { OPEN_AI_KEY } from "../env.js";

const openai = new OpenAIApi(
    new Configuration({
        apiKey: OPEN_AI_KEY,
    })
);

export const bodyAPI = {
    prompt: { type: "string", example: "Polar bear on ice skates" },
    size: {
        type: "string",
        enum: ["small", "medium", "large"],
        example: "medium",
        default: "large",
    },
};

export const generateImage = async (req, res) => {
    const { prompt, size } = req.body;

    const iSize =
        size === "small"
            ? "256x256"
            : size === "medium"
            ? "512x512"
            : "1024x1024";

    try {
        const rs = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: iSize,
        });
        const imageUrl = rs.data.data[0].url;
        res.status(200);
        return res.json({
            success: true,
            data: imageUrl,
        });
    } catch (e) {
        if (e.response) {
            console.log(e.response.status);
            console.log(e.response.data);
        } else {
            console.log(e.message);
        }
        res.status(400);
        return res.json({
            success: false,
            data: "The image could not be generated",
        });
    }
};
