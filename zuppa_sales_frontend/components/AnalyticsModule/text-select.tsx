/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint @typescript-eslint/no-unused-vars: off */
/* eslint jsx-a11y/click-events-have-key-events: off */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ChatbotService } from '@/lib/service';
import { auth } from '@/lib/auth';
import thambiIcon from '@/assests/thambi.svg';
import thambiGif from '@/assests/thambigif.gif';
import icon1 from '@/assests/icon1.png';
import icon2 from '@/assests/icon2.png';

type ChatMessage = {
  sender: 'user' | 'ai' | 'suggestion';
  text: string;
  id: string;
  description?: string;
  icon?: string;
};

type TextCaptureProps = {
  tooltip?: string;
  className?: string;
  endpoint?: string;
  token: string;
  apiKey: string;
};

export const TextCapture: React.FC<TextCaptureProps> = ({
  tooltip = 'AI Chatbot',
  endpoint = 'http://localhost:5000/rephrase',
  className,
  token,
  apiKey,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const initialSuggestions: ChatMessage[] = [
    {
      id: 'suggest-1',
      sender: 'suggestion',
      text: 'Rephrase Text',
      description: '',
      icon: 'icon2',
    },
    {
      id: 'suggest-2',
      sender: 'suggestion',
      text: 'Table insights & summary',
      description: '',
      icon: 'icon1',
    },
  ];

  const calculatePopupPosition = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const popupWidth = 375;
      const popupHeight = 620;
      const horizontalSpacing = 10;
      const verticalSpacing = 10;

      const fixedToolbarHeight = 75;

      let top = fixedToolbarHeight + verticalSpacing;
      let { left } = buttonRect;

      if (top + popupHeight > window.innerHeight) {
        top = Math.max(
          fixedToolbarHeight + verticalSpacing,
          window.innerHeight - popupHeight - verticalSpacing,
        );
      }

      if (left + popupWidth > window.innerWidth) {
        left = window.innerWidth - popupWidth - horizontalSpacing;
        if (left < 0) {
          left = horizontalSpacing;
        }
      }

      setPopupPosition({ top, left });
    }
  };

  const togglePopup = () => {
    if (!isPopupOpen) {
      calculatePopupPosition();
    }
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupPosition(null);
    setCurrentInput('');
    setIsLoading(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (isPopupOpen) {
        calculatePopupPosition();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isPopupOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement;
      if (
        isPopupOpen
        && buttonRef.current
        && !buttonRef.current.contains(targetElement)
        && !(targetElement && targetElement.closest('[style*="z-index: 9999"]'))
      ) {
        closePopup();
      }
    };

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  useEffect(() => {
    const styleId = 'thambi-chatbot-dynamic-styles';
    let styleTag = document.getElementById(styleId) as HTMLStyleElement | null;

    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    const cssContent = `
    .aiMessage h1 {
      font-size: 19px !important;
      margin-top: 0.6em !important;
      margin-bottom: 0.3em !important;
      font-weight: 600 !important;
      line-height: 1.3 !important;
      color: #2c3e50 !important;
    }

    .aiMessage h2 {
      font-size: 16px !important;
      margin-top: 0.6em !important;
      margin-bottom: 0.3em !important;
      font-weight: 600 !important;
      line-height: 1.3 !important;
      color: #2c3e50 !important;
    }

    .aiMessage h3,
    .aiMessage h4,
    .aiMessage h5,
    .aiMessage h6 {
      font-size: 13px !important;
      margin-top: 0.5em !important;
      margin-bottom: 0.3em !important;
      font-weight: 600 !important;
      line-height: 1.3 !important;
      color: #2c3e50 !important;
    }

    .aiMessage p {
      margin-top: 0.4em !important;
      margin-bottom: 0.4em !important;
      line-height: 1.4 !important;
      color: #333 !important;
      font-size: 13px !important;
    }

    .aiMessage ul,
    .aiMessage ol {
      margin-top: 0.4em !important;
      margin-bottom: 0.4em !important;
      padding-left: 18px !important;
    }

    .aiMessage li {
      margin-bottom: 0.2em !important;
      font-size: 13px !important;
      line-height: 1.4 !important;
    }

    .aiMessage a {
      color: #007bff !important;
      text-decoration: underline !important;
      font-size: 13px !important;
    }

    .aiMessage strong {
      font-weight: 600 !important;
      font-size: inherit !important;
    }

    .aiMessage em {
      font-style: italic !important;
      font-size: inherit !important;
    }

    .aiMessage pre,
    .aiMessage code {
      background-color: rgba(0,0,0,0.05) !important;
      padding: 2px 4px !important;
      border-radius: 3px !important;
      font-family: monospace !important;
      font-size: 12px !important;
    }
    
    .aiMessage pre {
      padding: 8px !important;
      overflow-x: auto !important;
    }

    /* Base font size for aiMessage container */
    .aiMessage {
      font-size: 13px !important;
    }
  `;

    styleTag.innerHTML = cssContent;
    return () => {
      if (styleTag && styleTag.parentNode) {
        styleTag.parentNode.removeChild(styleTag);
      }
    };
  }, []);

  const handleSendMessage = async () => {
    const trimmedInput = currentInput.trim();
    if (!trimmedInput) return;

    setIsLoading(true);
    setCurrentInput('');
    setChatHistory((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: 'user', text: trimmedInput },
    ]);

    let webpageContent = '';
    if (typeof document !== 'undefined') {
      webpageContent = document.body.innerText || '';
    }

    console.log('Sending webpage content length:', webpageContent.length);
    console.log('Sending user prompt:', trimmedInput);

    try {
      const payload: any = JSON.stringify({
        text: trimmedInput,
        webpageContent,
      });
      // const res = await ChatbotService.create(payload, apiKey, token);
      // console.log(res, 'RES');

      const response = await fetch('http://localhost:5000/rephrase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data.text);

      // const data = res?.data;
      let aiResponseText = data.text;

      // Strip inline styles from the HTML response to ensure our CSS applies
      aiResponseText = aiResponseText.replace(
        /\s*style\s*=\s*["'][^"']*["']/gi,
        '',
      );

      setChatHistory((prev) => [
        ...prev,
        {
          id: `${Date.now().toString()}-ai`,
          sender: 'ai',
          text: aiResponseText,
        },
      ]);
    } catch (error) {
      console.error('Error sending message to AI:', error);
      setChatHistory((prev) => [
        ...prev,
        {
          id: `${Date.now().toString()}-error`,
          sender: 'ai',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (text: string) => {
    setCurrentInput(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={togglePopup}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        type="button"
        title={tooltip}
        className={className}
        style={{
          backgroundColor: 'black',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50px',
          height: '50px',
          padding: 0,
          flexShrink: 0,
          position: 'relative',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <Image
          src={isHovered ? thambiGif : thambiIcon}
          alt="AI feather icon"
          width={50}
          height={50}
          style={{
            objectFit: 'contain',
            width: '50px',
            height: '50px',
            display: 'block',
            borderRadius: '50%',
          }}
          unoptimized={isHovered}
        />
      </button>
      {isPopupOpen
        && portalTarget
        && popupPosition
        && ReactDOM.createPortal(
          <div style={styles.popupContainer}>
            {/* Header with diagonal stripes pattern */}
            <div style={styles.header}>
              <div style={styles.headerLeft}>
                <Image
                  src={thambiGif}
                  alt="Thambi"
                  width={50}
                  height={50}
                  style={{ objectFit: 'contain', marginRight: '10px' }}
                />
                <span style={styles.appName}>Thambi</span>
              </div>
              <div style={styles.headerRight}>
                {/* <span style={styles.menuIcon}>⋮</span> */}
                <span style={styles.closeIcon} onClick={closePopup}>
                  ×
                </span>
              </div>
            </div>

            {/* Expandable "See what Thambi can do" */}
            <div style={styles.seeThambi}>
              <span style={styles.seeThambiText}>See what Thambi can do</span>
              <span style={styles.arrowIcon}>›</span>
            </div>

            {/* Chat Messages Container */}
            <div style={styles.chatMessagesContainer} ref={chatMessagesRef}>
              {chatHistory.length === 0 ? (
                <div style={styles.welcomeMessage}>
                  Hello! How can I help you today?
                </div>
              ) : (
                <>
                  {chatHistory.map((message) => (
                    <div
                      key={message.id}
                      style={
                        message.sender === 'user'
                          ? styles.userMessage
                          : styles.aiMessage
                      }
                      className={message.sender === 'ai' ? 'aiMessage' : ''}
                    >
                      {message.sender === 'user' ? (
                        message.text
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{ __html: message.text }}
                        />
                      )}
                    </div>
                  ))}
                </>
              )}

              {isLoading && (
                <div style={styles.aiMessage}>
                  <span>Analyzing</span>
                </div>
              )}
            </div>

            {/* Suggestions above input field */}
            {chatHistory.length === 0 && (
              <div style={styles.suggestionsContainer}>
                {initialSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    style={styles.suggestionButton}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                  >
                    <span style={styles.suggestionIconSmall}>
                      {suggestion.icon === 'icon1' ? (
                        <Image
                          src={icon1}
                          alt="Rephrase Icon"
                          width={16}
                          height={16}
                          style={{ objectFit: 'contain' }}
                        />
                      ) : suggestion.icon === 'icon2' ? (
                        <Image
                          src={icon2}
                          alt="Table Insights Icon"
                          width={16}
                          height={16}
                          style={{ objectFit: 'contain' }}
                        />
                      ) : (
                        suggestion.icon
                      )}
                    </span>
                    <span style={styles.suggestionTextSmall}>
                      {suggestion.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div style={styles.inputArea}>
              <input
                type="text"
                placeholder="Enter a prompt here"
                style={styles.inputField}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                style={styles.sendButton}
                disabled={isLoading || currentInput.trim() === ''}
              >
                <span style={styles.sendArrow}>↑</span>
              </button>
            </div>

            {/* Footer Disclaimer */}
            <div style={styles.disclaimer}>
              Thambi can make mistakes, so double-check it.
            </div>
          </div>,
          portalTarget,
        )}
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  popupContainer: {
    position: 'fixed',
    backgroundColor: '#f0f4f9',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
    width: '375px',
    maxWidth: '90vw',
    height: '620px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 9999,
    top: 85,
    right: 16,
  },
  header: {
    background: 'linear-gradient(135deg, #0D0D0D 0%, #0D0D0D 100%)',
    backgroundImage: `
      linear-gradient(135deg, #0D0D0D 0%, #0D0D0D 100%)`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 18px',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: '500',
    color: '#fff',
  },
  appName: {
    color: '#fff',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  menuIcon: {
    fontSize: '20px',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  closeIcon: {
    fontSize: '28px',
    fontWeight: '300',
    color: '#fff',
    cursor: 'pointer',
    lineHeight: '1',
  },
  seeThambi: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 18px',
    backgroundColor: '#f0f4f9',
    cursor: 'pointer',
    borderBottom: '1px solid #e8e8e8',
  },
  seeThambiText: {
    fontSize: '13px',
    color: '#666',
  },
  arrowIcon: {
    fontSize: '18px',
    color: '#999',
  },
  chatMessagesContainer: {
    flexGrow: 1,
    padding: '20px 18px',
    overflowY: 'auto',
    backgroundColor: '#f0f4f9',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    minHeight: 0, // Add this for proper flexbox scrolling
  },
  welcomeMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    color: '#333',
    padding: '10px 14px',
    borderRadius: '18px',
    maxWidth: '75%',
    wordBreak: 'break-word',
    fontSize: '14px',
    lineHeight: '1.4',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e3e3e3',
    color: '#333',
    padding: '10px 14px',
    borderRadius: '18px',
    maxWidth: '75%',
    wordBreak: 'break-word',
    fontSize: '14px',
    lineHeight: '1.4',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    color: '#333',
    padding: '10px 14px',
    borderRadius: '18px',
    maxWidth: '75%',
    wordBreak: 'break-word',
    lineHeight: '1.4',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
  },
  suggestionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '0 18px 12px 18px',
    backgroundColor: '#f0f4f9',
    flexShrink: 0, // Add this to prevent shrinking
  },
  suggestionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#fff',
    border: '1px solid #b7c2d8',
    borderRadius: '24px',
    padding: '12px 16px',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#29303F',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
    width: 'fit-content',
    minWidth: 'auto',
  },
  suggestionIconSmall: {
    fontSize: '16px',
  },
  suggestionTextSmall: {
    fontSize: '13px',
    color: '#29303F',
  },
  inputArea: {
    display: 'flex',
    padding: '16px 18px',
    backgroundColor: '#f0f4f9',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0, // Add this to prevent shrinking
  },
  inputField: {
    flexGrow: 1,
    border: '1px solid #b7c2d8',
    borderRadius: '24px',
    padding: '11px 16px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#f9f9f9',
    color: '#29303F',
  },
  sendButton: {
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '18px',
    padding: 0,
    flexShrink: 0,
  },
  sendArrow: {
    display: 'block',
    lineHeight: '1',
  },
  disclaimer: {
    fontSize: '11px',
    color: '#999',
    textAlign: 'center',
    padding: '12px 18px',
    borderTop: '1px solid #e8e8e8',
    backgroundColor: '#fff',
    borderBottomLeftRadius: '16px',
    borderBottomRightRadius: '16px',
    flexShrink: 0, // Add this to prevent shrinking
  },
};
