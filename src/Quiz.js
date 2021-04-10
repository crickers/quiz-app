import React, { Component, useEffect, useState } from "react";
import { QuizData } from "./QuizData";
import "./styles.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";

//import React, {useEffect, useState} from "react";

import {
  Button,
  List,
  Collapse,
  Breadcrumb,
  Row,
  Col,
  Divider,
  notification,
} from "antd";
const { Panel } = Collapse;

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const onSignIn = async (event) => {
    event.preventDefault();
    console.log(email);
    console.log(password);
    let res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email, password }),
    });
    let data = await res.json();
    console.log(data);
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    }
  };

  const onSignUp = async (event) => {
    event.preventDefault();
    console.log(email);
    console.log(password);
    console.log(retypePassword);
    let res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email, password }),
    });
    let data = await res.json();
    console.log(data);
    if (data.success) {
      // Show a success message use ANT design success message?
      notification["success"]({
        message: "Thanks",
        description:
          "You are all set. You can now login using your credentials.",
      });
    }
  };

  return (
    <div>
      <h1 className={"text-3xl text-center"}>Login Form</h1>

      <form onSubmit={onSignIn}>
        <Row type={"flex"} align={"center"} className={"mt-5"}>
          <Col span={24}>
            <input
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.currentTarget.value)}
              required
              className={"border w-full rounded"}
              placeholder={"Email address"}
            />
          </Col>
          <Col span={24} className={"mt-5"}>
            <input
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.currentTarget.value)}
              required
              className={"border w-full rounded"}
              placeholder={"Password"}
            />
          </Col>
          <Col span={24} className={"mt-5"}>
            <Button
              htmlType={"submit"}
              className={
                "border-0 bg-edorble-yellow-500 hover:bg-edorble-yellow-600 hover:text-black w-full rounded font-bold"
              }
            >
              Submit
            </Button>
          </Col>
        </Row>
      </form>

      <Divider />

      <h1 className={"text-3xl text-center"}>Signup Form</h1>

      <form onSubmit={onSignUp}>
        <Row type={"flex"} align={"center"} className={"mt-5"}>
          <Col span={24}>
            <input
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.currentTarget.value)}
              required
              className={"border w-full rounded"}
              placeholder={"Email address"}
            />
          </Col>
          <Col span={24} className={"mt-5"}>
            <input
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.currentTarget.value)}
              required
              className={"border w-full rounded"}
              placeholder={"Password"}
            />
          </Col>
          <Col span={24} className={"mt-5"}>
            <input
              type="password"
              value={retypePassword}
              onChange={(ev) => setRetypePassword(ev.currentTarget.value)}
              required
              className={"border w-full rounded"}
              placeholder={"Retype Password"}
            />
            {password != retypePassword && (
              <small className={"text-red-500 font-bold"}>
                Passwords don't match
              </small>
            )}
          </Col>
          <Col span={24} className={"mt-5"}>
            <Button
              htmlType={"submit"}
              disabled={password != retypePassword}
              className={
                "border-0 bg-edorble-yellow-500 hover:bg-edorble-yellow-600 hover:text-black w-full rounded font-bold"
              }
            >
              Submit
            </Button>
            {/*<Button loading={loading} disabled={password != retypePassword} type="primary" htmlType={'submit'} className={'border-0 w-full rounded font-bold'}>Submit</Button>*/}
          </Col>
        </Row>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/quiz">
            <Quiz />
          </Route>
          <Route path="/">
            <Auth />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

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
  nextQuestionHander = () => {
    const { userAnswer, answer, score } = this.state;
    this.setState({
      currentIndex: this.state.currentIndex + 1,
    });
    //Check if correct answer and increment score
    if (userAnswer === answer) {
      this.setState({
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

  finishHandler = () => {
    if (this.state.currentIndex === QuizData.length - 1) {
      this.setState({
        quizEnd: true,
      });
    }
  };

  render() {
    const { question, options, currentIndex, userAnswer, quizEnd } = this.state; //get the current state

    if (quizEnd) {
      return (
        <div>
          <h1>Game Over. Final score is {this.state.score} points</h1>
          <p>The correct Answers for the quiz are</p>
          <ul>
            {QuizData.map((item, index) => (
              <li className="ui floating message options" key={index}>
                {item.answer}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div>
        <h2>{question}</h2>
        <span>{`Question ${currentIndex} of ${QuizData.length - 1}`}</span>
        {options.map((
          option //for each option, new paragraph
        ) => (
          <p
            key={option.id}
            className={`ui floating message options
                ${userAnswer === option ? "selected" : null}
                `}
            onClick={() => this.checkAnswer(option)}
          >
            {option}
          </p>
        ))}
        {currentIndex < QuizData.length - 1 && (
          <button
            className="ui inverted button"
            disabled={this.state.disabled}
            onClick={this.nextQuestionHander}
          >
            Next Question
          </button>
        )}
        {currentIndex === QuizData.length - 1 && (
          <button
            className="ui inverted button"
            disabled={this.state.disabled}
            onClick={this.finishHandler}
          >
            Finish
          </button>
        )}
      </div>
    );
  }
}
export default Quiz;
