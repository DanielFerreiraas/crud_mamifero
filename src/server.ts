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
    return "Servidor Exemplo no ar"
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

server.get<{ Body: Mamifero }>('/inserir/:nome', async (request, reply) => {
    const { nome } = request.body;

    const mamifero = await prisma.leopardoDasNeves.findMany({
        where: {
            nome: {
              contains: nome
            }
          }
        })
        reply.send(mamifero)
    });

    server.get('/buscar/:nome', async(req: any, reply : any) => {
        let nome = req.params.nome
        let mamifero = await prisma.leopardoDasNeves.findMany({
          where: {
            nome: {
              contains: nome
            }
          }
        })
        reply.send(mamifero)
      })

const port: any = process.env.PORT;

server.listen({ port }, (error, adress) => {
    if (error) {
        console.error(error);
        process.exit(1);
    } else {
        console.log(`Servidor rodando em ${adress}`);
    }
});