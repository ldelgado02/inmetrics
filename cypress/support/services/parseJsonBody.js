/// <reference types="cypress" />

/**
 * A API do automationexercise.com responde com Content-Type text/html mesmo
 * quando o corpo é JSON, então o parse precisa ser feito manualmente.
 *
 * Quando o serviço está instável ou bloqueia a requisição, ele devolve uma
 * página HTML no lugar do JSON. Em vez de deixar estourar um SyntaxError
 * genérico ("Unexpected token '<'"), falhamos com o status HTTP e o início
 * do corpo recebido, deixando claro que o problema é do serviço externo.
 */
export function parseJsonBody(res) {
    if (typeof res.body !== 'string') return res.body

    try {
        return JSON.parse(res.body)
    } catch (e) {
        const inicioCorpo = res.body.slice(0, 200).replace(/\s+/g, ' ')
        throw new Error(
            `Resposta da API não é JSON (HTTP ${res.status}) - possível instabilidade ou bloqueio do serviço externo. ` +
            `Início do corpo: ${inicioCorpo}`
        )
    }
}
