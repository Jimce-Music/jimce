import fastify from '../fastify'

fastify.get('/', (req, res) => {
    res.send(
        'This is the Jimce Server speaking, we are doing just fine! For further web client like capabilities, please wait until our frontend dev is done 😉'
    )
})
