// apiNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const APINode = ({ id, data }) => {
  const [endpoint, setEndpoint] = useState(data?.endpoint || '');
  const [method, setMethod] = useState(data?.method || 'GET');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'endpoint', endpoint);
    updateNodeField(id, 'method', method);
  }, [endpoint, method, id, updateNodeField]);

  return (
    <BaseNode
      title="API Endpoint"
      inputs={[
        { id: `${id}-trigger`, label: 'Trigger' }
      ]}
      outputs={[
        { id: `${id}-response`, label: 'Response' },
        { id: `${id}-status`, label: 'Status' }
      ]}
      height={120}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className="retool-node-label">
          Endpoint URL
          <input 
            type="text" 
            placeholder="https://api.example.com"
            value={endpoint} 
            onChange={(e) => setEndpoint(e.target.value)} 
            className="retool-node-input"
          />
        </label>
        <label className="retool-node-label">
          Method
          <select 
            value={method} 
            onChange={(e) => setMethod(e.target.value)}
            className="retool-node-select"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
