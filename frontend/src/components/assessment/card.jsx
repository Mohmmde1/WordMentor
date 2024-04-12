const VocabularyAssessment = ({ words }) => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Step 1 of 2: Test your broad vocab level
          </h5>
          <p className="card-text">
            Check the box if you know at least one definition for a word. If
            you’re not sure about the exact meaning, leave it blank.
          </p>
          <div className="row">
            {words.map((word, index) => (
              <div key={index} className="col-md-4 mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={word}
                  />
                  <label className="form-check-label" htmlFor={word}>
                    {word}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyAssessment;
