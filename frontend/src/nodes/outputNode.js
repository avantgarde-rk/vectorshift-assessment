// outputNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');
  
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Sync to store when state changes
  useEffect(() => {
    updateNodeField(id, 'outputName', currName);
    updateNodeField(id, 'outputType', outputType);
  }, [currName, outputType, id, updateNodeField]);

  return (
    <BaseNode
      title="Output"
      inputs={[
        { id: `${id}-value` }
      ]}
      outputs={[]}
      height={120}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className="retool-node-label">
          Name
          <input 
            type="text" 
            value={currName} 
            onChange={(e) => setCurrName(e.target.value)} 
            className="retool-node-input"
          />
        </label>
        <label className="retool-node-label">
          Type
          <select 
            value={outputType} 
            onChange={(e) => setOutputType(e.target.value)}
            className="retool-node-select"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
