
import {fetchWords} from '@/lib/actions';

import LearningStatistics from '../components/Statistics';


export default async function StatisticsSuspense () {

  const {knownWords, unknownWords} = await fetchWords ();
  return <LearningStatistics
  noKnown={knownWords.length}
  noUnknown={unknownWords.length}
/>;
  
}
