import { GraphQLClient } from 'graphql-request';
import type { PatchedRequestInit } from 'graphql-request/dist/types';

import { config } from 'src/config/config';
import { InternalServerError, NotFoundError } from 'src/core/errors';
import type { UserRepository, UserRepositoryBranch } from 'src/core/github/github.service.types';
import { VcsService } from 'src/core/vcs/vcs.service';
import type { GetRepositoriesNs, GithubSdk } from 'src/sdk/github-graphql';
import { getGithubSdk } from 'src/sdk/github-graphql';
import { prepareGraphqlSdkResponseType } from 'src/util/sdk-graphql';

export class GithubService extends VcsService {
  private readonly sdk: GithubSdk;

  constructor() {
    super();

    const clientOptions: PatchedRequestInit = {
      headers: { Authorization: `Bearer ${config.github.token}` },
      errorPolicy: 'all',
    };
    const client = new GraphQLClient('https://api.github.com/graphql', clientOptions);

    this.sdk = getGithubSdk(client);
  }

  private static processUserRepositoryRefNode(refNode: GetRepositoriesNs.RefNode): UserRepositoryBranch {
    return {
      name: refNode.name,
      lastCommitOid: (refNode.target as GetRepositoriesNs.RefNodeTarget).oid as string,
    };
  }

  async getUserRepositories(login: string): Promise<UserRepository[]> {
    return this.getNextUserRepositories({ login });
  }

  private async getNextUserRepositoryBranches({
    owner,
    name,
    refsAfter,
  }: {
    owner: string;
    name: string;
    refsAfter?: string | null;
  }): Promise<UserRepositoryBranch[]> {
    const res = await this.sdk
      .getRepositoryRefs({
        owner,
        name,
        refsFirst: 100,
        refsAfter,
      })
      .then(prepareGraphqlSdkResponseType);

    if ('errors' in res) {
      const notFoundError = res.errors.find((e) => e.type === 'NOT_FOUND');
      if (notFoundError) {
        throw new NotFoundError(notFoundError.message);
      }
      throw new InternalServerError();
    }

    const repositoryNode = res.data.repository;

    if (!repositoryNode?.refs?.nodes || repositoryNode.refs.nodes.length === 0) {
      return [];
    }

    const { nodes: refNodes, pageInfo: refPageInfo } = repositoryNode.refs;

    const branches = refNodes
      .filter((refNode) => typeof refNode?.target?.oid === 'string')
      .map((refNode: GetRepositoriesNs.RefNode) => GithubService.processUserRepositoryRefNode(refNode));

    if (!refPageInfo.hasNextPage || !refPageInfo.endCursor) {
      return branches;
    }

    const nextUserRepositoryBranches = await this.getNextUserRepositoryBranches({
      owner,
      name,
      refsAfter: refPageInfo.endCursor,
    });
    branches.push(...nextUserRepositoryBranches);

    return branches;
  }

  private async processUserRepositoryNode(repositoryNode: GetRepositoriesNs.RepositoryNode): Promise<UserRepository> {
    const repository: UserRepository = {
      name: repositoryNode.name,
      ownerLogin: repositoryNode.owner.login,
      branches: [],
    };

    if (!repositoryNode.refs?.nodes) {
      return repository;
    }

    const { nodes: refNodes, pageInfo: refPageInfo } = repositoryNode.refs;

    repository.branches.push(
      ...refNodes
        .filter((refNode) => typeof refNode?.target?.oid === 'string')
        .map((refNode: GetRepositoriesNs.RefNode) => GithubService.processUserRepositoryRefNode(refNode)),
    );

    if (!refPageInfo.hasNextPage) {
      return repository;
    }

    const nextUserRepositoryBranches = await this.getNextUserRepositoryBranches({
      owner: repository.ownerLogin,
      name: repository.name,
      refsAfter: refPageInfo.endCursor,
    });
    repository.branches.push(...nextUserRepositoryBranches);

    return repository;
  }

  private async getNextUserRepositories({
    login,
    repositoriesAfter,
  }: {
    login: string;
    repositoriesAfter?: string | null;
  }): Promise<UserRepository[]> {
    const res = await this.sdk
      .getRepositories({
        login,
        repositoriesFirst: 100,
        refsFirst: 0,
        repositoriesAfter,
      })
      .then(prepareGraphqlSdkResponseType);

    if ('errors' in res) {
      const notFoundError = res.errors.find((e) => e.type === 'NOT_FOUND');
      if (notFoundError) {
        throw new NotFoundError(notFoundError.message);
      }
      throw new InternalServerError();
    }

    const userNode = res.data.user;

    if (!userNode?.repositories.nodes || userNode.repositories.nodes.length === 0) {
      return [];
    }

    const { nodes: repositoryNodes, pageInfo: repositoriesPageInfo } = userNode.repositories;

    const repositoryTasks: Promise<UserRepository>[] = repositoryNodes
      .filter(Boolean)
      .map((repositoryNode: GetRepositoriesNs.RepositoryNode) => this.processUserRepositoryNode(repositoryNode));

    if (!repositoriesPageInfo.hasNextPage || !repositoriesPageInfo.endCursor) {
      return Promise.all(repositoryTasks);
    }

    const nextRepositoriesTask = this.getNextUserRepositories({
      login,
      repositoriesAfter: repositoriesPageInfo.endCursor,
    });
    const [nextRepositories, ...repositories] = await Promise.all([nextRepositoriesTask, ...repositoryTasks]);
    repositories.push(...nextRepositories);

    return repositories;
  }
}
