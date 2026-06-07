// llmNode.js

import React from 'react';
import { BaseNode } from '../components/BaseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      title="LLM"
      inputs={[
        { id: `${id}-system`, label: 'System', style: { top: `${100/3}%` } },
        { id: `${id}-prompt`, label: 'Prompt', style: { top: `${200/3}%` } }
      ]}
      outputs={[
        { id: `${id}-response`, label: 'Response' }
      ]}
      height={80}
    >
      <div style={{ fontSize: '11px', color: '#4b5563', lineHeight: '1.4', display: 'flex', alignItems: 'center', height: '100%' }}>
        <span>This is an LLM node that processes instructions.</span>
      </div>
    </BaseNode>
  );
};
