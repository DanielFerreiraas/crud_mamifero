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
server.get('/', (request, reply) => {
    return "Servidor Exemplo no ar";
});
server.post('/inserir', (request, reply) => {
    const { nome, caracteristicas, peso, ameacado } = request.body;
    const mamifero = prisma.leopardoDasNeves.create({
        data: {
            nome,
            caracteristicas,
            peso,
            ameacado,
        }
    });
    return reply.status(201).send(mamifero);
});
// server.get('/pesquisar', async (request: any, reply: any) => {
//     const nomeDoMamifero = request.body.nomeDoMamifero;
//     const leopardoDasNeves = await prisma.leopardoDasNeves.findMany({
//         where:{
//             nome: {
//                 contains: nomeDoMamifero
//             }
//         }
//     })
//     reply.send(leopardoDasNeves)
// })
const port = process.env.PORT;
server.listen({ port }, (error, adress) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    else {
        console.log(`Servidor rodando em ${adress}`);
    }
});
