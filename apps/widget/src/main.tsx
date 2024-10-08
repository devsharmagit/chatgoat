
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
window.renderWidget = (chatbotId) => {
  const container = document.getElementById(chatbotId);
  if (container) {
      console.log(container)
      createRoot(container).render(
        <App chatbotId={chatbotId} />
      )
  } else {
      console.error(`Container with id "${chatbotId}" not found.`);
  }
};

createRoot(document.getElementById('root')!).render(
    <App chatbotId="cm1jjv39z0001olra5aazi9eq" />
  ,
)
