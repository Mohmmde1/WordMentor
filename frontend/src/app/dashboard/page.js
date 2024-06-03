
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import Listing from "./Listing"
import { fetchBooks, fetchPredictions } from "@/lib/actions"
import Statistics from "./Statistics"
import WordsListing from "./WordsListing"

export default async function Page() {
    const books = await fetchBooks();
    const predictions = await fetchPredictions();
    const knownWords = [
      { word: 'abate', learned_at: '2024-05-01' },
      { word: 'benevolent', learned_at: '2024-05-03' },
      { word: 'candid', learned_at: '2024-05-05' },
      { word: 'deft', learned_at: '2024-05-07' },
      { word: 'elicit', learned_at: '2024-05-09' },
    ];
    
    const unknownWords = [
      { word: 'fervent', added_at: '2024-05-02' },
      { word: 'garrulous', added_at: '2024-05-04' },
      { word: 'hapless', added_at: '2024-05-06' },
      { word: 'iconoclast', added_at: '2024-05-08' },
      { word: 'juxtapose', added_at: '2024-05-10' },
    ];
  return (
    <div className="flex  w-full flex-col ">
     
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Statistics />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2  ">
         <Listing books={books} predictions={predictions}/>
          <WordsListing knownWords={knownWords} unknownWords={unknownWords}/>
        </div>
      </main>
    </div>
  )
}
