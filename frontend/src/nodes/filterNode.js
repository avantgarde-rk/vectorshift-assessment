// filterNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');
  
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'condition', condition);
  }, [condition, id, updateNodeField]);

  return (
    <BaseNode
      title="Filter Condition"
      inputs={[
        { id: `${id}-input_data`, label: 'Data' }
      ]}
      outputs={[
        { id: `${id}-true_branch`, label: 'True' },
        { id: `${id}-false_branch`, label: 'False' }
      ]}
      height={85}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center', height: '100%' }}>
        <label className="retool-node-label">
          Condition
          <input 
            type="text" 
            placeholder="value > 10"
            value={condition} 
            onChange={(e) => setCondition(e.target.value)} 
            className="retool-node-input"
          />
        </label>
      </div>
    </BaseNode>
  );
};
