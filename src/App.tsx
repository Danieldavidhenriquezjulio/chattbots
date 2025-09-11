import React, { useState, useEffect } from 'react'
import './App.css'
import { validateSentence, getExamples, type ValidationResult } from './validator'

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  validationResult?: ValidationResult;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [userName, setUserName] = useState('');
  const [isValidationMode, setIsValidationMode] = useState(false);
  const [conversationStage, setConversationStage] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Mensaje inicial del bot al cargar la página
    const initialMessage: Message = {
      id: 1,
      text: "Hello! I'm Botsito, an English Grammar Bot specializing in the verb TO BE. What's your name?",
      isBot: true,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, []);

  const showTypingIndicator = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const enviar = () => {
    if (inputValue.trim() === '') return;

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    let nombreExtraido = userName;

      // Si es la primera respuesta del usuario, guardar el nombre
      if (conversationStage === 0 && !userName) {
          let nombre = "";
          const palabras = inputValue.split(" ");
          for (let i = 0; i < palabras.length; i++) {
              if (/^[A-Z]/.test(palabras[i])) {
                  if (nombre === "") {
                      nombre = nombre + palabras[i];
                  } else {
                      nombre = nombre + " " + palabras[i];
                  }
              }
          }
          
          // Validar que se haya detectado un nombre válido
          if (nombre === "") {
              // No se detectó ningún nombre válido (que comience con mayúscula)
              const errorMessage: Message = {
                  id: messages.length + 2,
                  text: "I couldn't detect a valid name in your message. Please make sure to include your name with the first letter capitalized (e.g., 'John', 'Maria', 'Alex').",
                  isBot: true,
                  timestamp: new Date()
              };
              
              setMessages(prev => [...prev, userMessage, errorMessage]);
              setInputValue('');
              
              // Reset textarea height
              setTimeout(() => {
                  const textarea = document.querySelector('.chat-input') as HTMLTextAreaElement;
                  if (textarea) {
                      textarea.style.height = '40px';
                  }
              }, 0);
              
              return; // Salir de la función sin continuar
          }
          
          nombreExtraido = nombre;
          setUserName(nombreExtraido);
          setConversationStage(1);
      }

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Reset textarea height después de enviar
    setTimeout(() => {
      const textarea = document.querySelector('.chat-input') as HTMLTextAreaElement;
      if (textarea) {
        textarea.style.height = '40px';
      }
    }, 0);

    // Mostrar indicador de escritura
    showTypingIndicator();

    // Respuesta automática del bot
    setTimeout(() => {
      let botResponse;
      let newStage = conversationStage;

      if (conversationStage === 0) {
        // Primera respuesta después del saludo inicial
        botResponse = `Nice to meet you, ${nombreExtraido}! I can help you validate English sentences using the verb TO BE in present and past tense. Would you like to start practicing? (Type 'yes' to begin or 'examples' to see some examples)`;
        newStage = 1;
      } else if (conversationStage === 1) {
        // Usuario responde si quiere practicar
        const userResponse = inputValue.toLowerCase().trim();
        if (userResponse.includes('yes') || userResponse.includes('start') || userResponse.includes('practice')) {
          botResponse = `Excellent! Now you can send me English sentences using the verb TO BE (am, are, is, was, were) and I'll validate them for grammatical correctness.\n\nPlease enter a sentence to validate.`;
          setIsValidationMode(true);
          newStage = 2;
        } else if (userResponse.includes('example')) {
          const examples = getExamples();
          botResponse = `Here are some example sentences with the verb TO BE:\n\n${examples.slice(0, 8).join('\n')}\n\nNow try creating your own sentence! Type 'yes' when you're ready to start practicing.`;
        } else {
          botResponse = `I understand, ${userName}. When you're ready to practice English sentences with the verb TO BE, just type 'yes' or 'start'. You can also type 'examples' to see sample sentences.`;
        }
      } else if (isValidationMode) {
        // Modo validación activo
        const validation = validateSentence(inputValue);

        if (inputValue.toLowerCase().includes('stop') || inputValue.toLowerCase().includes('exit') || inputValue.toLowerCase().includes('quit')) {
          botResponse = `Thank you for practicing with me, ${userName}! I hope this session helped you understand the verb TO BE better. Feel free to return anytime for more practice.`;
          setIsValidationMode(false);
          newStage = 3;
        } else {
          // Construir respuesta con corrección si es necesario
          let responseText = validation.message;

          if (validation.isValid) {
            responseText += `\n\nExcellent! That's a ${validation.type} sentence in ${validation.tense} tense.`;
          } else {
            responseText += `\n\nLet me help you improve this sentence:`;
            if (validation.correction) {
              responseText += `\nCorrect version: "${validation.correction}"`;
            }
            responseText += `\n\nReminder: Check subject-verb agreement with TO BE verbs.`;
          }

          responseText += `\n\nPlease try another sentence or type 'stop' to end the session.`;

          botResponse = responseText;

          // Agregar el resultado de validación al mensaje del usuario
          setMessages(prev => {
            const updatedMessages = [...prev];
            updatedMessages[updatedMessages.length - 1].validationResult = validation;
            return updatedMessages;
          });
        }
      } else {
        // Conversación general después de la práctica
        botResponse = `Thank you for using the English Grammar Bot, ${userName}! If you'd like to practice more sentences with the verb TO BE, please let me know.`;
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setConversationStage(newStage);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviar();
    }
  };

  // Auto-resize textarea mejorado
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setInputValue(textarea.value);

    // Auto-resize con mejor control
    textarea.style.height = 'auto';
    const newHeight = Math.min(Math.max(textarea.scrollHeight, 40), 120);
    textarea.style.height = `${newHeight}px`;
  };

  // Scroll automático al final cuando se agregan mensajes
  useEffect(() => {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      // Usar requestAnimationFrame para asegurar que el DOM se haya actualizado
      requestAnimationFrame(() => {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: 'smooth'
        });
      });
    }
  }, [messages, isTyping]);

  // Función para abrir el PDF
  const openPDF = () => {
    window.open('/chattbots/doc.pdf', '_blank');
  };

  return (
    <div className="chat-app">
      {/* Header moderno estilo WhatsApp Business */}
      <div className="chat-header">
        <div className="chat-avatar">
          BOT
        </div>
        <div className="chat-header-info">
          <h1 className="chat-title">English Grammar Bot</h1>
          <div className="chat-subtitle">
            {userName ? `Chatting with ${userName}` : 'TO BE Validator'}
          </div>
        </div>
        <div className="chat-actions">
          {isValidationMode && (
            <div className="status-indicator">
              <div className="status-dot"></div>
              Validation Active
            </div>
          )}
          <button
            onClick={openPDF}
            className="pdf-button"
            title="Abrir documentación PDF"
          >
            <svg className="icon" viewBox="0 0 24 24" width="20" height="20">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" fill="currentColor"/>
            </svg>
            PDF
          </button>
        </div>
      </div>

      {/* Área de mensajes estilo WhatsApp */}
      <div className="chat-container">
        <div className="messages-wrapper">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.isBot ? 'bot' : 'user'}`}
            >
              <div className={`message-avatar ${message.isBot ? 'bot' : 'user'}`}>
                {message.isBot ? 'BOT' : (userName ? userName.charAt(0).toUpperCase() : 'U')}
              </div>
              <div
                className={`message-bubble ${message.isBot ? 'bot' : 
                  message.validationResult
                    ? message.validationResult.isValid
                      ? 'valid'
                      : 'invalid'
                    : 'user'
                }`}
              >
                <div className="message-text">{message.text}</div>
                <div className="message-meta">
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  {message.validationResult && (
                    <div className="validation-status">
                      {message.validationResult.isValid ? 'Valid' : 'Invalid'} -
                      {message.validationResult.type} ({message.validationResult.tense})
                    </div>
                  )}
                  {!message.isBot && (
                    <div className="message-status">
                      <span>✓✓</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Indicador de escritura moderno */}
          {isTyping && (
            <div className="typing-indicator">
              <div className="typing-dots">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
              <span className="typing-text">Botsito is typing...</span>
            </div>
          )}
        </div>
      </div>

      {/* Input moderno estilo WhatsApp */}
      <div className="input-area">
        <div className="input-container">
          <textarea
            className="chat-input"
            placeholder={isValidationMode ? "Enter an English sentence with TO BE..." : "Type your message..."}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
          />
        </div>
        <button
          onClick={enviar}
          className="send-button"
          disabled={!inputValue.trim()}
        >
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default App
