import fastify from 'fastify';
import cors from '@fastify/cors'
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();
const server = fastify();

server.register(cors, {

});

server.get('/', (request, reply) => {
    return "O servidor está funcionado com sucesso!";
});

interface Mamifero {
    nome: string;
    caracteristicas: string;
    peso: number;
    ameacado: boolean;
}

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

    server.get('/pesquisar/:nome', async(request: any, reply : any) => {
        const nome = request.params.nome;
        const mamifero = await prisma.leopardoDasNeves.findMany({
          where: {
            nome: {
              contains: nome
            }
          }
        });
        reply.status(200).send(mamifero)
      });

      server.get('/pesquisar/todos', async(request, reply) => {
        const mamifero = await prisma.leopardoDasNeves.findMany()
        reply.status(200).send(mamifero)
      });

const port: any = process.env.PORT;

server.listen({ port }, (error, adress) => {
    if (error) {
        console.error(error);
        process.exit(1);
    } else {
        console.log(`Servidor rodando em ${adress}`);
    }
});