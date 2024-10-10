import App from './App.tsx'
import './index.css'
import r2wc from "@r2wc/react-to-web-component"

const WebComponent = r2wc(App, {shadow: "closed", props: {chatbotid: "string"}});
customElements.define('widget-web-component', WebComponent);
