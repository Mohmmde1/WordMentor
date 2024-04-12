import VocabularyAssessment from "@/components/assessment/card";

export default function Page() {
  const words = [
    "think",
    "go",
    "look",
    "him",
    "here",
    "after",
    "ask",
    "next",
    "pay",
    "while",
    "hope",
    "close",
    "tomorrow",
    "box",
    "hair",
    "fish",
    "corner",
    "rise",
    "twice",
    "bright",
    "tool",
    "moon",
    "soul",
    "hint",
    "ferry",
    "stance",
    "dairy",
    "plank",
    "wag",
    "throttle",
    "reproach",
    "pittance",
    "ajar",
    "botch",
    "prig",
    "mawkish",
    "raiment",
    "legerdemain",
    "uxoricide",
    "tell",
    "me",
    "so",
    "we",
    "people",
    "good",
    "very",
    "make",
    "live",
    "man",
    "give",
    "our",
    "could",
    "under",
    "name",
    "very",
    "such",
    "work",
    "long",
    "know",
    "over",
    "year",
    "look",
    "day",
    "same",
    "give",
    "good",
    "want",
    "tell",
    "day",
    "might",
    "get",
    "come",
    "all",
    "because",
    "well",
    "have",
    "much",
    "now",
    "new",
    "want",
    "may",
    "like",
    "look",
    "some",
    "new",
    "year",
    "time",
    "know",
    "just",
    "use",
    "come",
    "take",
    "many",
  ];

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
