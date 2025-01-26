import React, { useState } from 'react';
import '../Css/QuestionList.css'; // Import a CSS file for styling

const QuestionList = ({ questions }) => {
    const [selectedOptions, setSelectedOptions] = useState({});

    const handleOptionClick = (questionId, optionIndex, isCorrect) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [questionId]: { optionIndex, isCorrect },
        }));
    };

    // Check if questions is empty or undefined
    if (!questions || questions.length === 0) {
        return (
            <div className="no-data-message">
                <h2 >There is no data to display.</h2>
            </div>
        );
    }

    return (
        <div className="question-list">
            {questions.map((question) => (
                <div key={question.id} className="question-item">
                    <div className="question-header">
                        <h3>{question.title}</h3>
                        <span className="question-type">{question.type.toLowerCase()}</span>
                    </div>

                    {question.type === 'MCQ' && (
                        <ul className="mcq-options">
                            {question.options.map((option, index) => {
                                const selected = selectedOptions[question.id]?.optionIndex === index;
                                const isCorrect = selectedOptions[question.id]?.isCorrect;
                                return (
                                    <li 
                                        key={index} 
                                        className={`mcq-option ${
                                            selected ? (isCorrect ? 'correct' : 'incorrect') : ''
                                        }`}
                                        onClick={() => handleOptionClick(question.id, index, option.isCorrect)}
                                    >
                                        {option.text}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    {question.type === 'ANAGRAM' && (
                        <div className="anagram-blocks">
                            {question.blocks.map((block, index) => (
                                <p key={index}>{block.text}</p>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default QuestionList;