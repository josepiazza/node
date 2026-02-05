import { WhatsAppClient } from '../infra/http/ws.client.js';
import { GroqClient } from '../infra/http/groq.client.js';
import { PersonasRepository } from '../repositories/personas.repository.js';
import { prisma } from '../config/prisma.js';

export class MessageService {
  constructor() {
    this.whatsAppClient = new WhatsAppClient();
    this.groqClient = new GroqClient();
    this.personasRepository = new PersonasRepository();
  }

  async sendPersonMessage({ cell, message }) {
    return await this.whatsAppClient.sendTextMessage({
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
      to: cell,
      body: message,
    });
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
    const promp = `
Sos un asistente personal que va a decirme que días de la semana y a que hora tengo que avisarle al usuario cuando tiene que hacer ejercicio.
Vas a responderme solamente con un json, nada mas ya que tengo que usar la respuesta para procesarla
Este es el formato de JSON esperado:

{
  "cell": "$cellPhone",
  "message": "$message",
  "schedule": [
    {
      "dayOfWeek": "$diaDeLaSemana",
      "hour": "$hora",
      "minute": "$minute"
    },
    {
      "dayOfWeek": "$diaDeLaSemana",
      "hour": "$hora",
      "minute": "$minute"
    }
  ]
}

Los valores para los días de la semana son:
0 = Lunes
1 = Martes
2 = Miércoles
3 = Jueves
4 = Viernes
5 = Sábado
6 = Domingo

En el valor $message vas a poner el mensaje que vamos a enviar explicando que ya se agendaron 
los horarios para ir a entrenar, el mensaje debe ser corto, claro y no repetitivo.

El mensaje responde a la siguiente pregunta:
"Hola $nombreDeUsuario, ¿En que momentos te gustaría que te avisemos cuando tenes que ir a mover el cuerpo?
Recuerda que tenes 15' para usar nuestro MicroGym para mejorar tu salud."

cellPhone: ${cell}

El mensaje del usuario:
"${message}"
        `;
    const response = await this.groqClient.getGroqChatCompletion(promp);

    const json = JSON.parse(response.choices[0].message.content);
    console.log(json.cell);
    const persona = await this.personasRepository.findByCell(json.cell);
    if (!persona) {
      console.log('Persona no encontrada');
      return;
    }
    let rta;
    const tx = prisma.$transaction(async (tx) => {
      await Promise.all(
        json.schedule.map(schedule =>
          this.personasRepository.createSchedule(tx, persona.id, schedule)
        )
      );
      rta = await this.sendPersonMessage({ cell: persona.whatsapp, message: json.message });
    });



    return rta;
  }


  async sendFirstPersonMessage({ cell }) {
    const message = 'Hola, bienvenido a Microfit, ¿Quieres que te avisemos cuando sea hora de hacer ejercicio?';
    await this.whatsAppClient.sendTextMessage({
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
      to: cell,
      body: message,
    });
  }


  async getPersonMessage({ cell, message }) {
    console.log(cell, message);
  }

}