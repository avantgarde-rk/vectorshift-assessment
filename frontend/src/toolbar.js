// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div 
      style={{ 
        padding: '14px 20px', 
        borderBottom: '1px solid #e2e8f0', 
        backgroundColor: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      <div 
        style={{ 
          fontSize: '11px', 
          fontWeight: '600', 
          color: '#64748b', 
          textTransform: 'uppercase', 
          letterSpacing: '0.05em',
          marginBottom: '10px'
        }}
      >
        Workflow Elements
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
        <DraggableNode type='api' label='API Endpoint' />
        <DraggableNode type='email' label='Email' />
        <DraggableNode type='database' label='Database' />
        <DraggableNode type='filter' label='Filter' />
        <DraggableNode type='calculator' label='Calculator' />
      </div>
    </div>
  );
};
