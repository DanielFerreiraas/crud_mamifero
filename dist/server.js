"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const server = (0, fastify_1.default)();
server.register(cors_1.default, {});
server.get('/', () => {
    return "O servidor está funcionado!";
});
server.post('/inserir', async (request, reply) => {
    const { nome, caracteristicas, peso, ameacado } = request.body;
    const mamifero = await prisma.leopardoDasNeves.create({
        data: {
            nome,
            caracteristicas,
            peso,
            ameacado,
        }
    });
    return reply.status(201).send(mamifero);
});
server.get('/selecionar/:nome', async (request, reply) => {
    const nome = request.params.nome;
    const mamifero = await prisma.leopardoDasNeves.findMany({
        where: {
            nome: nome
        }
    });
    reply.status(200).send(mamifero);
});
server.get('/selecionar/todos', async (request, reply) => {
    const mamifero = await prisma.leopardoDasNeves.findMany();
    reply.status(200).send(mamifero);
});
server.put('/editar/:nome', async (request, reply) => {
    const nome = request.params.nome;
    const mamifero = await prisma.leopardoDasNeves.update({
        where: {
            nome: nome
        },
        data: {
            nome: request.body.nome,
            caracteristicas: request.body.caracteristicas,
            peso: request.body.peso,
            ameacado: request.body.ameacado
        }
    });
    reply.status(200).send(mamifero);
});
server.delete('/deletar/:nome', async (request, reply) => {
    const nome = request.params.nome;
    await prisma.leopardoDasNeves.delete({
        where: {
            nome: nome
        }
    });
    reply.status(204);
});
const port = process.env.PORT;
server.listen({ port }, (error, adress) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    else {
        console.log(`Servidor executado em ${adress}`);
    }
});
