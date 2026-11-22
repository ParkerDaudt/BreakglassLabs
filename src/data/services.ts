export interface Service {
  slug: string;
  name: string;
  short: string;
  bestFor: string;
  length: string;
  lengthLabel: string;
  intro: string[];
  tests: [string, string][];
  deliverables?: string[];
}

export const deliverables = [
  'A report with every finding scored in CVSS 4.0, explained as an attack chain and mapped to the OWASP lists and MITRE ATLAS',
  'The exact evidence: requests, tool definitions and transcripts that prove each finding',
  'A readout with your engineers and one retest of fixed findings',
  'A regression test suite you can run in CI, so fixed issues stay fixed',
  'An attestation letter for your customers once fixes are verified',
];

export const services: Service[] = [
  {
    slug: 'mcp-server-assessment',
    name: 'MCP Server Security Assessment',
    short:
      'One MCP server, local or remote: OAuth flows and token handling, tool definitions, injection through tool inputs, secrets, transport and tenant isolation.',
    bestFor: 'Companies publishing an MCP server',
    length: '5 to 8 days',
    lengthLabel: 'Typical',
    intro: [
      'Your MCP server is an API that an AI model calls on behalf of your customers. It carries every classic API risk and adds new ones: tool definitions the model treats as instructions, tokens passed between services, and tools that can be steered by text the model read somewhere else.',
      'We test one server end to end, local (stdio) or remote (Streamable HTTP), using the same kinds of clients your customers use.',
    ],
    tests: [
      ['Authorization', 'OAuth flows, token audience and passthrough, consent per client, redirect URI validation and confused-deputy proxies'],
      ['Tool definitions', 'Descriptions and schemas that could steer an agent, and whether other servers can shadow your tools'],
      ['Injection through tool inputs', 'Command injection, path traversal and SSRF inside tool implementations'],
      ['Tenant isolation', "Whether one customer's token can reach another customer's data"],
      ['Secrets and transport', 'Secrets in configuration, logs and responses; transport and session handling'],
    ],
  },
  {
    slug: 'llm-application-pentest',
    name: 'LLM Application Pentest',
    short:
      'A chat, copilot or RAG app and its web and API layer: prompt injection, data disclosure, system-prompt leakage, unsafe output handling and cross-user access.',
    bestFor: 'SaaS companies shipping AI features',
    length: '5 to 10 days',
    lengthLabel: 'Typical',
    intro: [
      'An AI feature is still a web application, and now it also takes instructions from anything it reads. We test both layers together: how the model behaves and how the app around it handles what the model does.',
    ],
    tests: [
      ['Prompt injection', 'Direct, and indirect through documents, web pages, emails and tool outputs'],
      ['Data disclosure', "System prompts, secrets in context, and other users' or tenants' data"],
      ['Unsafe output handling', 'Model output rendered or executed downstream: links, images, HTML, SQL and code'],
      ['RAG poisoning', 'Documents in the retrieval store that steer answers for other users'],
      ['Cross-user authorization', "Whether one user can reach another user's conversations, files or actions"],
      ['Runaway cost', 'Inputs that make the app loop or spend without limit'],
    ],
  },
  {
    slug: 'ai-agent-assessment',
    name: 'AI Agent Security Assessment',
    short:
      'An agent with real tools: goal hijacking, tool misuse, excessive permissions, memory poisoning, bypassed approval steps and trust between agents.',
    bestFor: 'Customer-facing or high-privilege agents',
    length: '8 to 15 days',
    lengthLabel: 'Typical',
    intro: [
      'An agent that can send email, move money or change records is only as safe as the least trusted text it reads. We test what an attacker can make your agent do with the tools and permissions it already has.',
    ],
    tests: [
      ['Goal hijacking', 'Tickets, documents, web pages and tool results that redirect the agent'],
      ['Tool misuse', 'Tools used in ways their owners never intended, including through other MCP servers'],
      ['Excessive permissions', "Tools broader than the job needs, and agents acting with a user's full rights"],
      ['Approval steps', 'Whether human approval checks can be skipped, split up or talked around'],
      ['Memory poisoning', 'Notes and memories planted in one session that fire in a later one'],
      ['Multi-agent trust', 'Whether one agent can be used to steer another'],
    ],
  },
  {
    slug: 'exposure-review',
    name: 'AI and MCP Exposure Review',
    short:
      'Which agents and MCP servers your company already runs, in IDEs, desktops and SaaS connectors, what they can reach, and which tool combinations let data walk out.',
    bestFor: 'Companies rolling out internal agents',
    length: '5 to 10 days',
    lengthLabel: 'Typical',
    intro: [
      "Most companies run more MCP servers than anyone approved: in developers' IDEs, on desktops and inside SaaS connectors. This review finds them, maps what each one can reach, and shows which combinations put your data at risk.",
    ],
    tests: [
      ['Inventory', 'Agents, MCP servers and connectors in use across IDEs, desktops and SaaS'],
      ['Permissions', 'What each one can read, write and send, and under whose identity'],
      ['Risky combinations', 'Tool sets that join private data, untrusted content and a way to send data out'],
      ['Supply chain', 'Unpinned community servers, unvetted packages and outdated SDK versions'],
      ['Hardening and policy', 'Practical rules for approving, pinning and monitoring servers'],
    ],
    deliverables: [
      'An inventory of agents, MCP servers and connectors, with what each can reach',
      'The risky tool combinations ranked by what an attacker could do with them',
      'A hardening and approval policy your team can adopt',
      'A readout with your security and platform teams',
    ],
  },
  {
    slug: 'retainer',
    name: 'AI Security Retainer',
    short: 'Quarterly retests, regression suite runs, review hours for new AI features, and advice when you need it.',
    bestFor: 'Clients after their first assessment',
    length: 'Monthly or annual',
    lengthLabel: 'Term',
    intro: [
      'AI systems change every time a model, a prompt or a tool changes. The retainer keeps testing in step with your releases after the first assessment.',
    ],
    tests: [
      ['Quarterly retests', 'A focused retest of fixed findings and new attack techniques every quarter'],
      ['Regression runs', 'We run and maintain your regression suite as your system changes'],
      ['Feature reviews', 'Review hours for new agents, tools and MCP servers before they ship'],
      ['Advice', 'A direct line to the tester who knows your system'],
    ],
    deliverables: [
      'A short retest report each quarter',
      'A regression suite kept current with your system',
      'Written review notes for each new feature',
      'An updated attestation letter after each retest',
    ],
  },
];
