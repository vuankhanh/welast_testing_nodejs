class CacheService {
  constructor() {
    this.cache = {};
  }

  get(key) {
    return this.cache[key];
  }

  set(key, value) {
    this.cache[key] = value;
  }

  delete(key) {
    delete this.cache[key];
  }
}

module.exports = new CacheService();