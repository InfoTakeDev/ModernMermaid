# Technical Design

## Architecture

The project will be built directly inside the `modern-mermaid-ui` directory.
- **Framework**: React 19 + Vite (already configured)
- **State Management**: React state hooks
- **Markdown Parsing**: `react-markdown` and `remark-gfm`
- **Diagram Engine**: `mermaid.js` 11.x (already installed)

## Component Structure

1. **`App`**: Layout container handling the split-pane CSS Grid. Manages the global `markdownContent` state.
2. **`EditorPane`**: A controlled textarea component mapped to `markdownContent`. 
3. **`PreviewPane`**: Receives `markdownContent` as a prop and uses `<ReactMarkdown>` to render it. It will override the default rendering of `<code>` blocks to check if the language is `mermaid`.
4. **`MermaidDiagram`**: A React wrapper that takes raw mermaid code, initializes `mermaid` with our custom theme settings, and renders the output to an SVG safely.

## Theming Details

### CSS Custom Properties
```css
:root {
  --bg-color: #0f172a;           /* Deep Slate */
  --surface-color: #1e293b;      /* Lighter Slate */
  --accent-color: #38bdf8;       /* Light Blue */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --border-color: #334155;
  --font-family: 'Inter', system-ui, sans-serif;
}
```

### Mermaid Configuration
Mermaid will be initialized using `mermaid.initialize()` with `theme: 'base'` and `themeVariables` configured to match the application's deep slate and light blue accents. This creates the "professional engineer" polished look.
