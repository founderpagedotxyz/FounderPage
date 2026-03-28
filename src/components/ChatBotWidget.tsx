import { useEffect } from "react";

const ChatBotWidget = () => {
  useEffect(() => {
    // 1. Crear el iframe
    const iframe = document.createElement("iframe");

    // 2. Función para inyectar estilos
    const iframeStyles = (styleString: string) => {
      const style = document.createElement("style");
      style.textContent = styleString;
      document.head.append(style);
      return style; // Guardamos referencia para limpiar
    };

    // Inyectamos tus estilos (escala 0.8 y posición 20px)
    const styleElement = iframeStyles(`
        .chat-frame {
            position: fixed;
            bottom: 20px;
            right: 20px;
            border: none;
            transform: scale(0.8);
            transform-origin: bottom right;
            z-index: 9999;
        }
    `);

    // 3. Configurar el iframe
    iframe.src = "http://localhost:3000/chatbot";
    iframe.classList.add("chat-frame");
    document.body.appendChild(iframe);

    // 4. Escuchador de mensajes
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== "http://localhost:3000") return;
      
      try {
        const dimensions = JSON.parse(e.data);
        iframe.width = dimensions.width;
        iframe.height = dimensions.height;
        
        // Enviamos el ID específico que proporcionaste
        iframe.contentWindow?.postMessage(
          "03d9565b-916c-41f4-90e4-f5baeef8ec57",
          "http://localhost:3000/"
        );
      } catch (err) {
        // Ignorar si el mensaje no es JSON válido
      }
    };

    window.addEventListener("message", handleMessage);

    // 5. Limpieza (Cleanup)
    return () => {
      window.removeEventListener("message", handleMessage);
      if (document.body.contains(iframe)) document.body.removeChild(iframe);
      if (document.head.contains(styleElement)) document.head.removeChild(styleElement);
    };
  }, []);

  return null; // El componente no renderiza HTML propio, solo inyecta el script
};

export default ChatBotWidget;