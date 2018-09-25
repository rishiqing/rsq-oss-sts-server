'use strict';

const express = require('express');
const cluster = require('cluster');
const promClient = require('prom-client')
const server = express();
const register = promClient.register;

const Histogram = promClient.Histogram;
const h = new Histogram({
	name: 'test_histogram',
	help: 'Example of a histogram',
	labelNames: ['code']
});

const Counter = promClient.Counter;
const c = new Counter({
	name: 'test_counter',
	help: 'Example of a counter',
	labelNames: ['code']
});

const Gauge = promClient.Gauge;
const g = new Gauge({
	name: 'test_gauge',
	help: 'Example of a gauge',
	labelNames: ['method', 'code']
});

setInterval(() => {
	h.labels('200').observe(Math.random());
	h.labels('300').observe(Math.random());
}, 10000);

setInterval(() => {
	c.inc({ code: 200 });
}, 5000);

setInterval(() => {
	c.inc({ code: 400 });
}, 2000);

setInterval(() => {
	c.inc();
}, 2000);

setInterval(() => {
	g.set({ method: 'get', code: 200 }, Math.random());
	g.set(Math.random());
	g.labels('post', '300').inc();
}, 100);

if (cluster.isWorker) {
	// Expose some worker-specific metric as an example
	setInterval(() => {
		c.inc({ code: `worker_${cluster.worker.id}` });
	}, 2000);
}

server.get('/metrics', (req, res) => {
	res.set('Content-Type', register.contentType);
	res.end(register.metrics());
});

server.get('/metrics/counter', (req, res) => {
	res.set('Content-Type', register.contentType);
	res.end(register.getSingleMetricAsString('test_counter'));
});

//Enable collection of default metrics
promClient.collectDefaultMetrics();

// console.log('Server listening to 3000, metrics exposed on /metrics endpoint');
server.listen(3000);