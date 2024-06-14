'use client'
import { useState, useMemo } from 'react';
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { format } from 'date-fns';
import {ChevronRightIcon} from 'lucide-react';
export default function Collections({predictions}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');

 
  const filteredPredictions = useMemo(() => {
    return predictions.filter((prediction) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        prediction.title.toLowerCase().includes(lowerCaseQuery) ||
        prediction.from.toLowerCase().includes(lowerCaseQuery) ||
        prediction.fromPage.toString().includes(lowerCaseQuery) ||
        prediction.toPage.toString().includes(lowerCaseQuery) ||
        format(new Date(prediction.date), 'MMM dd, yyyy').toLowerCase().includes(lowerCaseQuery) ||
        prediction.noFlashcards.toString().includes(lowerCaseQuery)
      );
    });
  }, [searchQuery, predictions]);

  const sortedPredictions = useMemo(() => {
    return filteredPredictions.sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'flashcards':
          return b.noFlashcards - a.noFlashcards;
        default:
          return 0;
      }
    });
  }, [sortOption, filteredPredictions]);

  // Ensure consistent date formatting
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <div>

    
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sessions</h1>
        <div className="flex items-center space-x-4">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="flashcards">Flashcards</SelectItem>
            </SelectContent>
          </Select>
          <Input
            className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
            placeholder="Search predictions..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedPredictions.map((prediction, index) => (
          <Card
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4">
              <CardTitle className="text-lg font-bold mb-2">
                {prediction.title}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 mb-4">
                This prediction was generated from {prediction.from}, from page {prediction.fromPage} to page {prediction.toPage}, on {formatDate(prediction.date)}
              </CardDescription>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400">
                  {prediction.noFlashcards} flashcards
                </span>
                <a href={`/sessions/${prediction.id}`}>
                  <ChevronRightIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
      </div>
  );
}

