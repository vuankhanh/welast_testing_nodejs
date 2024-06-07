const reposService = require('../services/repos.service');
const ReposHelper = require('../helpers/repos.helper');
const PaginationHelper = require('../helpers/pagination.helper');

class ReposController {
  async getAll(req, res) {
    try {
      const query = req.query;
      const page = parseInt(query.page) || 1;
      const size = parseInt(query.size) || 10;
      const lang = query.lang || 'all';

      const repos = reposService.getRepos(lang);

      if(repos.length) {
        return res.status(200).json({
          status: 'success',
          metaData: PaginationHelper.paginate(repos, page, size),
        });
      }
      return res.status(429).json({
        status: 'error',
        message: repos
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async getLangTypes(req, res) {
    const repos = reposService.getRepos('all');
    if(repos.length) {
      const langTypes = repos.map(repo => repo.language);
      const uniqueLanguages = Array.from(new Set(langTypes));
      return res.status(200).json({
        status: 'success',
        metaData: uniqueLanguages
      });
    }
    return res.status(429).json({
      status: 'error',
      message: repos
    });
  }
}

module.exports = new ReposController();