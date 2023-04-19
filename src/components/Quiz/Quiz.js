import React, { useEffect, useState } from "react";
import './Quiz.scss';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { getQuestions } from "../../services/QuizQuestions";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const theme = createTheme();
export const Quiz = () => {
    const [formData, setFormData] = useState({
        email: "",
        name: ""
    })
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [currentNumber, setCurrentNo] = useState(0);
    const [answersTrack, setAnswersTrack] = useState({});
    const [results, setResults] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const [userData, setUserData] = useState({});
    const [answeredCountNo,setAnsweredCount] = useState(0);
    useEffect(() => {
        getQuestions().then(resp => {
            console.log(resp?.data)
            setQuestions(resp?.data?.filter((a) => a?.multiple_correct_answers === "false" && a?.correct_answer !== null))
            console.log(resp?.data?.filter((a) => a?.multiple_correct_answers === "false" && a?.correct_answer !== null), "Hello")
            setCurrentQuestion(resp?.data?.filter((a) => a?.multiple_correct_answers === "false" && a?.correct_answer !== null)[0])
            let answersObj = {};
            resp?.data?.filter((a) => a?.multiple_correct_answers === "false" && a?.correct_answer !== null).forEach(element => {
                answersObj[element?.id] = ""
            });
            setAnswersTrack(answersObj)
            // console.log(resp?.data?.filter((a) => a?.multiple_correct_answers === "false")[0]?.answers[])
        })
    }, []);
    const [quizActive, setQuizActive] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = ([]);
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'name':
                setFormData(prevState => ({
                    ...prevState,
                    name: value
                }))
                break;
            case 'email':
                setFormData(prevState => ({
                    ...prevState,
                    email: value
                }))
                break;
            default:
                break;

        }
    }
    const startQuiz = () => {
        setQuizActive(true)
    }
    const handleOptionSelect = (e, id, option) => {
        if (e?.target?.checked === true) {
            setAnswersTrack(prevState => ({
                ...prevState,
                [id]: option
            }))
        }
    }
    const goNext = () => {
        let answeredCount = 0;
        Object.keys(answersTrack).forEach(function(key) {
            if (answersTrack[key] !== '') {
              answeredCount = answeredCount +1;
            }
          });
          setAnsweredCount(answeredCount)
        console.log(answersTrack)
        if (currentNumber + 1 < questions?.length) {
            setCurrentNo(currentNumber + 1, setCurrentQuestion(questions[currentNumber + 1]))
        }

    }
    const submit = () => {
        let totalScore = 0;
        for (const key in answersTrack) {
            if (answersTrack.hasOwnProperty(key)) {
                // console.log(questions?.find((a) => a?.id === parseInt(key)),"Check",key)
                if (questions?.find((a) => a?.id === parseInt(key))?.correct_answer === answersTrack[key]) {
                    totalScore = totalScore + 1
                }
            }
        }
        setTotalScore(totalScore)
        setUserData(prevState => ({
            ...prevState,
            [formData?.name]: totalScore
        }))
        setResults(true)
        console.log(totalScore, "TotalScore")
    }
    const goBack = () => {
        let answeredCount = 0;
        Object.keys(answersTrack).forEach(function(key) {
            if (answersTrack[key] !== '') {
              answeredCount = answeredCount +1;
            }
          });
          setAnsweredCount(answeredCount)
        // if (currentNumber - 1 > questions?.length) {
        setCurrentNo(currentNumber - 1, setCurrentQuestion(questions[currentNumber - 1]))
        // }
    }
    const retake = () => {
        setFormData(prevState => ({
            ...prevState,
            name: "",
            email: ""
        }))
        console.log(userData, "Data")
        setCurrentNo(0)
        setQuizActive(false)
        setResults(false)
        setCurrentQuestion(questions?.filter((a) => a?.multiple_correct_answers === "false" && a?.correct_answer !== null)[0])
        let answersObj = {};
        questions.filter((a) => a?.multiple_correct_answers === "false" && a?.correct_answer !== null).forEach(element => {
            answersObj[element?.id] = ""
        });
        setAnswersTrack(answersObj)
        setAnsweredCount(0)

    }
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Mini Quiz - Select One Option for each question
                        </Typography>
                        {quizActive === true &&
                            <Button color="inherit">All The Best {formData?.name}</Button>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
            {quizActive === false &&
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Typography component="h1" variant="h5">
                                Registration
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={formData?.email}
                                    onChange={(e) => handleFormChange(e)}
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    value={formData?.name}
                                    onChange={(e) => handleFormChange(e)}
                                    autoFocus
                                />

                                <Button
                                    onClick={() => startQuiz()}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Start Quiz
                                </Button>

                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            }
            {quizActive === true && results === false &&
                <Box
                    component="span"
                    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)', marginLeft: "30%" }}
                >
                    <Card sx={{ minWidth: 500 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                                Question No {currentNumber + 1} of {questions?.length}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                               {answeredCountNo} answered out of {questions?.length}
                            </Typography>
                            <Typography variant="h5" component="div">

                            </Typography>

                            <Typography variant="body2">
                                {currentQuestion?.question}
                            </Typography>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Options</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    {Object.keys(currentQuestion?.answers)?.map((keyName, i) => {
                                        if (currentQuestion?.answers[keyName] !== null) {
                                            return <FormControlLabel value={currentQuestion?.answers[keyName]} control={<Radio />} label={currentQuestion?.answers[keyName]} key={i} onClick={(e) => handleOptionSelect(e, currentQuestion?.id, keyName)} />
                                        }
                                    })}

                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            {currentNumber + 1 != 1 &&
                                <Button
                                    onClick={() => goBack()}

                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >

                                    Back
                                </Button>
                            }
                            {currentNumber + 1 !== questions?.length &&
                                <Button
                                    onClick={() => goNext()}

                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Next Question
                                </Button>
                            }
                            {currentNumber + 1 === questions?.length &&
                                <Button
                                    onClick={() => submit()}

                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Submit
                                </Button>
                            }
                        </CardActions>
                    </Card>
                </Box>
            }
            {results === true &&
                <Box
                    component="span"
                    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)', marginLeft: "30%" }}
                >
                    <Card sx={{ minWidth: 500 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                                Results for {formData?.name}
                            </Typography>
                            <Typography variant="h5" component="div">

                            </Typography>

                            <Typography variant="h5" >
                                Total Score = {totalScore}
                            </Typography>
                            <Typography variant="h5" >
                                {totalScore} out of {questions?.length} are correct
                            </Typography>
                            <Typography variant="h5" >
                              Percentage - {totalScore/questions?.length*100}%
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                onClick={() => retake()}

                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Retake
                            </Button>
                            Click on Retake to Answer with another user name
                        </CardActions>

                    </Card>
                    <Typography variant="h5" >
                        Admin Panel
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(userData)?.map((keyName, i) => {
                                    return <TableRow
                                        key={i}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell>{keyName}</TableCell>
                                        <TableCell>{userData[keyName]}</TableCell>

                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="h5" >
                        Questions and Answers
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Question Id</TableCell>
                                    <TableCell>Question</TableCell>
                                    <TableCell>Correct Answer</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questions?.map((question, i) => {
                                    return <TableRow
                                        key={i}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell>{question?.id}</TableCell>
                                        <TableCell>{question?.question}</TableCell>
                                        <TableCell>{question?.answers[question?.correct_answer]}</TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>


            }
        </div>

    )
}