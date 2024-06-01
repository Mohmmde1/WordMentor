'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaForward, FaBackward } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Flashcard = ({ cardData }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = cardData.length;
  const currentCard = cardData[currentIndex];

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Card
        className="flip-card w-full h-[328px] max-w-[816px] md:h-[428px]"
        onClick={handleFlip}
      >
        <motion.div
          className="flip-card-inner w-[100%] h-[100%] cursor-pointer"
          initial={false}
          animate={{ rotateX: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.3, type: 'tween' }}
        >
          <div className="flip-card-front w-[100%] h-[100%] rounded-lg p-4 flex justify-center items-center">
            <div className="text-3xl sm:text-4xl">{currentCard.word}</div>
          </div>
          <div className="flip-card-back w-[100%] h-[100%] rounded-lg p-4 flex flex-col justify-center items-center">
            <div className="text-2xl sm:text-3xl mb-4">{currentCard.word}</div>
            <ul className="text-lg sm:text-xl">
              {Object.entries(currentCard.definitions).map(([pos, definition], index) => (
                definition && (
                  <li key={index} className="mb-2">
                    <strong>{pos}: </strong>{definition}
                  </li>
                )
              ))}
            </ul>
          </div>
        </motion.div>
      </Card>

      <div className="w-full h-full flex justify-center items-center font-semibold">
        <div className="relative flex justify-center items-center gap-28">
          <Button
            variant="ghost"
            size="lg"
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="hover: px-4 size-14 rounded-full custom-transition disabled:opacity-50"
          >
            <FaBackward className="size-6" />
          </Button>
          <div className="absolute">
            {currentIndex + 1} / {cardData.length}
          </div>
          <Button
            variant="ghost"
            size="lg"
            onClick={handleNext}
            disabled={currentIndex === total - 1}
            className="hover: px-4 size-14 rounded-full custom-transition disabled:opacity-50"
          >
            <FaForward className="size-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
