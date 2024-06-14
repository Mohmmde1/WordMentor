'use client';
import {useState} from 'react';
import Flashcard from '@/app/sessions/_components/Flashcard';
import {Button} from '@/components/ui/button';
import {updateWordsStatus} from '@/lib/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
export default function Flashcards({prediction, flashcards}) {
  const router = useRouter();
  const [learnedWords, setLearnedWords] = useState ({});

  const handleLearnedWord = (word, optionalState = null) => {
    setLearnedWords (prevLearnedWords => ({
      ...prevLearnedWords,
      [word]: optionalState !== null ? optionalState : !prevLearnedWords[word],
    }));
  };

  const handleSubmitLearnedWords = async () => {
    const learnedWordList = Object.keys (learnedWords).filter (
      word => learnedWords[word]
    );
    try {
      const response = updateWordsStatus (learnedWordList);
      if(response){
        toast("Words have been successuflly updated")
        router.push("/")
      }
    } catch (error) {
      console.error ('Error Submitting Learned Words: ', error);
    }
  };

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
          ? <Flashcard
              cardData={flashcards}
              handleLearnedWord={handleLearnedWord}
            />
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
              className="grid sm:grid-cols-3 items-center gap-4 rounded-lg p-4 lg:p-6"
            >
              <div className="text-2xl">{item.word}</div>
              <div className="text-lg">{item.definitions}</div>
              <Button
                onClick={() => handleLearnedWord (item.word)}
                className={` ${learnedWords[item.word] && 'bg-green-500'}`}
              >
                {learnedWords[item.word] ? 'Learned' : 'Mark as Learned'}
              </Button>
            </li>
          ))}
        </ul>
      </section>

      {/* Submit Button */}
      <div className="mt-8 flex justify-center">
        <Button onClick={handleSubmitLearnedWords}>
          Submit Learned Words
        </Button>
      </div>
    </div>
  );
}
