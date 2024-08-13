/*********************************************************************************************************
 * Objetivo: Arquivo responsável por padronizar as mensagens de ERRO, SUCESSO, FUNÇÕES, VARIÁVEIS
 * Autora: Bianca Pereira Leão
 * Data: 12/08/2024
 * Versão: 1.0
*********************************************************************************************************/

/*************************************** MENSAGENS DE ERRO ***************************************/

const ERROR_INTERNAL_SYSTEM = {status: 500, message: 'Devido a um erro interno no servidor, não foi possível processar a requisição.'};

const ERROR_INVALID_CONTENT_TYPE = {status: 415, message: 'O TIPO DE MÍDIA CONTENT-TYPE DA SOLICITAÇÃO NÃO É COMPATÍVEL COM O SERVIDOR. TIPO ACEITÁVEL: [application/json]'};

const ERROR_INVALID_ID = {status: 400, message: 'O ID INFORMADO NA REQUISIÇÃO NÃO É VÁLIDO, OU NÃO FOI ENCAMINHADO'};

const ERROR_REGISTER_NOT_FOUND = {status: 404, message: 'O SERVIDOR NÃO ENCONTROU O RECURSO SOLICITADO.'};

const ERROR_INVALID_TOKEN = {status: 400, message: 'O TOKEN É INVÁLIDO, OU SEJA, NÃO É COMPÁTIVEL'};

const ERROR_TOKEN_EXPIRADO = {status: 400, message: 'INTERVALO DE TEMPO ACABOU, TOKEN EXPIRADO'};

/*************************************** MENSAGENS DE SUCESSO ***************************************/

const SUCCESS_REQUEST = {status: 200, message: 'REQUISIÇÃO BEM SUCEDIDA'};

const SUCCESS_VALID_TOKEN = {status: 200, message: 'TOKEN VÁLIDO'};

module.exports = {
    // Exportes de erro
    ERROR_INTERNAL_SYSTEM,
    ERROR_INVALID_CONTENT_TYPE,
    ERROR_INVALID_ID,
    ERROR_REGISTER_NOT_FOUND,
    ERROR_INVALID_TOKEN,
    ERROR_TOKEN_EXPIRADO,

    // Exportes de sucesso
    SUCCESS_REQUEST,
    SUCCESS_VALID_TOKEN
};