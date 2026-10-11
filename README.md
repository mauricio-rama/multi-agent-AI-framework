# Diario de Estudio

A lightweight study-tracking web application built with vanilla HTML, CSS, and JavaScript. It helps users record study sessions, track their learning streaks, and monitor their weekly and monthly progress.

## Features

- **Study session tracking:** Record study dates, topics, and duration in minutes.
- **Study streaks:** Track consecutive study days and calculate the best streak.
- **Weekly statistics:** View study time accumulated from Monday through the current day.
- **Monthly progress:** Count unique study days in the current calendar month.
- **Local data storage:** Save sessions in the browser using `localStorage`.
- **Responsive interface:** A clean design intended for desktop and mobile screens.
- **No dependencies:** Runs without frameworks, package installation, a backend, or a build process.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Browser Local Storage
- Git and GitHub

## Project Structure

```text
multi-agent-AI-framework/
├── .agents/       # AI development skills
├── .opencode/     # OpenCode commands
├── AGENTS.md      # Project instructions
├── MEMORY.md      # Project context and decisions
├── app.js         # Application logic
├── index.html     # Main application page
├── styles.css     # Visual styles
├── opencode.json  # OpenCode configuration
├── skills-lock.json
└── README.md      # Project documentation
```

## Getting Started

### Prerequisites

A modern web browser. Visual Studio Code is optional.

### Run Locally

Clone the repository:

```bash
git clone https://github.com/mauricio-rama/multi-agent-AI-framework.git
```

Navigate to the project directory:

```bash
cd multi-agent-AI-framework
```

Open `index.html` directly in your browser. Alternatively, open the folder in Visual Studio Code and use your preferred browser to view the application.

No server, package installation, or build step is required.

## Data Storage

Study sessions are stored locally in the browser under the `diario-estudio-sesiones` key.

The application uses local calendar dates to calculate streaks and progress. Clearing the browser's local storage will remove the saved sessions.

## AI-Assisted Development

The repository includes project instructions, memory notes, and configuration files used to support AI-assisted development workflows.

- `AGENTS.md` documents coding conventions and project requirements.
- `MEMORY.md` records the current project state and important implementation decisions.
- `.agents/` and `.opencode/` contain development resources and commands.

## Future Improvements

- Add automated tests for date calculations and streak logic.
- Improve accessibility and keyboard navigation.
- Expand study progress reporting.

## Author

**Mauricio Ramirez**

GitHub: [@mauricio-rama](https://github.com/mauricio-rama)
