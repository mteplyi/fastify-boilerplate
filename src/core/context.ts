import { GithubService } from 'src/core/github/github.service';
import { RepositoryService } from 'src/core/replository/repository.service';

export const githubService = new GithubService();
export const repositoryService = new RepositoryService(githubService);
