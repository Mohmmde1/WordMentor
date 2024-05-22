import VocabularyAssessment from '@/app/assessment/Card';
import {fetchAssessmentWords} from '@/lib/actions';

const Page = async () => {
  const words = await fetchAssessmentWords ();

  return (
    <div className="container m-2">
      <div className="container">
        <div className="text-center m-2">
          <h2 className="m-2">Welcome to the Vocabulary Assessment!</h2>

          <p>
            This assessment will evaluate your familiarity with a wide range of
            words. It aims to ascertain your vocabulary proficiency and tailor
            the application to match your individual level.
          </p>
        </div>
      </div>

        <VocabularyAssessment words={words} />

    </div>
  );
};

export default Page;
