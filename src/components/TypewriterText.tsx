import React, { useState, useEffect, useCallback } from 'react';

const phrases = [
  "Legal Document Analysis",
  "Contract Review & Analysis",
  "Legal Research Assistant",
  "Compliance Monitoring",
  "Due Diligence Review",
  "Case Law Analysis",
  "Legal Risk Assessment",
  "Document Classification"
];

interface TypewriterTextProps {
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ className }) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);

  const nextPhrase = useCallback(() => {
    setPhraseIndex((current) => (current + 1) % phrases.length);
    setIsTyping(true);
    setText('');
  }, []);

  const typeCharacter = useCallback(() => {
    const currentPhrase = phrases[phraseIndex];
    setText((current) => {
      const next = currentPhrase.slice(0, current.length + 1);
      if (next === currentPhrase) {
        setIsWaiting(true);
        setTimeout(() => {
          setIsWaiting(false);
          setIsTyping(false);
        }, 2000);
      }
      return next;
    });
  }, [phraseIndex]);

  const deleteCharacter = useCallback(() => {
    setText((current) => {
      const next = current.slice(0, -1);
      if (next === '') {
        nextPhrase();
      }
      return next;
    });
  }, [nextPhrase]);

  useEffect(() => {
    if (isWaiting) return;

    const timer = setTimeout(
      () => {
        if (isTyping) {
          typeCharacter();
        } else {
          deleteCharacter();
        }
      },
      isTyping ? 100 : 50
    );

    return () => clearTimeout(timer);
  }, [isTyping, isWaiting, typeCharacter, deleteCharacter, text]);

  return (
    <span className={className}>
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-current align-middle animate-pulse ml-1">
      </span>
    </span>
  );
};

export default TypewriterText; 