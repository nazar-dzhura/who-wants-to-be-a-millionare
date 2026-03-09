# Who Wants to Be a Millionaire?

A trivia game built with Next.js, TypeScript, and CSS Modules. Players answer 12 increasingly difficult questions to win up to $1,000,000.

## Features

- 12 progressive difficulty questions with prize ladder ($500 – $1,000,000)
- Hexagonal answer options with selection/correct/wrong states
- Money ladder sidebar (desktop) and fullscreen overlay (mobile)
- Fully responsive: iPhone 8 (375px) to 4K displays
- JSON-configurable: questions, answers, prize amounts, multiple correct answers
- No CSS frameworks — custom CSS Modules with design tokens

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/<your-username>/who-wants-to-be-a-millionare.git
cd who-wants-to-be-a-millionare
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Game Configuration

Questions and answers are defined in `src/data/questions.json`. The config supports:

- Variable number of answers per question (4+)
- Multiple correct answers via `correctAnswers` array
- Custom prize amounts per question

```json
{
  "questions": [
    {
      "id": 1,
      "text": "Question text?",
      "answers": [
        { "text": "Answer 1" },
        { "text": "Answer 2" },
        { "text": "Answer 3" },
        { "text": "Answer 4" }
      ],
      "correctAnswers": [0],
      "prize": 500
    }
  ]
}
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + CSS custom properties
- **State**: React Context + useReducer
- **Linting**: ESLint with Next.js rules

## Deploy

Deploy to Vercel:

```bash
npx vercel
```

Or connect the GitHub repository to [Vercel](https://vercel.com) for automatic deployments.
