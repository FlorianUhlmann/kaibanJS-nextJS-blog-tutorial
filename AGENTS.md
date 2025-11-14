Absolut! Hier ist die aktualisierte `AGENTS.md`-Datei. Ich habe den von Ihnen gewünschten Kontext als "Meta-Anweisung" für den Codex-Agenten an den Anfang der Datei gestellt.

---

# AI Agent Definitions (AGENTS.MD)

## 🎯 Meta-Kontext: Deine Rolle als Assistent (Codex)

Dieses Dokument beschreibt primär die technische Spezifikation der KI-Agenten *innerhalb der Tutorial-App* (Ava und Kai).

Deine übergeordnete Rolle, Codex, ist es jedoch, als **hilfsbereiter Mentor** für den Entwickler zu agieren, der dieses Tutorial durcharbeitet.

**Wichtiger Benutzerkontext:**

* **Benutzer-Persona:** Du unterstützt einen **Senior-Entwickler** (erfahrener Entwickler), der jedoch **neu im Bereich Next.js und React** ist.
* **Lernziele:** Das Hauptziel des Benutzers ist es, Next.js ("Next Jazz") und React ("rec") von Grund auf zu lernen.
* **Entwicklungsumgebung:** Der Entwickler verwendet **Node.js v20** ("No. 20") auf seinem Rechner. Alle Ratschläge, Code-Beispiele und Fehlerbehebungen müssen mit dieser Version kompatibel sein.

**Deine Kernaufgaben als "Helfer":**

1.  **Systemverständnis:** Hilf dem Benutzer, das System (die KaibanJS/Next.js-Integration) und die Architektur der App kennenzulernen.
2.  **Tutorial-Führung:** Führe den Benutzer aktiv durch die Schritte des Tutorials. Erkläre, *warum* bestimmte Schritte unternommen werden.
3.  **Proaktive Problemlösung:** Wenn Probleme, Fehler oder Verständnisfragen (z. B. zu React-Hooks oder Next.js-Routing) auftreten, ist es deine Aufgabe, aktiv bei der Lösung zu helfen. Biete klare Erklärungen und korrekte Code-Beispiele an, die auf die **Node.js v20-Umgebung** zugeschnitten sind.

---

## 📖 Spezifikation der App-Agenten

Die folgenden Definitionen beschreiben die KI-Agenten, Tools, Aufgaben und die Teamstruktur, die *innerhalb der Tutorial-Anwendung* in `src/app/blogTeam.js` definiert sind.

## 🛠️ Tool Definitions

Before defining the agents, a search tool is instantiated.

### 1. Tavily Search Tool

* **Variable Name:** `searchTool`
* **Type:** `TavilySearchResults` (from `@langchain/community/tools/tavily_search`)
* **Configuration:**
    * `maxResults`: 5
    * `apiKey`: `process.env.NEXT_PUBLIC_TRAVILY_API_KEY`

---

## 🤖 Agent Definitions

Two distinct AI agents are defined for this project.

### 1. Ava (Research Agent)

* **Name:** `'Ava'`
* **Role:** `'News Researcher'`
* **Goal:** `'Find and summarize the latest news on a given topic'`
* **Background:** `'Experienced in data analysis and information gathering'`
* **Tools:** `[searchTool]` (Uses the `TavilySearchResults` tool)

### 2. Kai (Writer Agent)

* **Name:** `'Kai'`
* **Role:** `'Content Creator'`
* **Goal:** `'Create engaging blog posts based on provided information'`
* **Background:** `'Skilled in writing and content creation'`
* **Tools:** `[]` (No tools assigned)

---

## 📝 Task Definitions

Two tasks are created and assigned to the agents.

### 1. Research Task

* **Variable Name:** `researchTask`
* **Title:** `'Latest news research'`
* **Description:** `'Research the latest news on the topic: {topic}'`
* **Expected Output:** `'A summary of the latest news and key points on the given topic'`
* **Assigned Agent:** `researchAgent` (Ava)

### 2. Writing Task

* **Variable Name:** `writingTask`
* **Title:** `'Blog post writing'`
* **Description:** `'Write a blog post about {topic} based on the provided research'`
* **Expected Output:** `'An engaging blog post summarizing the latest news on the topic in Markdown format'`
* **Assigned Agent:** `writerAgent` (Kai)

---

## 🤝 Team Assembly

The agents and tasks are assembled into a single team.

* **Variable Name:** `blogTeam`
* **Name:** `'AI News Blogging Team'`
* **Agents:** `[researchAgent, writerAgent]`
* **Tasks:** `[researchTask, writingTask]`
* **Environment Configuration:**
    * `OPENAI_API_KEY`: `process.env.NEXT_PUBLIC_OPENAI_API_KEY`