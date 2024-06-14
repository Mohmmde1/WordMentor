'use client';
import {useEffect, useState} from 'react';
import Flashcard from '@/app/sessions/_components/Flashcard';

export default function Flashcards({prediction, flashcards}) {
  
  return (
    <div className="w-full rounded-lg p-4 lg:p-6">
      <div className="mb-12 space-y-5">
        <div className="space-y-1.5">

          {prediction &&
            <h1 className="text-2xl sm:text-4xl font-bold">
              {prediction.title}
            </h1>}
        </div>

        {flashcards.length > 0
          ? <Flashcard cardData={flashcards} />
          : <p>No flashcards available for this prediction.</p>}
      </div>

      <section className="space-y-5">
        <h2 className="text-xl font-bold">
          Terms in this set ({flashcards.length})
        </h2>
        <ul className="space-y-2">
          {flashcards.map ((item, i) => (
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
