// inputNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Sync to store when state changes
  useEffect(() => {
    updateNodeField(id, 'inputName', currName);
    updateNodeField(id, 'inputType', inputType);
  }, [currName, inputType, id, updateNodeField]);

  return (
    <BaseNode
      title="Input"
      inputs={[]}
      outputs={[
        { id: `${id}-value` }
      ]}
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
            value={inputType} 
            onChange={(e) => setInputType(e.target.value)}
            className="retool-node-select"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
