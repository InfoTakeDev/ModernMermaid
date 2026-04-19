import { useState, useEffect } from 'react';
import EditorPane from './components/EditorPane.jsx';
import PreviewPane from './components/PreviewPane.jsx';

const DEFAULT_MARKDOWN = `# Modern Mermaid Editor

Welcome to your professional markdown editor. You can type standard markdown, or embed \`mermaid\` blocks like this:

\`\`\`mermaid
flowchart TD
    A[Idea] -->|Design| B(Specs)
    B --> C{Approved?}
    C -- Yes --> D[Code]
    C -- No --> B
    D --> E[Ship it! 🚀]
\`\`\`

## Features
- **Instant Preview**: see changes as you type.
- **Premium Aesthetics**: Professional dark-mode out of the box.
- **Auto-save**: Your work is saved locally in your browser.
`;

function App() {
  const [content, setContent] = useState(() => {
    return localStorage.getItem('mm-saved-content') || DEFAULT_MARKDOWN;
  });

  useEffect(() => {
    localStorage.setItem('mm-saved-content', content);
  }, [content]);

  return (
    <>
      <header className="header">
        <h1>Modern Markdown</h1>
      </header>
      <div className="editor-container">
        <EditorPane value={content} onChange={setContent} />
        <PreviewPane content={content} />
      </div>
    </>
  );
}

export default App;
