import VocabularyAssessment from "@/components/assessment/card";
import { fetchAssessmentWords } from "@/lib/actions";

export default async function Page() {
  const words = await fetchAssessmentWords();

  return (
    <div className="container">
      <div className="container">
        <div className="text-center">
          <h2>Welcome to the Vocabulary Assessment!</h2>

          <p>
            This assessment will evaluate your familiarity with a wide range of
            words. It aims to ascertain your vocabulary proficiency and tailor
            the application to match your individual level.
          </p>
        </div>
      </div>
      <div
        className="container"
        style={{ width: "70%", height: "70%", margin: "auto" }}
      >
        <VocabularyAssessment words={words} />
      </div>
    </div>
  );
}
