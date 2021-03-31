import React, { Component } from "react";
import { QuizData } from "./QuizData";
import "./styles.css";

export class Quiz extends Component {
  //prevent user from clicking button until an answer is selected

  constructor(props) {
    super(props);

    this.state = {
      userAnswer: null, //user's current answer
      currentIndex: 0, //current questions index
      options: [], //the answer options
      quizEnd: false, //determines if we are on the last question
      score: 0, //score tracker
      disabled: true, //determines the status of the buttons
    };
  }
  //return a single question from the quiz data

  loadQuiz = () => {
    const { currentIndex } = this.state; //gets the current question index
    this.setState(() => {
      return {
        question: QuizData[currentIndex].question,
        options: QuizData[currentIndex].options,
        answer: QuizData[currentIndex].answer,
      };
    });
  };

  //this function handles the click event for the next button

  nextQuestionHandler = () => {
    const { userAnswer, answer, score } = this.state;
    this.setState({
      currentIndex: this.state.currentIndex + 1,
    });

    //check for correct answer & increment score

    if (userAnswer === answer) {
      this.setstate({
        score: score + 1,
      });
    }
  };

  //check the answer
  checkAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
      disabled: false,
    });
  };

  finishHandler = () => {
    if (this.state.currentIndex === QuizData.length - 1) {
      this.setState({
        quizEnd: true,
      });
    }
  };

  //if current index changes, question is set and options are disabled so user cannot choose a different answer
  componentDidMount() {
    this.loadQuiz();
  }

  //if current index changes, question is set and options are disabled so user cannot choose a different answer
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

  render() {
    const { question, options, currentIndex, userAnswer, quizEnd } = this.state;
    return (
      <div>
        <h2>{question}</h2>
        <span>{`Question ${currentIndex + 1} of ${QuizData.length}`}</span>
        {/* map function displays list of items */}
        {options.map((option) => (
          <p
            key={option.id}
            className={`options ${userAnswer === option ? "selected" : null}`}
            onClick={() => this.checkAnswer(option)}
          >
            {option}
          </p>
        ))}

        {currentIndex < QuizData.length - 1 && (
          <button disabled={this.state.disabled}>Next Question</button>
        )}
        {currentIndex === QuizData.length - 1 && (
          <button
            onClick={this.finishHandler}
            disabled={this.state.disabled}
          ></button>
        )}
      </div>
    );
  }
}

export default Quiz;
