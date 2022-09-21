import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import {store} from './store/store'
import {RootCmp} from './root-cmp'
import './assets/styles/main.scss'

import { createRoot } from 'react-dom/client'


const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <Provider store={store}>
      <Router>
        <RootCmp />
      </Router>
    </Provider>
)