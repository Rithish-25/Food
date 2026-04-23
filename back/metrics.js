const client = require('prom-client');

// Create a Registry which registers the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'food-backend'
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Custom metric for HTTP requests
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in microseconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

// Register the custom metric
register.registerMetric(httpRequestDurationMicroseconds);

const metricsMiddleware = (req, res, next) => {
  const start = process.hrtime();
  
  res.on('finish', () => {
    const duration = process.hrtime(start);
    const durationInSeconds = duration[0] + duration[1] / 1e9;
    
    // Get route (strip query params)
    const route = req.baseUrl + (req.route ? req.route.path : '');
    
    httpRequestDurationMicroseconds
      .labels(req.method, route || req.path, res.statusCode)
      .observe(durationInSeconds);
  });
  
  next();
};

module.exports = {
  register,
  metricsMiddleware
};
