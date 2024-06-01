'use client';

import { getPrediction } from "@/lib/actions";
import { useEffect, useState } from "react";
import Flashcard from '@/components/Flashcard';
import { parseAndTransformDefinitions } from "@/lib/utils";

export default function FlashcardPage({ params }) {
  const { predictionId } = params;
  const [prediction, setPrediction] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPrediction(predictionId)
      .then(data => {
        setPrediction(data);

        const flashcardData = Object.entries(data.unknown_words).map(([word, definitions]) => {
          try {
            console.log(`Parsing definitions for word "${word}":`, definitions);
            return {
              word,
              definitions: parseAndTransformDefinitions(definitions)
            };
          } catch (e) {
            console.error(`Error parsing definitions for word "${word}":`, e);
            setError(`Error parsing definitions for word "${word}"`);
            return {
              word,
              definitions: {}
            };
          }
        });
        console.log("Setting flashcards:", flashcardData);
        setFlashcards(flashcardData);
      })
      .catch(error => {
        console.error("Error fetching prediction:", error);
        setError("Failed to fetch prediction data.");
      });
  }, [predictionId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!prediction) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <h1>Flashcards</h1>
      <Flashcard cardData={flashcards} />
    </div>
  );
}
