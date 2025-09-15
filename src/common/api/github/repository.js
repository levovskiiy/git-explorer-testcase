import { createRequest } from "../base";

const github = createRequest("https://api.github.com");

export async function searchRepositories(query, page, perPage) {
  return github("/search/repositories", {
    params: {
      q: query,
      page,
      per_page: perPage,
    },
  });
}

export async function loadRepository(ownerId, repoName) {
  return github(`/repos/${ownerId}/${repoName}`);
}

export async function loadRepositoryCommits(ownerId, repoName, count = 5) {
  return github(`/repos/${ownerId}/${repoName}/commits`, {
    params: {
      per_page: count,
    },
  });
}

export async function loadRepositoryContributors(
  ownerId,
  repoName,
  count = 10
) {
  return github(`/repos/${ownerId}/${repoName}/contributors`, {
    params: {
      per_page: count,
    },
  });
}
