'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaForward, FaBackward } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Flashcard = ({ cardData, handleLearnedWord }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cardBack, setCardBack] = useState('');

  const total = cardData.length;
  const currentCard = cardData[currentIndex];

  // Effect to update cardBack when currentIndex changes
  useEffect(() => {
    setIsFlipped(false); // Ensure card is always front-side up when switching cards
    setIsAnimating(false); // Reset animation state
    setCardBack(currentCard.definitions); // Update cardBack with current card definitions
    setProgress(((currentIndex + 1) / total) * 100); // Update progress bar
  }, [currentIndex, cardData]);

  // Flip card
  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped((prev) => !prev);
    }
  };

  // Next card
  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      handleLearnedWord(currentCard.word, true); // Call handleLearnedWord with current word
    }
  };

  // Previous card
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      handleLearnedWord(currentCard.word, false); // Call handleLearnedWord with current word
      
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowLeft':
          handleBack();
          break;
        case ' ':
          event.preventDefault();
          handleFlip();
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Card
        className="flip-card w-full h-[328px] max-w-[816px] md:w-[500px] md:h-[200px]"
        onClick={handleFlip}
      >
        {/* Flashcard */}
        <motion.div
          className="flip-card-inner w-[100%] h-[100%] cursor-pointer"
          initial={false}
          animate={{ rotateX: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.3, type: 'tween' }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <div className="flip-card-front w-[100%] h-[100%] rounded-lg p-4 flex justify-center items-center">
            <div className="text-3xl sm:text-4xl">{currentCard.word}</div>
          </div>
          <div className="flip-card-back w-[100%] h-[100%] rounded-lg p-4 flex justify-center items-center">
            <div className="text-3xl sm:text-4xl md:text-sm">{cardBack}</div>
          </div>
        </motion.div>
      </Card>

      {/* Flashcard Controls */}
      <div className="w-full h-full flex justify-center items-center font-semibold">
        <div className="relative flex justify-center items-center gap-28">
          {/* Back */}
          <Button
            variant="ghost"
            size="lg"
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="hover:bg-gray-200 px-4 rounded-full disabled:opacity-50"
          >
            <FaBackward className="text-xl" />
          </Button>
          <div className="absolute">
            {currentIndex + 1} / {total}
          </div>
          {/* Next */}
          <Button
            variant="ghost"
            size="lg"
            onClick={handleNext}
            disabled={currentIndex === total - 1}
            className="hover:bg-gray-200 px-4 rounded-full disabled:opacity-50"
          >
            <FaForward className="text-xl" />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full rounded-2xl bg-gray-300 mt-4">
        <div
          className="h-full bg-green-500 rounded-2xl"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Flashcard;
