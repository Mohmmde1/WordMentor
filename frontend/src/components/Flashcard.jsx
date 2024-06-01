'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaForward, FaBackward } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import {Card} from '@/components/ui/card';


const Flashcard = ({ cardData }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const total = cardData.length;
  const currentCard = cardData[currentIndex];
  const [cardBack, setCardBack] = useState(currentCard.definitions);

  // Delay changing the card back by 150ms to allow the flip animation to complete
  useEffect(() => {
    console.log(currentCard, currentCard.definitions)
    setTimeout(() => {
      setCardBack(currentCard.definitions);
    }, 150);
  }, [currentIndex]);

  // Flip card
  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped((prev) => !prev);
    }
  };

  // Next card
  const handleNext = () => {
    if (currentIndex === total - 2 || currentIndex > total - 2) {
      setCurrentIndex(total - 1);
      setProgress(100);
    } else if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress((prev) => prev + 100 / (total - 1));
    }
    if (currentIndex !== total - 1) {
      setIsFlipped(false);
    }
  };

  // Previous card
  const handleBack = () => {
    if (currentIndex === 1 || currentIndex < 1) {
      setCurrentIndex(0);
      setProgress(0);
    } else if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress((prev) => prev - 100 / (total - 1));
    }
    if (currentIndex !== 0) {
      setIsFlipped(false);
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
        className="flip-card w-full h-[328px] max-w-[816px] md:w-[500px] md:h-[200px] "
        onClick={handleFlip}
      >
        {/* Flashcard */}
        <motion.div
          className="flip-card-inner w-[100%] h-[100%] cursor-pointer"
          initial={false}
          animate={{ rotateX: isFlipped ? 180 : 360 }}
          transition={{ duration: 0.1, type: 'tween', animationDirection: 'normal' }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <div className="flip-card-front w-[100%] h-[100%] 
           rounded-lg p-4 flex justify-center items-center">
            <div className="text-3xl sm:text-4xl">{currentCard.word}</div>
          </div>
          <div className="flip-card-back w-[100%] h-[100%] 
           rounded-lg p-4 flex justify-center items-center">
            <div className="text-3xl sm:text-4xl md:text-sm lg:text-xl ">{cardBack}</div>
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
            onClick={() => handleBack()}
            disabled={currentIndex === 0}
            className=" hover:
              px-4 size-14 rounded-full custom-transition disabled:opacity-50"
          >
            <FaBackward className="size-6" />
          </Button>
          <div className="absolute">
            {currentIndex + 1} / {cardData.length}
          </div>
          {/* Next */}
          <Button
            variant="ghost"
            size="lg"
            onClick={() => handleNext()}
            disabled={currentIndex === total - 1}
            className=" hover:
              px-4 size-14 rounded-full custom-transition disabled:opacity-50"
          >
            <FaForward className="size-6" />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className=" h-2 w-full rounded-2xl bg-slate-400">
        <div
          className="h-full bg-violet-500 rounded-2xl custom-transition "
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Flashcard;