import ReactDOM from 'react-dom/client';
import App from './App';
import ReactGA from 'react-ga';

// Initialize react-ga with your Google Analytics tracking ID
ReactGA.initialize('YOUR-GOOGLE-ANALYTICS-MEASUREMENT-ID');
ReactGA.pageview(window.location.pathname + window.location.search);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
