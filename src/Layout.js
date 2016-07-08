import React from 'react';
import { Router, browserHistory } from 'react-router';

export default function Layout({ children }) {
  return (
    <div className="demo5">
      <h1>Drag a bubble into the square</h1>
      {children}
    </div>
  )
}
