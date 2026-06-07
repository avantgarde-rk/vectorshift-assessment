// calculatorNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const CalculatorNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'Add');
  
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'operation', operation);
  }, [operation, id, updateNodeField]);

  return (
    <BaseNode
      title="Calculator"
      inputs={[
        { id: `${id}-val_a`, label: 'A' },
        { id: `${id}-val_b`, label: 'B' }
      ]}
      outputs={[
        { id: `${id}-result`, label: 'Result' }
      ]}
      height={85}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center', height: '100%' }}>
        <label className="retool-node-label">
          Operation
          <select 
            value={operation} 
            onChange={(e) => setOperation(e.target.value)}
            className="retool-node-select"
          >
            <option value="Add">Add (+)</option>
            <option value="Subtract">Subtract (-)</option>
            <option value="Multiply">Multiply (*)</option>
            <option value="Divide">Divide (/)</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
