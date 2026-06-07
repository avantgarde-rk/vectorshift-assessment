// textNode.js

import { useState, useEffect, useRef } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [dimensions, setDimensions] = useState({ width: 220, height: 90 });
  
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Extract unique variables directly from the current text content (derived UI state)
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const uniqueVariablesSet = new Set();
  let match;
  while ((match = regex.exec(currText)) !== null) {
    uniqueVariablesSet.add(match[1]);
  }
  const variables = Array.from(uniqueVariablesSet);

  // Synchronize text modifications with the Zustand store
  useEffect(() => {
    updateNodeField(id, 'text', currText);
  }, [currText, id, updateNodeField]);

  // Adjust size dynamically when text content changes
  useEffect(() => {
    if (textareaRef.current) {
      // Temporarily reset height to measure correct scrollHeight for current wrapping
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      
      // Calculate dynamic height constrained to reasonable bounds
      const minHeight = 90;
      const maxHeight = 350;
      const calculatedHeight = scrollHeight + 60; // Extra padding for the node header and label
      const height = Math.max(minHeight, Math.min(maxHeight, calculatedHeight));
      
      // Calculate dynamic width based on the longest line in the text area
      const minWidth = 220;
      const maxWidth = 450;
      const lines = currText.split('\n');
      const longestLine = Math.max(...lines.map(line => line.length), 10);
      const computedWidth = longestLine * 7.5 + 40;
      const width = Math.max(minWidth, Math.min(maxWidth, computedWidth));

      setDimensions({ width, height });
    }
  }, [currText]);

  // Construct target handle configurations dynamically for each variable
  const dynamicInputHandles = variables.map((varName) => ({
    id: `${id}-${varName}`,
    label: varName
  }));

  return (
    <BaseNode
      title="Text"
      width={dimensions.width}
      height={dimensions.height}
      inputs={dynamicInputHandles}
      outputs={[
        { id: `${id}-output` }
      ]}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label className="retool-node-label" style={{ flex: 1 }}>
          Text
          <textarea 
            ref={textareaRef}
            value={currText} 
            onChange={(e) => setCurrText(e.target.value)} 
            className="retool-node-textarea"
          />
        </label>
      </div>
    </BaseNode>
  );
};
