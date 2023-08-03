import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { atom, Provider } from "jotai"

// conciser data management
const data = await window.comms.getData()
export const playlist = atom(data.playlist ?? [])
export const todos = atom(data.todos ?? [])
export const workTime = atom(data.workTime ?? 60 )
export const breakTime = atom(data.breakTime ?? 900)
export const positions = atom(data.positions ?? {})
export const sizes = atom(data.sizes ?? {})
export const styles = atom(data.styles ?? {})

// global mouse X and Y
export const mousePos = atom( {x:0, y:0} )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
    <App  />
  </Provider>
);
