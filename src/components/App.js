import React, { Component } from 'react';
import '../css/App.css';
import { Provider } from 'react-redux';
import configureStore from '../redux/store';
import AsyncApp from './AsyncApp';

const store = configureStore();

class App extends Component {

  render() {
      return (
        <Provider store={store}>
          <AsyncApp />
        </Provider>
    );
  }
}

export default App;
