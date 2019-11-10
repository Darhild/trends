import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import Header from './components/Header/Header';
import Categories from './components/Categories/Categories';
import Channels from './components/Channels/Channels';
import Main from './pages/Main/Main';
import TrendsPage from './pages/TrendsPage/TrendsPage';
import store from './store/createStore';

const App: React.FC = () =>
    (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Header />
                    <Categories />
                    <div className="App-Main">
                        <Channels />
                        <div className="App-Content">
                            <Switch>
                                <Route path="/:category/trends" component={TrendsPage} />
                                <Route path="/:category?" component={Main} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        </Provider>
    );

export default App;
