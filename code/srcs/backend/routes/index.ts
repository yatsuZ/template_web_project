import { FastifyInstance } from 'fastify';
import { healthRoutes } from './api/health.js';

export async function setupRoutes(fastify: FastifyInstance) {
	// Routes API
	await fastify.register(healthRoutes, { prefix: '/api' });

	// 404 handler
	fastify.setNotFoundHandler(async (request, reply) => {
		if (request.url.startsWith('/api/')) {
			return reply.code(404).send({ success: false, error: 'API endpoint not found' });
		}
		// Pour les autres routes, servir index.html (SPA)
		return reply.sendFile('index.html');
	});
}
