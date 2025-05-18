
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
// import { LibSQLStore } from '@mastra/libsql';
import { CloudflareDeployer } from '@mastra/deployer-cloudflare';
import { codeReviewAgent } from './agents/code-review-agent';

export const mastra = new Mastra({
  deployer: new CloudflareDeployer({
    scope: process.env.CLOUDFLARE_ACCOUNT_ID || '', // Cloudflare账户ID
    projectName: 'code-review-agent', // Worker项目名称
    routes: [
      // 可选：配置自定义域名路由
      // { pattern: 'api.yourdomain.com/*', zone_name: 'yourdomain.com', custom_domain: true }
    ],
    auth: {
      apiToken: process.env.CLOUDFLARE_API_TOKEN || '', // Cloudflare API令牌
      apiEmail: process.env.CLOUDFLARE_API_EMAIL, // 与Cloudflare账户关联的邮箱
    },
  }),
  agents: { codeReviewAgent },
  // storage: new LibSQLStore({
  //   // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
  //   url: ":memory:",
  // }),
  logger: createLogger({
    name: 'Code Review Assistant',
    level: 'debug',
  }),
});
