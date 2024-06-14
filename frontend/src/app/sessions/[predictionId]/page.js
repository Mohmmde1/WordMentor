import {getPrediction} from '@/lib/actions';
import Flashcards from '../_components/Flashcards';


export default async function FlashcardSuspense({params}) {
  const {predictionId} = params;
  const prediction = await getPrediction (predictionId);


    const flashcards = Object.entries (
      prediction.unknown_words
    ).map (([word, definitions]) => {
      try {
        return {
          word,
          definitions: definitions,
        };
      } catch (e) {
        console.error (`Error parsing definitions for word "${word}":`, e);
        return {
          word,
          definitions: {},
        };
      }
    });
  return <Flashcards prediction={prediction} flashcards={flashcards}/>;
}
