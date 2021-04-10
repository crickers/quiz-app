import React, { Component } from "react";
import { QuizData } from "./QuizData";

export class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userAnswer: null, //current users answer
      currentIndex: 0, //current questions index
      options: [], //the four options for answers
      quizEnd: false, //determines if user is on the last question
      score: 0, //keeps score
      disabled: true, // determines status of buttons
    };
  }

  loadQuiz = () => {
    const { currentIndex } = this.state;
    this.setState(() => {
      return {
        question: QuizData[currentIndex].question,
        options: QuizData[currentIndex].options,
        answer: QuizData[currentIndex].answer,
      };
    });
  };
  //Click event handler for the Next button
  nextQuestionHandler = () => {
    const { userAnswer, answer, score } = this.state;

    //Check if correct answer and increment score
    if (userAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }

    this.setState({
      currentIndex: this.state.currentIndex + 1,
      userAnswer: null,
    });
  };

  componentDidMount() {
    this.loadQuiz();
  }

  checkAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
      disabled: false,
    });
  };

  //updates the component
  componentDidUpdate(prevProps, prevState) {
    const { currentIndex } = this.state;
    if (this.state.currentIndex !== prevState.currentIndex) {
      this.setState(() => {
        return {
          disabled: true,
          question: QuizData[currentIndex].question,
          options: QuizData[currentIndex].options,
          answer: QuizData[currentIndex].answer,
        };
      });
    }
  }

  checkAnswer = (answer) => {
    //picks answer & assigns it to userAnswer
    this.setState({
      userAnswer: answer,
      disabled: false, //enables the Next button
    });
  };

  render() {
    const { question, options, currentIndex, userAnswer, quizEnd } = this.state;
    return (
      <div>
        <h2>{question}</h2>
        <span>{`Question ${currentIndex + 1} of ${QuizData.length}`}</span>
        {options.map((option) => (
          <p
            key={option.id}
            classNamme={`options ${userAnswer === option ? "selected" : null}`}
            onClick={() => this.checkAnswer(option)}
          >
            {option}
          </p>
        ))}
      </div>
    );
  }
}

export default Quiz;
