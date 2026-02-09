import Groq from "groq-sdk";
import { env } from '../../config/env.js';

export class GroqClient {
    constructor() {
        this.groq = new Groq({ apiKey: env.groqApiKey });
    }

    async getGroqChatCompletion(prompt) {
        return this.groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: env.groqModel,
        });
    }

    async getGroqChatCompletionSystem({ systemPrompt, contextPrompt, messages }) {
        return this.groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "system",
                    content: contextPrompt,
                },
                {
                    role: "user",
                    content: messages,
                }
            ],
            model: env.groqModel,
        });
    }
}
