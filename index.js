const fastify = require('fastify')({logger: true});
const fs = require('fs');
const path = require('path');

fastify.post('/', async (request, reply) => {
    try {
        if (request.body?.password !== '91!)&1H,3mq@') {
            console.log('wrong password')
            reply.send({status: 'fail', message: 'Need password'})
        }
        const message = request.body?.message;

        // Логирование сообщения в txt-файл
        fs.appendFileSync('log.txt', `${message}\n`);
        reply.send({status: 'success', message: 'Message logged successfully.'});
    } catch (error) {
        fastify.log.error(error);
        reply.send({status: 'fail', message: 'There was an error while logging your message.'});
    }
});

fastify.get('/log', async (request, reply) => {
    const logPath = path.join(__dirname, 'log.txt');

    // Проверяем, существует ли файл
    if (fs.existsSync(logPath)) {
        // Отвечаем с файлом, если он существует
        return reply.type('text/plain').send(fs.createReadStream(logPath));
    } else {
        // Отвечаем с ошибкой, если файл не найден
        return reply.code(404).send('File not found.');
    }
});

fastify.listen({port: 9000, host: "0.0.0.0"}, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});