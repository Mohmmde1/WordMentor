"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardTitle,
  CardHeader,
} from '@/components/ui/card';
import { X } from "lucide-react";

const Predictions = () => {
  const searchParams = useSearchParams();
  const [words, setWords] = useState([]);

  useEffect(() => {
    const wordsParam = searchParams.get('words');
    if (wordsParam) {
      setWords(JSON.parse(wordsParam));
    }
  }, [searchParams]);

  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Unknown Words</h1>
        <Card className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <CardDescription className="mb-4">
            These are words the app thinks you may not know. Remove the ones you do know.
          </CardDescription>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {words.map(word => (
              <Card key={word} className="bg-gray-100 dark:bg-gray-800 p-4 flex items-center justify-between">
                <div className="text-gray-700 dark:text-gray-300 font-medium">
                  {word}
                </div>
                <Button
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  size="icon"
                  variant="ghost"
                >
                  <X className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
};

export default Predictions;
