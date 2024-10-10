import App from './App.tsx'
import './index.css'
import r2wc from "@r2wc/react-to-web-component"
import {createRoot} from "react-dom/client";

const WebComponent = r2wc(App, {shadow: "open", props: {chatbotid: "string"}});
customElements.define('widget-web-component', WebComponent);

createRoot(document.getElementById("root")!).render(
    <App chatbotid='cm1jjv39z0001olra5aazi9eq'/>
)