
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
import { fetchBooks, fetchPredictions, fetchWords } from "@/lib/actions"
import Statistics from "./Statistics"
import WordsListing from "./WordsListing"

export default async function Page() {
    const books = await fetchBooks();
    const predictions = await fetchPredictions();

    const { knownWords, unknownWords } = await fetchWords();
  return (
    <div className="flex  w-full flex-col ">
     
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Statistics noKnown={knownWords.length} noUnknown={unknownWords.length} />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2  ">
         <Listing books={books} predictions={predictions}/>
          <WordsListing knownWords={knownWords} unknownWords={unknownWords}/>
        </div>
      </main>
    </div>
  )
}
