import fastify from '../fastify'

fastify.get('*', (req, res) => {
    res.status(404)
    res.send('Sorry, but this page does not exist.')
})
