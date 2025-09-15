<template>
  <div class="repo-detail container">
    <button @click="$router.go(-1)" class="button ghost">
      ← Вернуться к поиску
    </button>
    <Loader v-if="loading" />
    <template v-else>
      <article class="detail-section section">
        <h3 class="title">Детали</h3>
        <img
          :src="repo.owner.avatar_url"
          :alt="repo.owner.login"
          class="avatar"
          width="100"
          height="100"
        />
        <div class="detial-info">
          <h1>{{ repo.full_name }}</h1>
          <p class="description">
            {{ repo.description || "No description available." }}
          </p>
          <div class="stats flex gap-sm">
            <span>⭐ {{ repo.stargazers_count }}</span>
            <span>🔄 {{ repo.forks_count }}</span>
            <span>🗣️ {{ repo.language || "Unknown" }}</span>
          </div>
          <p><strong>Clone URL:</strong> {{ repo.clone_url }}</p>
          <CopyButton :text="repo.clone_url" label="Copy Clone URL" />
        </div>
      </article>

      <section class="section commits-section">
        <h3 class="title">Последние коммиты (Последние 5)</h3>
        <ul v-if="commits.length > 0" class="commits-list">
          <li
            v-for="commit in commits"
            :key="commit.sha"
            class="commit-item flex align-center gap-sm"
          >
            <img
              :src="commit.author ? commit.author.avatar_url : ''"
              :alt="commit.commit.author.name"
              class="commit-avatar"
              width="32"
              height="32"
            />
            <div class="commit-info flex-1">
              <p class="commit-message">
                {{ commit.commit.message.split("\n")[0] }}
              </p>
              <div class="commit-meta flex gap-xs">
                <span class="author">{{ commit.commit.author.name }}</span>
                <span class="date">
                  {{ formatDate(commit.commit.author.date) }}
                </span>
                <a
                  :href="commit.html_url"
                  target="_blank"
                  class="sha-link"
                  rel="noopener noreferrer"
                >
                  #{{ commit.sha.slice(-7) }}
                </a>
              </div>
            </div>
          </li>
        </ul>
        <p v-else class="no-data">Нет коммитов</p>
      </section>

      <section class="section contributors-section">
        <h3 class="title">Топ контрибьюторов (Top 10)</h3>
        <div v-if="contributors.length" class="contributors-grid">
          <div
            v-for="contributor in contributors"
            :key="contributor.id"
            class="contributor-item"
          >
            <img
              :src="contributor.avatar_url"
              :alt="contributor.login"
              class="contributor-avatar"
              width="48"
              height="48"
            />
            <p class="contributor-name">{{ contributor.login }}</p>
            <p class="contributor-contribs">
              {{ contributor.contributions }}
            </p>
          </div>
        </div>
        <p v-else class="no-data">Нет активных контрибюьютеров</p>
      </section>
    </template>
  </div>
</template>

<script>
import {
  loadRepository,
  loadRepositoryCommits,
  loadRepositoryContributors,
} from "../../common/api";
import CopyButton from "../../common/components/CopyButton.vue";
import Loader from "../../common/components/Loader.vue";
import { formatDate } from "../../common/util/formatters";

export default {
  name: "RepoDetail",
  components: {
    CopyButton,
    Loader,
  },
  data() {
    return {
      repo: null,
      commits: [],
      contributors: [],
      loading: true,
    };
  },
  async created() {
    const { owner, repo } = this.$route.params;
    const [r, commits, contributros] = await Promise.all([
      loadRepository(owner, repo),
      loadRepositoryCommits(owner, repo),
      loadRepositoryContributors(owner, repo),
    ]);

    this.repo = r;
    this.commits = commits;
    this.contributors = contributros;
    this.loading = false;
  },
  methods: {
    formatDate,
  },
};
</script>

<style lang="scss" scoped>
.repo-detail {
  padding: var(--space-xl);
  height: calc(100vh - 80px);

  .section {
    padding: var(--space-lg);

    .title {
      font-size: var(--font-size-lg);
      margin-bottom: var(--space-md);
      color: var(--color-text);
    }

    .no-data {
      text-align: center;
      color: var(--color-text-secondary);
      font-style: italic;
      padding: var(--space-md);
    }
  }

  .detial-info {
    display: flex;
    flex-flow: column nowrap;
    gap: var(--space-sm);
  }

  .commits-list {
    list-style: none;
    padding: 0;
    margin: 0;

    .commit-item {
      padding: var(--space-md);
      border-bottom: 1px solid var(--color-border);
      transition: var(--transition-fast);

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: var(--color-background);
      }

      .commit-avatar {
        border-radius: 50%;
        flex-shrink: 0;
      }

      .commit-info {
        .commit-message {
          margin: 0 0 var(--space-xs) 0;
          font-weight: var(--font-weight-medium);
          color: var(--color-text);
        }

        .commit-meta {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);

          .author {
            font-weight: var(--font-weight-medium);
          }

          .date {
            margin-left: var(--space-xs);
          }

          .sha-link {
            margin-left: var(--space-sm);
            color: var(--color-primary);
            font-family: monospace;
            font-size: var(--font-size-xs);

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

  .contributors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: var(--space-md);

    .contributor-item {
      text-align: center;
      padding: var(--space-sm);
      background: var(--color-background);
      border-radius: var(--border-radius-sm);
      transition: var(--transition-fast);

      &:hover {
        box-shadow: var(--shadow-sm);
        transform: translateY(-2px);
      }

      .contributor-avatar {
        border-radius: 50%;
        border: 1px solid var(--color-border);
        margin-bottom: var(--space-xs);
      }

      .contributor-name {
        margin: var(--space-xs) 0;
        font-weight: var(--font-weight-medium);
        color: var(--color-text);
        font-size: var(--font-size-sm);
      }

      .contributor-contribs {
        margin: 0;
        color: var(--color-text-secondary);
        font-size: var(--font-size-xs);
      }
    }
  }
}
</style>
