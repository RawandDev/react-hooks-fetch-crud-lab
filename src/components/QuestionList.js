import { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/questions`)
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  // console.log(questions);

  function onDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((_data) => {
        const newQuestions = questions.filter((question) => question.id !== id);
        setQuestions(newQuestions);
        // console.log(newQuestions);
      });
  }

  // onChangeCorrectAnswer is a function that takes the question id and the new correct answer
  function handleCorrectAnswer(id, newCorrectAnswer) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctAnswer: newCorrectAnswer }),
    })
      .then((response) => response.json())
      .then((_data) => {
        console.log(_data);
      });
  }

  const getQuestion = questions.map((question) => {
    return (
      <QuestionItem
        question={question}
        key={question.id}
        onDelete={onDelete}
        onChangeCorrectAnswer={handleCorrectAnswer}
      />
    );
  });

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {/* <QuestionItem question={questions} /> */}
        {getQuestion}
      </ul>
    </section>
  );
}

export default QuestionList;
