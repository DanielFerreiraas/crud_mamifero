import fastify from 'fastify';
import cors from '@fastify/cors'
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();
const server = fastify();

server.register(cors, {

});

interface Mamifero {
    nome: string;
    caracteristicas: string;
    peso: number;
    ameacado: boolean;
}

server.get('/', () => {
    return "O servidor está funcionado!";
});

server.post<{ Body: Mamifero }>('/inserir', async (request, reply) => {

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

server.get('/selecionar/:nome', async (request: any, reply: any) => {
    const nome = request.params.nome;
    const mamifero = await prisma.leopardoDasNeves.findMany({
        where: {
            nome: nome
        }
    });
    reply.status(200).send(mamifero)
});

server.get('/selecionar/todos', async (request, reply) => {
    const mamifero = await prisma.leopardoDasNeves.findMany()
    reply.status(200).send(mamifero)
});

server.put('/editar/:nome', async (request: any, reply: any) => {
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
    reply.status(200).send(mamifero)
});

server.delete('/deletar/:nome', async (request: any, reply: any) => {
    const nome = request.params.nome;
    await prisma.leopardoDasNeves.delete({
        where: {
            nome: nome
        }
    });
    reply.status(204);
});

const port: any = process.env.PORT;

server.listen({ port }, (error, adress) => {
    if (error) {
        console.error(error);
        process.exit(1);
    } else {
        console.log(`Servidor executado em ${adress}`);
    }
});