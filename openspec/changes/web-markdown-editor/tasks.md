# Implementation Tasks

- [x] 1. Install `react-markdown` and `remark-gfm` inside `modern-mermaid-ui`.
- [x] 2. Update `index.css` to include the premium Excalidraw dark-mode/sketch CSS variables, typography, and split-pane layout syntax.
- [x] 3. Create `src/components/EditorPane.jsx`.
- [x] 4. Create `src/components/MermaidDiagram.jsx` handling mermaid rendering with `svg2roughjs` engine.
- [x] 5. Create `src/components/PreviewPane.jsx` combining `react-markdown` with our `MermaidDiagram` override for `<code className="language-mermaid">`.
- [x] 6. Update `src/App.jsx` to tie state between `EditorPane` and `PreviewPane` using the new styling layout.
- [x] 7. Start the Vite server locally and verify all components look pristine and beautiful.
