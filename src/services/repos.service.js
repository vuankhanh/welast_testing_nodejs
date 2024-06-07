
const cacheService = require('./cache.service');
const ReposHelper = require('../helpers/repos.helper');
const dataSourceUrl = 'https://api.github.com/users/freeCodeCamp/repos';
const cacheKey = 'repos';

class ReposService {
  async getReposSource() {
    const response = await fetch(dataSourceUrl);
    const repos = await response.json();

    return repos;
  }

  getRepos(lang) {
    //Get Repos from cache
    const cachedRepos = cacheService.get(cacheKey);

    if(cachedRepos.length) {
      //Return follow condition
      //### (A) Node/Express
      //"4. Only return repositories where `repository.fork` is `false` and `repository.forks` is greater than 5."

      //### (B) React
      //4. The list of repositories should be displayed in reverse chronological order by creation date.
      const defaultFilter = ReposHelper.sort(ReposHelper.filter(cachedRepos))
      if(lang==='all'){
        return defaultFilter
      }else{
        return ReposHelper.getLangTypesFilter(defaultFilter, lang)
      }
    }
    return cachedRepos
  }

  getLangTypes() {
    //Get Repos from cache
    const cachedRepos = cacheService.get(cacheKey);

    if(cachedRepos.length) {
      return ReposHelper.filterByLanguage(cachedRepos);
    }
    return cachedRepos;
  }

}

module.exports = new ReposService;