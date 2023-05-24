"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const server = (0, fastify_1.default)();
server.get('/', (request, reply) => {
    return "Servidor Exemplo no ar";
});
server.listen({ port: 3000 }, (error, adress) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    else {
        console.log(`Servidor rodando em ${adress}`);
    }
});
