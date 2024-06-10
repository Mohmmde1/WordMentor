'use client'
import { getPrediction } from '@/lib/actions';
import { useEffect, useState } from 'react';
import Flashcard from '@/components/Flashcard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
            return {
              word,
              definitions: definitions,
            };
          } catch (e) {
            console.error(`Error parsing definitions for word "${word}":`, e);
            setError(`Error parsing definitions for word "${word}"`);
            return {
              word,
              definitions: {},
            };
          }
        });
        setFlashcards(flashcardData);
      })
      .catch(error => {
        console.error('Error fetching prediction:', error);
        setError('Failed to fetch prediction data.');
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!prediction) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full rounded-lg p-4 lg:p-6">
      <div className="mb-12 space-y-5">
        <div className="space-y-1.5">
          {/* Back link */}
          <Link
            href={`/flashcards`}
            className="flex items-center gap-2 text-lg font-semibold custom-transition"
          >
            <ArrowLeft /> Back
          </Link>
          <h1 className="text-2xl sm:text-4xl font-bold">{prediction.title}</h1>
        </div>

        {flashcards.length > 0 ? (
          <Flashcard cardData={flashcards} />
        ) : (
          <p>No flashcards available for this prediction.</p>
        )}
      </div>

      <section className="space-y-5">
        <h2 className="text-xl font-bold">Terms in this set ({flashcards.length})</h2>
        <ul className="space-y-2">
          {flashcards.map((item, i) => (
            <li
              key={`${item}-${i}`}
              className="grid sm:grid-cols-2 items-center gap-4 rounded-lg  p-4 lg:p-6"
            >
              <div className="text-2xl">{item.word}</div>
              <div className="text-lg">{item.definitions}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
