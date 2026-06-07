// emailNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const EmailNode = ({ id, data }) => {
  const [recipient, setRecipient] = useState(data?.recipient || '');
  const [subject, setSubject] = useState(data?.subject || '');
  const [body, setBody] = useState(data?.body || '');
  
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'recipient', recipient);
    updateNodeField(id, 'subject', subject);
    updateNodeField(id, 'body', body);
  }, [recipient, subject, body, id, updateNodeField]);

  return (
    <BaseNode
      title="Send Email"
      inputs={[
        { id: `${id}-send`, label: 'Send' }
      ]}
      outputs={[
        { id: `${id}-success`, label: 'Sent' }
      ]}
      height={185}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label className="retool-node-label">
          To
          <input 
            type="email" 
            placeholder="recipient@example.com"
            value={recipient} 
            onChange={(e) => setRecipient(e.target.value)} 
            className="retool-node-input"
          />
        </label>
        <label className="retool-node-label">
          Subject
          <input 
            type="text" 
            placeholder="Subject line"
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            className="retool-node-input"
          />
        </label>
        <label className="retool-node-label">
          Body
          <textarea 
            placeholder="Email content..."
            value={body} 
            onChange={(e) => setBody(e.target.value)} 
            className="retool-node-textarea"
            style={{ height: '42px', minHeight: '42px' }}
          />
        </label>
      </div>
    </BaseNode>
  );
};
