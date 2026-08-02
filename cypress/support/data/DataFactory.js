/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

/**
 * DataFactory
 * Responsável exclusivamente pela GERAÇÃO de massa de dados.
 * Não decide de onde o dado vem (isso é papel do DataProvider)
 * e não sabe nada sobre limpeza (isso é papel do DataCleaner).
 *
 * Cada método retorna um objeto novo e independente a cada chamada,
 * para evitar colisão de dados entre cenários (ex.: e-mails duplicados).
 */
class DataFactory {
    // Países aceitos pelo <select> de cadastro do automationexercise.com.
    // Não pode ser um país aleatório do mundo real (ex.: faker.location.country()),
    // porque o site só tem essas opções fixas na lista.
    static PAISES_ACEITOS = ['India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore']

    buildUser() {
        return {
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password({ length: 10 }),
            phone: faker.phone.number(),
            address: faker.location.streetAddress(),
            birthDay: String(faker.number.int({ min: 1, max: 28 })),
            birthMonth: String(faker.number.int({ min: 1, max: 12 })),
            birthYear: String(faker.number.int({ min: 1970, max: 2005 })),
            country: DataFactory.PAISES_ACEITOS[faker.number.int({ min: 0, max: DataFactory.PAISES_ACEITOS.length - 1 })],
            state: faker.location.state(),
            city: faker.location.city(),
            zipcode: faker.location.zipCode(),
        }
    }

    buildSearchTerm() {
        // Termos plausíveis para o catálogo do automationexercise.com
        const termos = ['dress', 'jeans', 'top', 'tshirt', 'saree']
        return termos[faker.number.int({ min: 0, max: termos.length - 1 })]
    }

    buildCartItem(quantidadeMax = 5) {
        return {
            productName: faker.commerce.productName(),
            quantity: faker.number.int({ min: 1, max: quantidadeMax }),
        }
    }

    // Gera massa em lote — útil para testes de volume/carga leve
    buildBatch(builderName, quantidade = 10) {
        return Array.from({ length: quantidade }, () => this[builderName]())
    }
}

export default new DataFactory()
