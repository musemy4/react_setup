import 'bootstrap/dist/css/bootstrap.min.css';
import './common/css/common.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';

import configureStore from './store/store';


import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();
const store = configureStore(history);



ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={ history }>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();