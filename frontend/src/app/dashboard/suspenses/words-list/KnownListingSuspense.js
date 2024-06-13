
import {fetchKnownWords} from '@/lib/actions';
import Words from '../../components/words-listing/Words';




export default async function KnownListingSuspense () {

  const knownWords = await fetchKnownWords ();
  return <Words words={knownWords} message={"No known words"} />;
  
}
