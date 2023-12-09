import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import enJSON from './locales/en/en.json'
import frJSON from './locales/fr/fr.json'

i18next.init({
    lng: 'en',
    resources: {
      en: {...enJSON},
      fr: {...frJSON}
    }
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <I18nextProvider i18n={i18next}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </I18nextProvider>
);

reportWebVitals();
