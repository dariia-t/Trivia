### Open Trivia Database
The Open Trivia Database is an open sourced database with an API layer on top.  Since this is an open API, the API may response with a 429 error indicatoring 'Too Many Requests'.  These will reset in a moment or two.

All information regarding the API, including endpoint and response overview can be found on the API documentation page[https://opentdb.com/api_config.php]

### React Application

* Basic App Structure
    * Create a home screen with options to select a category and difficulty level (easy, medium, hard).
    * Add a "Start Quiz"/"Get Questions" button to initiate the quiz after selecting options.
* Quiz Functionality
    * Fetch questions based on the selected category and difficulty level using the Trivia API.
    * Display each question with four multiple-choice answers or True/False selection. 
    * Ensure that the answers are randomized (Do not always have the first selection as the correct answer)
    * Users should be able to select one answer per question.
    * Questions should either be displayed on the page OR Include a "Next" button to move to the next question after answering.
    * Once answered, indicate whether the questionw as answered correctly or not
* Scoring System
    * Keep track of correct answers to calculate the user's score.
    * At the end of the quiz, display the total score and the percentage of correct answers.
* Result Summary Screen
    * Provide a summary page at the end of the quiz showing:
        * Total score out of total questions.
        * Percentage of correct answers.
    * Offer a "Retry Quiz"/"Restart Quiz" button.
    * Users should be able to restart another quiz without reloading the page
* Additional Requirements
    * Additional styling or animations for better user experience.

