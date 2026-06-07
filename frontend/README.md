# VectorShift Technical Assessment

## Live Demo

### Frontend

https://vectorshift-assessment-black.vercel.app/

### Backend

https://vectorshift-backend-z2sy.onrender.com/

---

# Overview

This project is a workflow/pipeline builder developed as part of the VectorShift Frontend Technical Assessment.

The application allows users to visually create pipelines by dragging and connecting nodes within a React Flow canvas. Users can construct workflows, define dynamic variables within text nodes, and analyze the resulting pipeline structure through a FastAPI backend.

The backend validates the submitted pipeline, calculates node and edge counts, and determines whether the pipeline forms a Directed Acyclic Graph (DAG).

---

# Features

## Part 1: Node Abstraction

Implemented a reusable `BaseNode` component to reduce duplication and simplify creation of new node types.

### Refactored Nodes

- Input Node
- Output Node
- LLM Node
- Text Node

### Additional Nodes

- API Node
- Email Node
- Database Node
- Filter Node
- Calculator Node

Benefits:

- Reduced repeated layout code
- Consistent styling across nodes
- Easier future node creation
- Improved maintainability

---

## Part 2: Styling

Implemented a unified SaaS-inspired interface inspired by tools such as Retool, Linear, and modern workflow builders.

Enhancements include:

- Consistent node design
- Improved form controls
- Styled toolbar
- Enhanced connection handles
- Responsive layout
- Professional submit button
- Visual node categorization

---

## Part 3: Dynamic Text Node Logic

The Text Node supports:

### Auto Resizing

- Dynamic width adjustment based on content length
- Dynamic height adjustment based on content size

### Variable Parsing

Variables can be defined using:

```text
{{customer_name}}
{{email}}
```

Features:

- Valid JavaScript variable detection
- Automatic handle generation
- Duplicate variable prevention
- Dynamic handle removal when variables are deleted

Example:

```text
Hello {{customer_name}}

Your order has been processed.
```

Creates a target handle named:

```text
customer_name
```

---

## Part 4: Backend Integration

Implemented frontend-to-backend communication using FastAPI.

When the user submits a pipeline:

1. Nodes and edges are sent to the backend.
2. The backend calculates:
   - Number of nodes
   - Number of edges
   - DAG validity

3. Results are displayed through a user-friendly popup.

Example Response:

```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

---

# DAG Validation

The backend uses Kahn's Algorithm (Topological Sorting) to determine whether the pipeline forms a Directed Acyclic Graph.

The implementation correctly handles:

- Empty graphs
- Simple DAGs
- Cyclic graphs
- Disconnected DAGs
- Disconnected cyclic graphs

---

# Technology Stack

## Frontend

- React
- React Flow
- Zustand
- SweetAlert2
- CSS

## Backend

- FastAPI
- Pydantic
- Uvicorn

## Deployment

- Vercel (Frontend)
- Render (Backend)

---

# Project Structure

```text
backend/
├── main.py

frontend/
├── public/
├── src/
│   ├── components/
│   │   └── BaseNode.jsx
│   ├── nodes/
│   │   ├── inputNode.js
│   │   ├── outputNode.js
│   │   ├── llmNode.js
│   │   ├── textNode.js
│   │   ├── apiNode.js
│   │   ├── emailNode.js
│   │   ├── databaseNode.js
│   │   ├── filterNode.js
│   │   └── calculatorNode.js
│   ├── store.js
│   ├── submit.js
│   ├── toolbar.js
│   └── ui.js
```

---

# Running Locally

## Frontend

```bash
cd frontend
npm install
npm start
```

Runs on:

```text
http://localhost:3000
```

---

## Backend

```bash
cd backend
pip install fastapi uvicorn python-multipart
python -m uvicorn main:app --reload
```

Runs on:

```text
http://localhost:8000
```

---

# Testing

Verified:

- Node drag-and-drop
- Node connections
- Dynamic Text Node resizing
- Dynamic variable handles
- DAG validation
- Cycle detection
- Backend integration
- Production deployment

---

# Author

Rakesh R

Developed as part of the VectorShift Technical Assessment.
