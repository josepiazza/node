import { PersonasRepository } from "../repositories/personas.repository.js";


export class PersonaService {
    constructor() {
        this.personasRepository = new PersonasRepository();
    }

    async getPersonByCell(cell) {
        return await this.personasRepository.findByCell(cell);
    }

    async createPerson(cell, name) {
        return await this.personasRepository.createPerson(cell, name);
    }



}