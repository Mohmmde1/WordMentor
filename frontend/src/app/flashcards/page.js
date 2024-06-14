import {format} from 'date-fns';
import {fetchPredictions} from '@/lib/actions'; 
import Collections from './_components/Collections';
import Link from "next/link";
import {ArrowLeft} from 'lucide-react';
export default async function Page() {
  const input = await fetchPredictions();

  function transformInputToPredictions(input) {
    return input.map((item, index) => ({
      id: item.id,
      title: `Session ${index + 1}`, 
      from: item.book,
      fromPage: item.from_page,
      toPage: item.to_page,
      date: format(new Date(item.created_at), 'yyyy-MM-dd'), 
      noFlashcards: item.unknown_words, 
    }));
  }
  
  const predictions = transformInputToPredictions(input);
  
  return (
    <div className="px-4 py-8 md:px-6 lg:px-8 mb-12 space-y-5">

      <div className="space-y-1.5">
          {/* Back link */}
          <Link
            href={`/dashboard`}
            className="flex items-center gap-2 text-lg font-semibold custom-transition"
          >
            <ArrowLeft /> Back
          </Link>
        </div>

      <Collections predictions={predictions} />
    </div>
  );
}

