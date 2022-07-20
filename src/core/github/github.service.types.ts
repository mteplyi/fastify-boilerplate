export interface UserRepositoryBranch {
  name: string;
  lastCommitOid: string;
}

export interface UserRepository {
  name: string;
  ownerLogin: string;
  branches: UserRepositoryBranch[];
}
