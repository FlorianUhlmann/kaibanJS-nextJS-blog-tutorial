'use client'
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  // Setting up State
  const [topic, setTopic] = useState('');
  const [blogPost, setBlogPost] = useState('');
  const [stats, setStats] = useState(null);
  const [teamWorkflowStatus, setTeamWorkflowStatus] = useState('idle');

  const generateBlogPost = async () => {
    setBlogPost('');
    setStats(null);
    setTeamWorkflowStatus('running');
    console.info("in generateBlogPost")
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });

      const output = await response.json();
      if (!response.ok) {
        throw new Error(output?.error ?? 'Failed to generate blog post');
      }

      setTeamWorkflowStatus(output.status ?? 'UNKNOWN');

      if (output.status === 'FINISHED') {
        setBlogPost(output.result);
        if (output.stats) {
          const { costDetails, llmUsageStats, duration } = output.stats;
          setStats({
            duration,
            totalTokenCount: llmUsageStats.inputTokens + llmUsageStats.outputTokens,
            totalCost: costDetails.totalCost
          });
        }
      } else if (output.status === 'BLOCKED') {
        console.log(`Workflow is blocked, unable to complete`);
      }
    } catch (error) {
      console.error('Error generating blog post:', error);
      setTeamWorkflowStatus('error');
    }
  };

  return (
    <div className="container">
      <h1 className="header">AI Agents News Blogging Team</h1>
      <div className="grid">
        <div className="column">
          <div className="options">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic... E.g. 'AI News Sep, 2024'"
            />
            <button onClick={generateBlogPost}>
              Generate
            </button>
          </div>
          <div className="status">Status <span>{teamWorkflowStatus}</span></div>
          {/* Generated Blog Post */}
          <div className="blog-post">
            {blogPost ? (
              <ReactMarkdown>{blogPost}</ReactMarkdown>
            ) : (
              <p className="blog-post-info"><span>ℹ️</span><span>No blog post available yet</span><span>Enter a topic and click 'Generate' to see results here.</span></p>
            )}
          </div>
        </div>

        {/* We'll add more UI elements in the next steps */}
        <div className="column">
          <h2 className="title">Agents</h2>
          <p className="blog-post-info">Connect store via server action to show live agents.</p>

          <h2 className="title">Tasks</h2>
          <p className="blog-post-info">Connect store via server action to show live tasks.</p>

          <h2 className="title">Stats</h2>
          {stats ? (
            <div className="stats">
              <p>
                <span>Total Tokens: </span>
                <span>{stats.totalTokenCount}</span>
              </p>
              <p>
                <span>Total Cost: </span>
                <span>${stats.totalCost.toFixed(4)}</span>
              </p>
              <p>
                <span>Duration: </span>
                <span>{stats.duration} ms</span>
              </p>
            </div>
          ) : (
            <div className="stats"><p className="stats-info">ℹ️ No stats generated yet.</p></div>
          )}


        </div>
      </div>
    </div>
  );
}
