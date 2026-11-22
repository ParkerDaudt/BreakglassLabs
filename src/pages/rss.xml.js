import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../../site.config.mjs';

export async function GET(context) {
  const posts = (await getCollection('research', ({ data }) => !data.draft)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: `${SITE.name} research`,
    description: 'Attacking and defending AI agents, LLM applications and MCP servers.',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/research/${p.id}/`,
    })),
  });
}
