// This file exports the server instance
import Fastify from 'fastify'
import path from 'path'
import meta_raw from '../meta.yml'
import MetaZ from './types/meta.yml.ts'
const meta = MetaZ.parse(meta_raw)

import {
    fastifyZodOpenApiPlugin,
    fastifyZodOpenApiTransformers,
    serializerCompiler,
    validatorCompiler
} from 'fastify-zod-openapi'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

// Define app / server / fastify 'instance'
const fastify = Fastify({
    logger: {
        file: path.join(process.cwd(), 'jimce-server.log')
    }
})

// Set up app for OpenAPI
fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)
await fastify.register(fastifyZodOpenApiPlugin)
await fastify.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Jimce API',
            version: `${meta.version}${meta.is_dev ? '-dev' : ''}`
        },
        openapi: meta.openapi_version,
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description:
                        'JWT Bearer token sent as Authorization: Bearer <token>'
                }
            }
        }
    },
    ...fastifyZodOpenApiTransformers
})
await fastify.register(fastifySwaggerUI, { routePrefix: '/api-docs' })

// Export app
export default fastify
