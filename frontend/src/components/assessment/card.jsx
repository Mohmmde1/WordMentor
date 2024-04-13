"use client";
import styles from "/public/css/assessment.module.css";
import React, { useState } from "react";

const VocabularyAssessment = ({ words, onNextStep, onPreviousStep }) => {
  const [step, setStep] = useState(1);
  const [checkedWords, setCheckedWords] = useState({});

  const handleCheckboxChange = (word) => {
    setCheckedWords((prevState) => ({
      ...prevState,
      [word]: !prevState[word],
    }));
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Assume step 2 validation here before submitting
      onNextStep();
    }
  };

  const handlePreviousStep = () => {
    if (step === 2) {
      setStep(1);
    } else {
      onPreviousStep();
    }
  };

  // Divide the words into two halves based on step
  const halfIndex = Math.ceil(words.length / 2);
  const displayedWords =
    step === 1 ? words.slice(0, halfIndex) : words.slice(halfIndex);

  return (
    <div className={`container `}>
      <div className={`card ${styles["assessment-card"]}`}>
        <div className="card-body">
          <h5 className="card-title size-3">
            Step {step} of 2: Select words you know
          </h5>
          <p className="card-text">
            Check the box if you know at least one definition for a word. If
            you’re not sure about the exact meaning, leave it blank.
          </p>
          <form>
            <div className="row">
              {displayedWords.map((word, index) => (
                <div key={index} className="col-md-2 mb-3">
                  <div className={`form-check ${styles["word-container"]}`}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={word.id}
                      checked={checkedWords[word.id]}
                      onChange={() => handleCheckboxChange(word.id)}
                    />
                    <label className="form-check-label" htmlFor={word.id}>
                      {word.entry}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {step === 1 ? (
              <div className="d-flex justify-content-end p-2">
                <button
                  className="btn btn-outline-primary ms-1 button"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              </div>
            ) : (
              <>
                <div className="d-flex justify-content-between p-2">
                  <button
                    className="btn btn-secondary mr-2"
                    onClick={handlePreviousStep}
                  >
                    Back
                  </button>

                  <button
                    className="btn btn-outline-primary ms-1 button"
                    onClick={handleNextStep}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default VocabularyAssessment;
