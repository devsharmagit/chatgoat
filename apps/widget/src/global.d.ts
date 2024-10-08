// src/global.d.ts
export {};

declare global {
    interface Window {
        renderWidget: ( chatbotId: string) => void;
    }
}
