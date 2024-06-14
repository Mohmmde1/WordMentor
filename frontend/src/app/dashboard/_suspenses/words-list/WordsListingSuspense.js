import {fetchUnKnownWords, fetchKnownWords} from '@/lib/actions';
import Words from '../../_components/words-listing/Words';

export default async function WordsListingSuspense({type}) {
  if (type === 'known') {
    const knownWords = await fetchKnownWords ();
    return <Words words={knownWords} message={'No known words'} />;
  } else {
    const unknownWords = await fetchUnKnownWords ();
    return <Words words={unknownWords} message={'No unknown words'} />;
  }
}
