class ReposHelper {
  static filter(repositories) {
    if(repositories.length){
      return repositories.filter(repo => repo.fork === false && repo.forks > 5)
    }
    return repositories;
  }
  static sort(repositories) {
    return repositories.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    });
  }

  static getLangTypesFilter(repositories, langType) {
    if(langType === '-'){
      return repositories.filter(repo => repo.language === null || repo.language === '')
    }else{
      return repositories.filter(repo => repo.language === langType)
    }
  }
}

module.exports = ReposHelper;