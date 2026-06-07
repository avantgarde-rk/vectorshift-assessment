from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

app = FastAPI()

# Enable CORS to allow the React frontend to communicate with the FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic schemas for request validation
class NodeModel(BaseModel):
    id: str
    type: Optional[str] = None
    data: Optional[Dict[str, Any]] = None

    class Config:
        extra = "allow"

class EdgeModel(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

    class Config:
        extra = "allow"

class PipelineRequest(BaseModel):
    nodes: List[NodeModel]
    edges: List[EdgeModel]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

def check_is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """
    Detects if a directed graph has cycles using Kahn's algorithm (Topological Sort).
    Handles disconnected graphs, empty graphs, and cyclic structures correctly.
    """
    # Collect all unique node IDs from the nodes list and any referenced in the edges
    node_ids = {node["id"] for node in nodes if "id" in node}
    for edge in edges:
        if "source" in edge:
            node_ids.add(edge["source"])
        if "target" in edge:
            node_ids.add(edge["target"])
            
    # Initialize in-degree counters and adjacency list
    in_degree = {node_id: 0 for node_id in node_ids}
    adj_list = {node_id: set() for node_id in node_ids}
    
    # Build the graph representation
    for edge in edges:
        u = edge.get("source")
        v = edge.get("target")
        if u and v:
            # Prevent duplicate edge counting
            if v not in adj_list[u]:
                adj_list[u].add(v)
                in_degree[v] += 1
                
    # Kahn's algorithm: Find all nodes with in-degree 0
    queue = [node_id for node_id in node_ids if in_degree[node_id] == 0]
    visited_count = 0
    
    while queue:
        # Dequeue the first node
        u = queue.pop(0)
        visited_count += 1
        
        # For each outgoing edge from u to v
        for v in adj_list[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
                
    # If we visited all nodes, the graph is acyclic (is a DAG)
    return visited_count == len(node_ids)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse', response_model=PipelineResponse)
def parse_pipeline(pipeline: PipelineRequest):
    try:
        # Convert models to dictionaries for analysis
        nodes_list = [node.dict() for node in pipeline.nodes]
        edges_list = [edge.dict() for edge in pipeline.edges]
        
        num_nodes = len(nodes_list)
        num_edges = len(edges_list)
        is_dag = check_is_dag(nodes_list, edges_list)
        
        return PipelineResponse(
            num_nodes=num_nodes,
            num_edges=num_edges,
            is_dag=is_dag
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Malformed input or parsing error: {str(e)}"
        )
