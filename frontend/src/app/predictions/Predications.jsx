'use client';

import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {Card, CardDescription} from '@/components/ui/card';
import {X} from 'lucide-react';
import {Form} from '@/components/ui/form';
import {Skeleton} from '@/components/ui/skeleton';
import {addToKnownWords} from '@/lib/actions';

const Predictions = () => {
  const searchParams = useSearchParams ();
  const [words, setWords] = useState ([]);
  const [loading, setLoading] = useState (true);

  useEffect (
    () => {
      const wordsParam = searchParams.get ('words');
      if (wordsParam) {
        setWords (JSON.parse (wordsParam));
      }
      setLoading (false);
    },
    [searchParams]
  );

  const removeWord = async wordToRemove => {
    setWords (words.filter (word => word !== wordToRemove));
    try {
      await addToKnownWords (wordToRemove);
    } catch (error) {
      console.error ('Error adding word to known words:', error);
    }
  };

  const schema = z.object ({});

  const form = useForm ({
    resolver: zodResolver (schema),
    mode: 'onChange',
  });

  const onSubmit = async formData => {
    setLoading (true);
    try {
      // Handle form submission, such as generating flashcards
      console.log ('Generating flashcards with words:', words);
    } catch (error) {
      console.error ('Error generating flashcards:', error);
    } finally {
      setLoading (false);
    }
  };

  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Unknown Words</h1>
        <Card className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <CardDescription className="mb-4">
            These are words the app thinks you may not know. Remove the ones you do know.
          </CardDescription>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {loading
              ? [...Array (12)].map ((_, index) => (
                  <Skeleton key={index} className="h-10 w-full" />
                ))
              : words.map (word => (
                  <Card
                    key={word}
                    className="bg-gray-100 dark:bg-gray-800 p-4 flex items-center justify-between"
                  >
                    <div className="text-gray-700 dark:text-gray-300 font-medium">
                      {word}
                    </div>
                    <Button
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      size="icon"
                      variant="ghost"
                      onClick={async () => removeWord (word)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </Card>
                ))}
          </div>
        </Card>

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
      </div>
    </main>
  );
};

export default Predictions;
