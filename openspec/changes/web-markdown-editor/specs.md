# Specifications

## User Stories & Features

1. **Markdown Editor Interface**
   - As a user, I can type markdown into a text area.
   - As a user, I can see what I am typing rendered instantly in a side-by-side preview panel.
   - Text editing supports basic syntax formatting via standard Markdown (headings, lists, bold, etc.).

2. **Mermaid Rendering Support**
   - As a user, when I create a code block marked with `mermaid`, the preview pane renders it as an SVG diagram automatically.
   - The diagram automatically updates in real-time as the code block changes.
   - The rendered diagram must use a premium, modern aesthetic theme.

3. **Premium Design Language**
   - The application must feature a professional, modern aesthetic (such as glassmorphism, smooth gradients, sleek borders).
   - The color scheme should default to an aesthetic dark-mode tailored for developers (e.g. monochromatic dark grays/blues with vibrant accent colors).
   - Typography should be modern and legible (e.g., Inter, Roboto).
   
## Acceptance Criteria
- [ ] Typing inside the EditorPane updates the PreviewPane instantly.
- [ ] A valid mermaid block (` ```mermaid `) produces an SVG diagram in the PreviewPane instead of a plain code block.
- [ ] Invalid mermaid syntax fails gracefully, displaying a helpful error or the raw code, rather than crashing the page.
- [ ] The entire UI is responsive and scales appropriately.
