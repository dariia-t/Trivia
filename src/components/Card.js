import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function OutlinedCard(props) {
    const { question = {}, num , onAnswer } = props;
    const [selectedOption, setSelectedOption] = React.useState(null); // option that was selected
    const [isSubmitted, setIsSubmitted] = React.useState(false); // if the question was submited
    const [isCorrect, setIsCorrect] = React.useState(null); // if the answer was correct

    // reset state when the question changes
    React.useEffect(() => {
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(null);
    }, [question]);

    const handleSelection = (e) => {
        setSelectedOption(parseInt(e.target.value)); // set selected option
    };

    const handleSubmit = () => {
        // console.log("handleSubmit called");
        if (selectedOption !== null) {
            // find the index of the correct answer
            const correctOptionIndex = question.options.findIndex((option) => option.isCorrect);
            console.log("Selected Option:", selectedOption);
            console.log("Correct Option Index:", correctOptionIndex);
            // set if the answer was correct or not 
            setIsCorrect(selectedOption === correctOptionIndex);
            // set that the question was answered 
            setIsSubmitted(true);
            // pass to the app if the answer was correct or no
            onAnswer(selectedOption === correctOptionIndex);
        } else {
            console.log("No option selected.");
        }
    };

    // pick card background color based on submission status
    const cardBackgroundColor = isSubmitted
        ? isCorrect
            ? '#d4edda' // green for correct answer
            : '#f8d7da' // red for wrong answer
        : 'white'; 

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card
                variant="outlined"
                sx={{
                    backgroundColor: cardBackgroundColor,
                    transition: 'background-color 0.3s ease', 
                    width: '33.33vw'
                }}
            >
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        Question {num}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {question.title}
                    </Typography>
                    <FormControl>
                        {/* from mui */}
                        <RadioGroup
                            aria-labelledby="radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={selectedOption}
                            onChange={handleSelection}
                        >
                        {question.options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                value={index}
                                control={<Radio />}
                                label={option.description}
                                disabled={isSubmitted} // disable options after submission
                            />
                        ))}
                        </RadioGroup>
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={handleSubmit}
                        disabled={isSubmitted} // disable button after submission
                    >
                        Submit
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}
