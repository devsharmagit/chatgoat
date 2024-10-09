import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

  const container = document.getElementById("chatgoatroot");
  const chatbotId = container?.getAttribute("data-chatbotId")
  if (container && chatbotId) {
      createRoot(container).render(
        <App chatbotId={chatbotId} />
      )
  } else {
      console.error(`Container with id "${chatbotId}" not found.`);
  }

createRoot(document.getElementById('root')!).render(
    <App chatbotId="cm1jjv39z0001olra5aazi9eq" />
  ,
)
