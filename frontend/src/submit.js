// submit.js

import { useState } from 'react';
import { useStore } from './store';
import Swal from 'sweetalert2';

export const SubmitButton = () => {
  // Retrieve nodes and edges from the Zustand store
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        'https://vectorshift-backend-z2sy.onrender.com/pipelines/parse',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nodes, edges }),
        },
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      const { num_nodes, num_edges, is_dag } = data;

      // Single polished result interface using SweetAlert2
      Swal.fire({
        title: is_dag
          ? 'Pipeline Analysis: Valid DAG'
          : 'Pipeline Analysis: Cycle Detected',
        icon: is_dag ? 'success' : 'warning',
        confirmButtonText: 'Close',
        confirmButtonColor: '#4f46e5', // SaaS Indigo 600
        customClass: {
          popup: 'retool-swal-popup',
          title: 'retool-swal-title',
        },
        buttonsStyling: true,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: left; color: #374151; margin-top: 14px;">
            <!-- Count Statistics -->
            <div style="display: flex; gap: 12px; margin-bottom: 16px;">
              <div style="flex: 1; padding: 12px; border: 1px solid #e5e7eb; border-radius: 6px; text-align: center; background-color: #f9fafb;">
                <div style="font-size: 11px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Nodes</div>
                <div style="font-size: 20px; font-weight: 600; color: #111827; margin-top: 2px;">${num_nodes}</div>
              </div>
              <div style="flex: 1; padding: 12px; border: 1px solid #e5e7eb; border-radius: 6px; text-align: center; background-color: #f9fafb;">
                <div style="font-size: 11px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Edges</div>
                <div style="font-size: 20px; font-weight: 600; color: #111827; margin-top: 2px;">${num_edges}</div>
              </div>
            </div>
            
            <!-- DAG Status Alert Box -->
            <div style="padding: 12px 14px; border-radius: 6px; border: 1px solid ${is_dag ? '#bbf7d0' : '#fecaca'}; background-color: ${is_dag ? '#f0fdf4' : '#fef2f2'}; color: ${is_dag ? '#166534' : '#991b1b'}; display: flex; flex-direction: column; gap: 2px;">
              <div style="font-weight: 600; font-size: 13px;">
                ${is_dag ? 'Graph is Acyclic (DAG)' : 'Cycle Warning'}
              </div>
              <div style="font-size: 12px; opacity: 0.9; line-height: 1.4;">
                ${
                  is_dag
                    ? 'All nodes have valid dependencies. This pipeline is a valid Directed Acyclic Graph.'
                    : 'Feedback loops detected in connection routes. This is not a valid Directed Acyclic Graph.'
                }
              </div>
            </div>
          </div>
        `,
      });
    } catch (error) {
      Swal.fire({
        title: 'Failed to Analyze Pipeline',
        text: `Error connecting to backend API: ${error.message}. Please make sure the FastAPI server is running on http://localhost:8000.`,
        icon: 'error',
        confirmButtonText: 'Dismiss',
        confirmButtonColor: '#ef4444',
        customClass: {
          popup: 'retool-swal-popup',
          title: 'retool-swal-title',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 0',
      }}
    >
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="retool-submit-btn"
      >
        {isSubmitting ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="spinner"></span>
            Analyzing...
          </span>
        ) : (
          'Submit Pipeline'
        )}
      </button>
    </div>
  );
};
