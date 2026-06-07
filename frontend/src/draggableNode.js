// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="toolbar-draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      {label}
    </div>
  );
};