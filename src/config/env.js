import 'dotenv/config';

const isTest = process.env.NODE_ENV === 'test';

export const env = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT || 8080,
    groqApiKey: process.env.GROQ_API_KEY,
    groqModel: process.env.GROQ_MODEL,
    whatsappToken: process.env.WHATSAPP_TOKEN,
    whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    jwtSecret: process.env.JWT_SECRET,
    db: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: isTest ? 'node_app_test' : process.env.DB_NAME,
    },
};
