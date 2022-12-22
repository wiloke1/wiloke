import App from 'App';
import { render } from 'react-dom';
import { useDispatch } from 'react-redux';
import { getUseDispatchRedux } from 'wiloke-react-core/utils';
import reportWebVitals from './reportWebVitals';
import './wdyr';

getUseDispatchRedux(useDispatch);

const rootElement = document.getElementById('veda-root') as HTMLElement;

render(<App />, rootElement);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
