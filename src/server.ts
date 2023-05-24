import fastify from 'fastify';
import cors from '@fastify/cors'
import dotenv from 'dotenv';

dotenv.config();
const server = fastify();

server.register(cors, {
    
});

server.get('/', (request, reply) => {
    return "Servidor Exemplo no ar"
});

const port: any = process.env.PORT;

server.listen({ port }, (error, adress) => {
    if(error){
        console.error(error);
        process.exit(1);
    }else{
        console.log(`Servidor rodando em ${adress}`);
    }
});