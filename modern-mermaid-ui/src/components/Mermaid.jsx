import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

// Post-processes Mermaid SVG to fix text clipping and apply beautiful colors
function cleanAndStyleSVG(svgEl) {
  // Step 1: Remove clipPath elements that cause text to be cut in some Mermaid versions
  svgEl.querySelectorAll('clipPath').forEach(el => el.remove())
  svgEl.querySelectorAll('[clip-path]').forEach(el => el.removeAttribute('clip-path'))

  // Step 2: Remove any forced font overrides — Mermaid measures text using whatever
  // the CSS font is (Patrick Hand from root), so the SVG must render in the same font.
  // No font override needed here.

  // Step 3: The SVG's width/height/overflow are already set during SVG string pre-processing.
  // Remove only the width/height attributes (which override style), keeping the style intact.
  svgEl.removeAttribute('width')
  svgEl.removeAttribute('height')

  // Step 5: Apply pastel fill colors to node shapes
  const nodeColors = ['#bbf7d0', '#e0d4fc', '#fef08a', '#bfdbfe', '#fbcfe8', '#fde68a']
  let colorIndex = 0
  svgEl.querySelectorAll('.node rect, .node circle, .node ellipse, .node polygon, .node path').forEach(el => {
    const fill = el.getAttribute('fill') || ''
    const isColorless = !fill || fill === 'none' || fill === '#ffffff' || fill === 'white'
      || fill.startsWith('rgb(255') || fill === '#ECECFF' || fill === '#f9f9f9'
      || fill === '#ffffde' || fill.toLowerCase() === '#cde498'
    if (isColorless) {
      el.setAttribute('fill', nodeColors[colorIndex++ % nodeColors.length])
    }
    if (el.getAttribute('stroke') && el.getAttribute('stroke') !== 'none') {
      el.setAttribute('stroke-width', '2')
    }
  })

  // Step 6: Style edges and arrowheads purple
  svgEl.querySelectorAll('.edgePath path, .flowchart-link').forEach(el => {
    el.setAttribute('stroke', '#6741d9')
    el.setAttribute('stroke-width', '2')
  })
  svgEl.querySelectorAll('marker path').forEach(el => {
    el.setAttribute('fill', '#6741d9')
    el.setAttribute('stroke', 'none')
  })
}

export default function Mermaid({ code }) {
  const containerRef = useRef(null)
  const [error, setError] = useState('')

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'default',
      themeVariables: {
        // Use trebuchet ms for BOTH measurement AND rendering.
        // Mermaid sets this font on SVG text elements AND uses it to measure
        // text widths for node sizing. Consistency is key — measurement font
        // must match rendering font, or text will overflow/be too narrow.
        fontFamily: 'trebuchet ms, verdana, arial, sans-serif',
        fontSize: '14px',
        primaryColor: '#bbf7d0',
        primaryTextColor: '#1a1a2e',
        primaryBorderColor: '#4ade80',
        lineColor: '#6741d9',
        secondaryColor: '#e0d4fc',
        tertiaryColor: '#fef08a',
        clusterBkg: '#fef08a',
        clusterBorder: '#f59e0b',
        edgeLabelBackground: '#f8f8ff',
        nodeBorder: '#4ade80',
      },
      flowchart: {
        htmlLabels: false, // Use SVG <text> not <foreignObject> — correct bounding boxes!
        padding: 15,
        nodeSpacing: 50,
        rankSpacing: 60,
        curve: 'basis',
      },
      sequence: { useMaxWidth: true },
      gantt: { useMaxWidth: true },
    })
  }, [])

  useEffect(() => {
    let cancelled = false

    async function render() {
      if (!containerRef.current) return
      setError('')

      try {
        await mermaid.parse(code)
        await document.fonts.ready

        const id = `mermaid-${Math.random().toString(36).slice(2)}`
        const { svg } = await mermaid.render(id, code)

        if (cancelled) return

        const container = containerRef.current

        // Extract the original pixel width Mermaid calculated for this diagram.
        const origWidthMatch = svg.match(/\bwidth="([\d.]+)"/)
        const origWidth = origWidthMatch ? Math.ceil(parseFloat(origWidthMatch[1])) : 600

        // Re-add the original pixel width but cap at 600px to prevent tiny/huge extremes.
        // Keep overflow=visible so text that overflows the viewBox still paints.
        const displayWidth = Math.min(origWidth, 600)
        let patchedSvg = svg
          .replace(/(<svg[^>]*)\s+width="[^"]*"/, '$1')
          .replace(/(<svg[^>]*)\s+height="[^"]*"/, '$1')
          .replace(/<svg/, `<svg overflow="visible" style="width:${displayWidth}px;max-width:100%;height:auto;display:block;" `)

        container.innerHTML = patchedSvg

        // Post-process: expand the viewBox to fit actual content bounding box.
        // MUST run after a layout frame so getBBox() has real coordinates.
        requestAnimationFrame(() => {
          if (cancelled) return
          const svgEl = container.querySelector('svg')
          if (svgEl) cleanAndStyleSVG(svgEl)
        })

      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to parse diagram')
      }
    }

    if (code?.trim()) {
      render()
    } else {
      if (containerRef.current) containerRef.current.innerHTML = ''
      setError('')
    }

    return () => { cancelled = true }
  }, [code])

  if (error) {
    return (
      <div style={{ color: '#c92a2a', backgroundColor: '#fff5f5', padding: '16px', border: '3px dashed #c92a2a', fontFamily: "'Patrick Hand', cursive", fontSize: '18px', borderRadius: '8px' }}>
        <strong>⚠ Mermaid Parse Error:</strong>
        <pre style={{ marginTop: '8px', fontSize: '14px', background: 'transparent', border: 'none', padding: 0, whiteSpace: 'pre-wrap' }}>{error}</pre>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '8px 0' }}>
      <div ref={containerRef} style={{ maxWidth: '100%', width: '100%' }} className="mermaid-container" />
    </div>
  )
}