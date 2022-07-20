import type { UserRepository } from 'src/core/github/github.service.types';
import type { VcsService } from 'src/core/vcs/vcs.service';

export class RepositoryService {
  constructor(private readonly vcsService: VcsService) {}

  async findAll({ login }: { login: string }): Promise<UserRepository[]> {
    return this.vcsService.getUserRepositories(login);
  }
}
