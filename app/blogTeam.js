import { Agent, Task, Team } from 'kaibanjs';
import { TavilySearchResults } from '@kaibanjs/tools';
// Define the search retriever used by the Research Agent
// Note: In LangChain v1, Tavily is a retriever. You can wrap it
// in a tool later if needed for your agent framework.
const searchTool = new TavilySearchResults({
  k: 5,
  apiKey: process.env.TAVILY_API_KEY
});





//*************AGENTS ************************ */

// Define the Research Agent
const researchAgent = new Agent({
    name: 'Ava',
    role: 'News Researcher',
    goal: 'Find and summarize the latest news on a given topic',
    background: 'Experienced in data analysis and information gathering',
    tools: [searchTool]
  });
  
  // Define the Writer Agent
  const writerAgent = new Agent({
    name: 'Kai',
    role: 'Content Creator',
    goal: 'Create engaging blog posts based on provided information',
    background: 'Skilled in writing and content creation',
    tools: []
  });




//*************TASKS ************************ */

// Define Tasks
const researchTask = new Task({
    title: 'Latest news research',
    description: 'Research the latest news on the topic: {topic}',
    expectedOutput: 'A summary of the latest news and key points on the given topic',
    agent: researchAgent
  });
  
  const writingTask = new Task({
    title: 'Blog post writing',
    description: 'Write a blog post about {topic} based on the provided research',
    expectedOutput: 'An engaging blog post summarizing the latest news on the topic in Markdown format',
    agent: writerAgent
  });


//*************TASKSFORCE aka Team of Agents ************************ */

  // Create the Team
const blogTeam = new Team({
    name: 'AI News Blogging Team',
    agents: [researchAgent, writerAgent],
    tasks: [researchTask, writingTask],
    env: { OPENAI_API_KEY: process.env.OPENAI_API_KEY }
  });
  
  export { blogTeam };
