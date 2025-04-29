# AI Basic Agent

This barebones AI agent is designed for easy customization and adaptability across a wide range of use cases. It already includes expandable **Personality**, **Goal**, and **Memory** features, with the flexibility to add even more.

Employing **Ollama** and the efficient **llama3** model, this project's LLM capabilities are integrated within a **Next.js** architecture. The codebase benefits from the maintainability of **TypeScript**, while the user interface is styled elegantly using **Tailwind CSS** in conjunction with **DaisyUI**.

## Getting Started

### Step 1.

Download [Ollama](https://ollama.com/download) for your system and then use:

```bash
ollama pull llama3
```

This command retrieves the precise model the Agent is configured to use, but feel free to experiment with other models. Note that if you switch models, you'll need to update the `route.ts` file.

`src/api/ollama/route.ts`

```
body: JSON.stringify({
        model: "llama3", // <--
        ...
      }),
```

You can find other Ollama models [here](https://ollama.com/search).

Then you can run the model to your console.

```bash
ollama run llama3
```

Or open [http://localhost:11434](http://localhost:11434) to see if the `Ollama is runing`.

### Step 2.

Clone the repository to your desired directory.

```bash
git clone git@github.com:roxmond/ai-agent.git
```

Install the dependencies. _(Node.js required)_

```bash
npm install
```

<details>
  <summary>Node.js</summary>

To install Node.js follow the instructions [here](https://nodejs.org/en).

</details>
<br>

Run the localhost.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Step 3.

To modify the behaviour of the agent you can simply modify the following files.

`src/app/agent/personality.ts`

```bash
export const PERSONA = `Add the personality here.`;
# Also on this section you can name your Agent.
```

`src/app/agent/goal.ts`

```bash
export const GOAL = `Your goal is to help the world`;
```

On the `memory.json` you can fine the recent prompts and responses.

`data/memory.json`

```bash
{
  "messages": [],
  "facts": [],
  "tasks": [],
  "goals": []
}
```
