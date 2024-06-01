import {format} from 'date-fns';
import {fetchPredictions} from '@/lib/actions'; 
import Collections from './collections';
import Link from "next/link";
import {ArrowLeft} from 'lucide-react';
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
    <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8 mb-12 space-y-5 max-w-full">

      <div className="space-y-1.5">
          {/* Back link */}
          <Link
            href={`/dashboard`}
            className="flex items-center gap-2 text-lg font-semibold custom-transition"
          >
            <ArrowLeft /> Back
          </Link>
          {/* <h1 className="text-2xl sm:text-4xl font-bold">{prediction.title}</h1> */}
          {/* <p className="text-neutral-400 font-semibold">
            Lesson {lesson.lessonNumber}: {lesson.lessonTitle} ({lesson.lessonPages})
          </p> */}
        </div>

      <Collections predictions={predictions} />
    </main>
  );
}

