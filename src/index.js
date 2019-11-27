import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './assets/style.css';
import * as serviceWorker from './serviceWorker';
import quizService from './quizService';
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';

class QuizBee extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             questionBank: [],
             score: 0,
             responses: 0
        }
    }

    getQuestions = () => {
        quizService().then(question => {
            this.setState({
                questionBank: question
            })
        })
    }

    computeAnswer = (answer, corectAnswer) => {
        if (answer === corectAnswer){
            this.setState({
                score: this.state.score + 1
            })
        }
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1 : 5  
        })
    }

    playAgain = () => {
        this.getQuestions()
        this.setState({
            responses: 0,
            score: 0
        })
    }


    componentDidMount(){
        this.getQuestions()
    }
    
    render (){
        return (
            <div className="container">
                <div className="title">QuizBee</div>

                {this.state.questionBank.length >0 &&
                    this.state.responses < 5 && 
                    this.state.questionBank.map(
                        ({question, answers, correct, questionId}) => 
                            (<QuestionBox question={question} 
                                        options={answers} 
                                        key={questionId}
                                        selected={answer => this.computeAnswer(answer, correct)}
                                        />)
                        )}
                
                {this.state.responses === 5 ? 
                <Result score={this.state.score} playAgain={this.playAgain} />
                 : null}

            </div>
        )
    }
}



ReactDOM.render(<QuizBee />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
