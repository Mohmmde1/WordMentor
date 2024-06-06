'use client';

import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {Card, CardDescription} from '@/components/ui/card';
import {X, ChevronLeft, ChevronRight} from 'lucide-react';
import {Form} from '@/components/ui/form';
import {Skeleton} from '@/components/ui/skeleton';
import {addToKnownWords, getLastPrediction, updateWordStatus} from '@/lib/actions';
import { useRouter } from 'next/navigation';
const Predictions = () => {
  const router = useRouter ();
  const [predictionId, setPredictionId] = useState (null);
  const [unknownWords, setUnknownWords] = useState ([]);
  const [knownWords, setknownWords] = useState ([]);
  const [loading, setLoading] = useState (true);

  useEffect (() => {
    const fetchWords = async () => {
      try {
        const response = await getLastPrediction ();
        console.log (response);
        const fetched_words = response.unknown_words;
        setPredictionId (response.id);
        setUnknownWords (fetched_words);
      } catch (error) {
        console.error ('Error fetching unknown words:', error);
      } finally {
        setLoading (false);
      }
    };

    fetchWords ();
  }, []);


  const moveToKnown =  wordToRemove => {
    setUnknownWords (unknownWords.filter (word => word !== wordToRemove));
    setknownWords ([...knownWords, wordToRemove]);
  };
  const moveToUnknown =  wordToRemove => {
    setknownWords (knownWords.filter (word => word !== wordToRemove));
    setUnknownWords ([...unknownWords, wordToRemove]);
  };
  const schema = z.object ({});

  const form = useForm ({
    resolver: zodResolver (schema),
    mode: 'onChange',
  });

  const onSubmit = async formData => {
    setLoading(true);
    try {
      // Handle form submission, such as generating flashcards
      console.log('Form data:', formData);
      console.log('Known words:', knownWords);
      console.log('Unknown words:', unknownWords);
  
      // Add known words to the database and wait for all updates to complete
      const updatePromises = knownWords.map(word => updateWordStatus(word, "known", predictionId));
      await Promise.all(updatePromises);
  
      // Navigate to the flashcards page after all updates are done
      router.push(`/flashcards/${predictionId}`);
    } catch (error) {
      console.error('Error generating flashcards:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <main className=" container mx-auto py-12 px-4 md:px-6 ">
      <div className="flex  justify-between space-x-2">

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Unknown Words</h1>
          <Card className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <CardDescription className="mb-4">
              These are words the app thinks you may not know. Remove the ones you do know.
            </CardDescription>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 ">
              {loading
                ? [...Array (12)].map ((_, index) => (
                    <Skeleton key={index} className="h-20 w-full" />
                  ))
                : unknownWords.length > 0
                    ? unknownWords.map (word => (
                        <Card
                          key={word}
                          className="bg-gray-100 dark:bg-gray-800 p-4 flex items-center justify-between"
                        >
                          <div className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                            {word}
                          </div>
                          <Button
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            size="icon"
                            variant="ghost"
                            onClick={async () => moveToKnown (word)}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Card>
                      ))
                    : <div className="text-gray-700 dark:text-gray-300 font-medium">
                        No unknown words
                      </div>}
            </div>
          </Card>

        </div>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Known Words</h1>
          <Card className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <CardDescription className="mb-4">
              These are words the you have selected as known. Move them back to unknown if you want.
            </CardDescription>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 ">
              {loading
                ? [...Array (12)].map ((_, index) => (
                    <Skeleton key={index} className="h-20 w-full" />
                  ))
                : knownWords.length > 0
                    ? knownWords.map (word => (
                        <Card
                          key={word}
                          className="bg-gray-100 dark:bg-gray-800 p-4 flex items-center justify-between"
                        >
                          <div className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                            {word}
                          </div>
                          <Button
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            size="icon"
                            variant="ghost"
                            onClick={async () => moveToUnknown (word)}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                        </Card>
                      ))
                    : <div className="text-gray-700 dark:text-gray-300 font-medium">
                        No known words
                      </div>}
            </div>
          </Card>

        </div>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col space-y-4 mt-6"
          onSubmit={form.handleSubmit (onSubmit)}
        >

          <div className="flex justify-end">
            <Button type="submit" className="mt-4" disabled={loading}>
              {loading ? 'Loading...' : 'Generate Flashcards'}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default Predictions;
