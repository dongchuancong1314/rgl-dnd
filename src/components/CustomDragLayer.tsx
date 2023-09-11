
import React, { CSSProperties } from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';
import { prefixCls } from '../constants';
import './styles/layout.less';

function snapToGrid(x: number, y: number): [number, number] {
  const snappedX = Math.round(x / 32) * 32;
  const snappedY = Math.round(y / 32) * 32;
  return [snappedX, snappedY];
}

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(
  clientOffset: XYCoord | null,

) {
  if (!clientOffset) {
    return {
      display: 'none',
    };
  }

  let { x, y } = clientOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
  };
}

type CustomDragLayerProps = {
  className?: string;
  label?: string;
}

const CustomDragLayer: React.FC<CustomDragLayerProps> = (props) => {
  const { className, label = "组件" } = props
  const { isDragging, clientOffset } =
    useDragLayer((monitor) => ({
      clientOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
    }));


  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(clientOffset)}
      >
        <div className={`${prefixCls}-drag-layer-lable ${className}`.trim()}>{label}</div>
      </div>
    </div>
  );
};

export default CustomDragLayer