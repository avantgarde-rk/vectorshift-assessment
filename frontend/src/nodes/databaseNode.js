// databaseNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const DatabaseNode = ({ id, data }) => {
  const [dbType, setDbType] = useState(data?.dbType || 'PostgreSQL');
  const [query, setQuery] = useState(data?.query || '');
  
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'dbType', dbType);
    updateNodeField(id, 'query', query);
  }, [dbType, query, id, updateNodeField]);

  return (
    <BaseNode
      title="Database Query"
      inputs={[
        { id: `${id}-db_trigger`, label: 'Query' }
      ]}
      outputs={[
        { id: `${id}-results`, label: 'Row Data' }
      ]}
      height={140}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className="retool-node-label">
          Database Type
          <select 
            value={dbType} 
            onChange={(e) => setDbType(e.target.value)}
            className="retool-node-select"
          >
            <option value="PostgreSQL">PostgreSQL</option>
            <option value="MySQL">MySQL</option>
            <option value="MongoDB">MongoDB</option>
            <option value="SQLite">SQLite</option>
          </select>
        </label>
        <label className="retool-node-label">
          SQL/NoSQL Query
          <textarea 
            placeholder="SELECT * FROM users;"
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            className="retool-node-textarea"
            style={{ height: '32px', minHeight: '32px' }}
          />
        </label>
      </div>
    </BaseNode>
  );
};
