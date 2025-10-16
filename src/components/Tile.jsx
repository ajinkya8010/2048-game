import React from "react";

export default function Tile({ value }) {
  const cls = `tile tile-${value === 0 ? "empty" : value}`;
  return (
    <div className={cls}>
      {value !== 0 ? <span className="tile-value">{value}</span> : null}
    </div>
  );
}
