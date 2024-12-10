document.addEventListener("DOMContentLoaded", function () {
    const sendBtn = document.getElementById("sendBtn");
    const userInput = document.getElementById("userInput");
    const responseContainer = document.getElementById("responseContainer");

    // Verifica que los elementos existan antes de usarlos
    if (!sendBtn || !userInput || !responseContainer) {
        console.error("Elementos necesarios no encontrados en el DOM.");
        return;
    }

    // Acción al hacer clic en el botón de enviar
    sendBtn.addEventListener("click", function () {
        const message = userInput.value.trim();
        if (message === "") {
            alert("Por favor, escribe un mensaje.");
            return;
        }

        appendMessage("Usuario", message);
        userInput.value = "";

        // Simular retraso para la respuesta del chatbot
        setTimeout(() => {
            const botResponse = getChatGPTResponse(message);
            appendMessage("Chatbot", botResponse);
        }, 1000);
    });

    // Generar respuesta del chatbot
    function getChatGPTResponse(message) {
        const responses = {
            "hola": "¡Hola! ¿Cómo puedo ayudarte hoy?",
            "qué es tu servicio": "Ofrecemos soluciones tecnológicas personalizadas para empresas, enfocándonos en eficiencia y calidad.",
            "cómo puedo contactarlos": "Puedes contactarnos a través de nuestro formulario de contacto en esta página o por email a contacto@ejemplo.com.",
            "gracias": "¡De nada! Si tienes alguna otra pregunta, no dudes en preguntar.",
            "default": "Lo siento, no entendí tu mensaje. ¿Puedes reformularlo?"
        };

        const lowerMessage = message.toLowerCase();
        for (let key in responses) {
            if (lowerMessage.includes(key)) {
                return responses[key];
            }
        }
        return responses["default"];
    }

    // Añadir mensaje al contenedor de respuestas
    function appendMessage(sender, message) {
        if (!responseContainer) {
            console.error("El contenedor de respuestas no existe.");
            return;
        }
        const messageElement = document.createElement("div");
        messageElement.className = "message";
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        messageElement.classList.add(sender === "Usuario" ? "text-primary" : "text-success");
        responseContainer.appendChild(messageElement);
        responseContainer.scrollTop = responseContainer.scrollHeight; // Auto-scroll al final
    }
});
