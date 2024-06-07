const express = require('express');
const cors = require('cors')
const { default: helmet } = require('helmet');

const app = express();

const reposService = require('./services/repos.service');
const cacheService = require('./services/cache.service');

app.use(cors());
app.use(helmet());

// init routes
app.use('/api', require('./routes'));

// handle error
app.use((req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on the server`);
  error.status = 'failure';
  error.status = 404;

  next(error);
})

app.use((error, req, res, next) => {
  const status = error.status || 'error';
  const statusCode = error.status || 500;
  const message = error.message || 'Interal Server Error'

  return res.status(statusCode).json({
    status,
    message
  })
})

const cacheKey = 'repos';
//init data from Repos and set to cache
async function initCacheRepos() {
  try {
    const repo = await reposService.getReposSource();
    cacheService.set(cacheKey, repo);
  } catch (error) {
    cacheService.set(cacheKey, error.message);
  }
}

initCacheRepos();

module.exports = app;