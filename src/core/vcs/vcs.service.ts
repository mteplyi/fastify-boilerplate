import type { UserRepository } from 'src/core/github/github.service.types';

export abstract class VcsService {
  abstract getUserRepositories(login: string): Promise<UserRepository[]>;
}
