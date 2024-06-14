import {Suspense} from 'react';
import StatisticsSkeleton from './_skeletons/StatisticsSkeleton';
import StatisticsSuspense from './_suspenses/StatisticsSuspense';
import BooksPredictionsListing from './_components/books-predictions-listing/BooksPredictionsListing';
import WordsListing from './_components/words-listing/WordsListing';

export default async function Page () {
  return (
    <div className="flex  w-full flex-col ">

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Suspense fallback={<StatisticsSkeleton />}>
          <StatisticsSuspense />
        </Suspense>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 ">
            <BooksPredictionsListing/>
            <WordsListing />
        </div>
      </main>
    </div>
  );
}
