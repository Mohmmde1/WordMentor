import {fetchStatistics} from '@/lib/actions';
import LearningStatistics from '../components/Statistics';

export default async function StatisticsSuspense () {
  const {
    knownWordsCount,
    knownWordsChange,
    unknownWordsCount,
    unknownWordsChange,
    progress,
    progressChange,
    sessions,
    sessionsChange
  } = await fetchStatistics ();
  return (
    <LearningStatistics
      noKnown={knownWordsCount}
      noUnknown={unknownWordsCount}
      progress={progress}
      knownWordsChange={knownWordsChange}
      unknownWordsChange={unknownWordsChange}
      progressChange={progressChange}
      sessions={sessions}
      sessionsChange={sessionsChange}
    />
  );
}
