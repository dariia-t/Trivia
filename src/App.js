import React, { useState, useEffect, useRef } from 'react';
import Card from './components/Card';
import SelectDifficulty from './components/SelectDifficulty';
import SelectCategory from './components/SelectCategory';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ThemeProvider, createTheme } from '@mui/material/styles';

// create a custom theme
// override the primary and secondary colors of mui components
const theme = createTheme({
  palette: {
    primary: { main: '#ff8c00' },
    secondary: { main: '#ff6347' },
    background: { default: '#f7f0e6' },
  },
  typography: {
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
  },
});

function App() {
  // set the category and the difficulty level
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  // states for keeping track of the question and page
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // state to restart the quiz
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  //const [score, setScore] = useState(0);
  // ref for the score, don't want the question to re-render if the answer is right 
  const scoreRef = useRef(0); 

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  // fetching the question 
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          // specify the selected difficulty and category 
          `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`
        );
        const data = await response.json();
        setQuestions(data.results);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    // do not fetch question if the difficulty and category have not been selected
    if (category && difficulty) {
      fetchQuestions();
    }
  }, [category, difficulty]);

  // set the states when we start the quiz
  const handleStartQuiz = () => {
    setIsQuizActive(true);
    setIsQuizComplete(false);
    setCurrentPage(1);
    scoreRef.current = 0;
  };

  const handleAnswer = (isCorrect) => {
    // if the answer is correct increment the score by 1
    if (isCorrect) {
      scoreRef.current += 1;
    }
    // console.log("Current Page:", currentPage);
    // console.log("Total Questions:", questions.length);
    if (currentPage === questions.length) {
      // If this is the last question, mark the quiz as complete
      setIsQuizComplete(true);
      setIsQuizActive(false);
     } 
  };

  // change th pages 
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // reset the states when the quiz is restarted 
  const handleRestartQuiz = () => {
    setIsQuizActive(false);
    setIsQuizComplete(false);
    setCategory('');
    setDifficulty('');
    setQuestions([]);
    setCurrentPage(1);
    scoreRef.current = 0;
  };

  // keeping track of the current question
  const currentQuestion = questions[currentPage - 1];

  // decode the special characters so the ydisplay correctly 
  const decodeHtmlEntities = (str) => {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(str, 'text/html').documentElement.textContent;
    return decodedString;
  };

  const generateOptions = (question) => {
    // if it os multiple choice
    if (question.type === 'multiple') {
      // create an array of options for the question
      // add the correct answer with isCorrect true
      // add the incorrect answer with isCorrect false
      const options = [
        { description: decodeHtmlEntities(question.correct_answer), isCorrect: true },
        ...question.incorrect_answers.map((answer) => ({
          description: decodeHtmlEntities(answer),
          isCorrect: false,
        })),
      ];
      return options.sort(() => Math.random() - 0.5); // shuffle the options
    // if it is true or false
    } else if (question.type === 'boolean') {
      return [
        // mark the correct answer based on whether it matches tue or false
        { description: 'True', isCorrect: question.correct_answer === 'True' },
        { description: 'False', isCorrect: question.correct_answer === 'False' },
      ];
    }
    return [];
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* box for the header */}
        <Box sx={{ backgroundColor: '#ffda79', padding: 3, textAlign: 'center' }}>
          <Typography variant="h2" color="secondary" fontWeight="bold">
            Trivia Quiz!
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            minHeight: '10vh',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: 2,
            padding: 2,
          }}
        >
          {/* selection options for difficulty and category */}
          <SelectCategory category={category} onCategoryChange={handleCategoryChange} />
          <SelectDifficulty difficulty={difficulty} onDifficultyChange={handleDifficultyChange} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
          {!isQuizActive && !isQuizComplete && (
            <Button
              variant="contained"
              sx={{ marginBottom: 2, marginTop: 2 }}
              // start the quiz
              onClick={handleStartQuiz}
              disabled={!category || !difficulty}
            >
              Start Quiz
            </Button>
          )}
        </Box>
        {isQuizActive && currentQuestion && (
          <Box
            sx={{
              minHeight: '50vh',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: 2,
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {/* create the card with the question */}
            <Card
              question={{
                title: decodeHtmlEntities(currentQuestion.question),
                options: generateOptions(currentQuestion),
              }}
              onAnswer={handleAnswer}
              num={currentPage}
            />
            {/* the next button and previous questions buttons */}
            <Stack spacing={2}>
              <Pagination
                count={questions.length}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </Box>
        )}
        {/* when the quiz is over show the score card */}
        {isQuizComplete && (
          <Box
            sx={{
              minHeight: '50vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 2,
            }}
          >
        <Typography variant="h4" color="primary">
          Quiz Complete! Your Score: {scoreRef.current}/{questions.length} (
          {((scoreRef.current / questions.length) * 100).toFixed(2)}%)
        </Typography>
            <Button variant="contained" color="secondary" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </Box>
        )}
        {/* footer of hte page */}
        <Box sx={{ backgroundColor: '#ffda79', padding: 2, textAlign: 'center' }}>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Comic Sans MS', cursive, sans-serif",
              color: '#555',
            }}
          >
            Made by Dariia Tyshchenko
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
