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

//updates the component
  compontentDidUpdate(prevProps, prevState){
    const{currentIndex} = this.State;
    if(this.state.currentIndex !== prevState.currentIndex){
      this.setState(() => {
        return {
          disabled: true,
          question: QuizData[currentIndex].question,
          options: QuizData[currentIndex].options,
          answer: QuizData[currentIndex].answer,
        }
    }
  }



  checkAnswer = answer => {  //picks answer & assigns it to userAnswer
    this.setState({
      userAnswer: answer
      disabled: false //enables the Next button
    });
  };



  render() {
    return (
    <div>
    </div>;
  
  }
}

export default Quiz
}
