// BaseNode.jsx

import React from 'react';
import { Handle, Position } from 'reactflow';

// Standard colors mapping based on node title category (Linear/Retool visual style)
const CATEGORY_COLORS = {
  'INPUT': '#10b981',      // Emerald 500
  'OUTPUT': '#ef4444',     // Red 500
  'LLM': '#3b82f6',        // Blue 500
  'TEXT': '#8b5cf6',       // Violet 500
  'API ENDPOINT': '#0284c7', // Sky 600
  'SEND EMAIL': '#06b6d4',  // Cyan 500
  'DATABASE QUERY': '#f97316', // Orange 500
  'FILTER CONDITION': '#ec4899', // Pink 500
  'CALCULATOR': '#14b8a6'   // Teal 500
};

export const BaseNode = ({
  title,
  inputs = [],
  outputs = [],
  width = 220,
  height = 90,
  style = {},
  children
}) => {
  // Determine top accent color based on title or fallback to brand indigo
  const normalizedTitle = title ? title.toUpperCase() : '';
  const accentColor = CATEGORY_COLORS[normalizedTitle] || '#4f46e5';

  // Helper to render lists of handles
  const renderHandles = (handlesList, handleType, defaultPosition) => {
    if (!handlesList || handlesList.length === 0) return null;
    
    return handlesList.map((h, index) => {
      const position = h.position || defaultPosition;
      
      // Determine if a placement style is explicitly provided
      const hasPlacementStyle = h.style && (
        h.style.top !== undefined ||
        h.style.bottom !== undefined ||
        h.style.left !== undefined ||
        h.style.right !== undefined
      );

      // If no placement is provided, distribute vertically along the side
      const computedStyle = hasPlacementStyle
        ? h.style
        : {
            top: `${(index + 1) * (100 / (handlesList.length + 1))}%`,
            ...h.style
          };

      return (
        <div key={h.id || `${handleType}-${index}`}>
          <Handle
            type={handleType}
            position={position}
            id={h.id}
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#4f46e5',
              border: '2px solid #ffffff', // Clean white ring
              zIndex: 10,
              ...computedStyle
            }}
          />
          {h.label && (
            <span
              style={{
                position: 'absolute',
                left: position === Position.Left ? '10px' : 'auto',
                right: position === Position.Right ? '10px' : 'auto',
                top: computedStyle.top,
                transform: 'translateY(-50%)',
                fontSize: '8px',
                fontWeight: '600',
                color: '#4f46e5',
                backgroundColor: '#f5f3ff',
                padding: '1px 4px',
                borderRadius: '3px',
                border: '1px solid #ddd6fe',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                zIndex: 5
              }}
            >
              {h.label}
            </span>
          )}
        </div>
      );
    });
  };

  return (
    <div
      style={{
        width,
        height,
        border: '1px solid #e2e8f0', // Clean Slate border
        borderTop: `3px solid ${accentColor}`, // Color-coded category accent
        borderRadius: '6px',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        boxSizing: 'border-box',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Node Header */}
      <div
        style={{
          padding: '6px 10px',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          userSelect: 'none'
        }}
      >
        <span
          style={{
            fontSize: '10px',
            fontWeight: '600',
            color: '#64748b', // Slate 500
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {title}
        </span>
      </div>

      {/* Node Body Content */}
      <div
        style={{
          padding: '10px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff'
        }}
      >
        {children}
      </div>

      {/* Target/Input Handles (Left default) */}
      {renderHandles(inputs, 'target', Position.Left)}

      {/* Source/Output Handles (Right default) */}
      {renderHandles(outputs, 'source', Position.Right)}
    </div>
  );
};
