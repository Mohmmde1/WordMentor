import {format} from 'date-fns';
import {fetchPredictions} from '@/lib/actions'; 
import Collections from './collections';

export default async function Page() {
  const input = await fetchPredictions();

  function transformInputToPredictions(input) {
    return input.map((item, index) => ({
      id: item.id,
      title: `Prediction ${index + 1}`, 
      from: item.book,
      fromPage: item.from_page,
      toPage: item.to_page,
      date: format(new Date(item.created_at), 'yyyy-MM-dd'), 
      noFlashcards: item.unknown_words.length, 
    }));
  }
  
  const predictions = transformInputToPredictions(input);
  
  return (
    <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <Collections predictions={predictions} />
    </main>
  );
}

