import { WhatsAppClient } from '../infra/http/ws.client.js';
import { BaileysClient } from '../infra/baileys/baileys.client.js';
import { GroqClient } from '../infra/http/groq.client.js';
import { PersonasRepository } from '../repositories/personas.repository.js';
import { MessageRepository } from '../repositories/message.repository.js';
import { AgendasRepository } from '../repositories/agendas.repository.js';
import { buildPrompTerminosYCondiciones } from '../promps/buildPrompTerminosYCondiciones.js';
import { buildPrompRegistroUsuario } from '../promps/buildPrompRegistroUsuario.js';
import { PersonaService } from './persona.service.js';
import { buildPrompAsistente } from '../promps/buildPrompAsistente.js';
import { prisma } from '../config/prisma.js';

export class MessageService {
  constructor() {
    this.whatsAppClient = new WhatsAppClient();
    this.groqClient = new GroqClient();
    this.personasRepository = new PersonasRepository();
    this.messageRepository = new MessageRepository();
    this.baileysClient = BaileysClient.getInstance();
    this.personaService = new PersonaService();
    this.agendasRepository = new AgendasRepository();
  }

  async sendPersonMessage_old({ cell, message }) {
    return await this.whatsAppClient.sendTextMessage({
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
      to: cell,
      body: message,
    });
  }

  async sendPersonMessage({ cell, message }) {
    return await this.baileysClient.sendMessage(cell, message);
  }

  async sendTemplateMessage({ cell, templateName, language }) {
    return await this.whatsAppClient.sendTemplateMessage({
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
      to: cell,
      templateName,
      language,
    });
  }

  async processMessage(cell, message) {
    const persona = await this.personasRepository.findByCell(cell);
    if (!persona) { return this.sendFirstPersonMessage({ cell, message }); }

    if (!persona.aceptoTyC) {
      return this.processMessageTyC(cell, message, persona);
    }

    if (!persona.registrado) {
      return this.processMessageRegistro(cell, message, persona);
    }

    if (persona.registrado && persona.aceptoTyC) {
      return this.processMessageAsistente(cell, message, persona);
    }



  }


  async processMessageTyC(cell, message, persona) {
    const mensajeEnviado = await this.messageRepository.finLastMessageLogByPersonaId(persona.id);
    const promp = buildPrompTerminosYCondiciones(mensajeEnviado.content, message);
    const response = await this.groqClient.getGroqChatCompletion(promp);
    const json = JSON.parse(response.choices[0].message.content);
    console.log(json.tarea);
    switch (json.tarea) {
      case 'aceptaTerminosYCondiciones':
        await this.personasRepository.updateAceptoTyC(persona.id, true);
        await this.sendPersonMessage({ cell, message: json.mensaje });
        break;
      case 'noAceptaTerminosYCondiciones':
        await this.personasRepository.deletePerson(persona.id);
        await this.sendPersonMessage({ cell, message: json.mensaje });
        break;
      case 'dudasACeptandoTerminosYCondiciones':
        await this.sendPersonMessage({ cell, message: json.mensaje });
        break;
      case 'sinSentidoPractico':
        await this.sendPersonMessage({ cell, message: json.mensaje });
        break;
    }
  }

  async processMessageRegistro(cell, message, persona) {
    const personaData = { nombre: persona.nombre, horarioLaboral: persona.horarioLaboral };
    const mensajeEnviado = await this.messageRepository.finLastMessageLogByPersonaId(persona.id);
    const promp = buildPrompRegistroUsuario(mensajeEnviado.content, message, personaData);
    const response = await this.groqClient.getGroqChatCompletion(promp);



    const json = JSON.parse(response.choices[0].message.content);
    console.log(json.jsonData);
    if (json.jsonData.nombre) {
      await this.personasRepository.updateNombre(persona.id, json.jsonData.nombre);
    }
    if (json.jsonData.horarioLaboral) {
      await this.personasRepository.updateHorarioLaboral(persona.id, json.jsonData.horarioLaboral);
    }

    switch (json.tarea) {
      case 'registroUsuario':
        await this.sendPersonMessage({ cell, message: json.mensaje });
        break;
      case 'registroUsuarioFinalizado':
        await this.personasRepository.updateRegistrado(persona.id, true);
        await this.sendPersonMessage({ cell, message: json.mensaje });
        break;

    }
  }

  async processMessageAsistente(cell, message, persona) {
    const mensajeEnviado = await this.messageRepository.finLastMessageLogByPersonaId(persona.id);
    const promp = buildPrompAsistente({ mensajeEnviado: mensajeEnviado.content, mensajeUsuario: message, horarioLaboral: persona.horarioLaboral });
    const response = await this.groqClient.getGroqChatCompletion(promp);
    const json = JSON.parse(response.choices[0].message.content);
    console.log(json.tarea);
    switch (json.tarea) {
      case 'agendarHorarios':
        await this.generateAgenda(json.jsonData.schedule, persona);
        break;
      case 'responderDudas':
        break;
    }
    await this.sendPersonMessage({ cell, message: json.mensaje });
  }


  async generateAgenda(schedule, persona) {

    let rta;
    console.log(schedule);
    const tx = prisma.$transaction(async (tx) => {
      await Promise.all(
        schedule.map(schedule =>
          this.personasRepository.createSchedule(tx, persona.id, schedule)
        )
      );
    });
    return rta;

  }

  async sendFirstPersonMessage({ cell, message }) {
    await this.personasRepository.createPerson(cell, null);
    await this.messageRepository.createMessageLogByCelular({ celular: cell, content: message, sender: 'USER' });
    const mensajeInicial = `
Hola, bienvenido a Microfit.
Para poder comenzar necesito que aceptes los terminos y condiciones.

https://microfit.lat/terminos-y-condiciones
      `;
    return await this.baileysClient.sendMessage(cell, mensajeInicial);
  }

}