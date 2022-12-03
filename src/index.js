import { createRoot } from 'react-dom/client';
import React from 'react';

import Scene from './Scene';

import './styles.css';

const app = (
    <>
        <Scene/>
        <section style={{ height: '200vh', padding: '50px' }}>
            Dummy content
        </section>
    </>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(app);