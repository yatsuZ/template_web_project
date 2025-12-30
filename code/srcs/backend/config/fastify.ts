import Fastify, { FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { showLog } from '../utils/logger.js';
import { setupRoutes } from '../routes/index.js';

export async function buildFastify(): Promise<FastifyInstance> {
	const fastify = Fastify({
		logger: showLog(),
	});

	// Servir les fichiers statiques (depuis srcs/static)
	await fastify.register(fastifyStatic, {
		root: path.join(process.cwd(), 'srcs/static'),
		prefix: '/',
	});

	// Setup des routes
	await setupRoutes(fastify);

	return fastify;
}
