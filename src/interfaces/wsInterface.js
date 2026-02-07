import { MessageRepository } from "../repositories/message.repository.js";

export class WsInterface {

    static instance = null;

    messageRepository = null;

    constructor() {
        this.messageRepository = new MessageRepository();
    }

    getInstance() {
        throw new Error('getInstance() must be implemented (Singleton)');
    }

    sendMessage({ to, message }) {
        throw new Error('sendMessage() must be implemented');
    }

    saveMessageLogByCelular({ celular, content, sender }) {
        this.messageRepository.createMessageLogByCelular({ celular, content, sender });
    }
}