import { useEffect } from "react";

function QuestionItem({ question, onDelete, onChangeCorrectAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function deleteHandler() {
    console.log(id);
    onDelete(id);
  }

  // change the correct answer
  function changeCorrectAnswer(event) {
    onChangeCorrectAnswer(id, Number(event.target.value));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={changeCorrectAnswer}>{options}</select>
      </label>
      <button onClick={deleteHandler}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
