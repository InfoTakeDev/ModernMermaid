export default function EditorPane({ value, onChange }) {
  return (
    <section className="pane pane-editor">
      <textarea
        className="textarea-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type markdown or ```mermaid code here..."
        spellCheck="false"
      />
    </section>
  );
}
