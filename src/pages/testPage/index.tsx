import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, AppBar, Toolbar } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { apiAxios } from '../../store/axios';
import TaskItem from './components/TaskItem';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface ParamTypes {
    testId: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: '#fff',
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
        },
        title: {
            paddingTop: '64px',
            marginBottom: theme.spacing(1),
            textAlign: 'center',
        },
        evname: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        finishContainer: {
            height: 'calc(100vh - 64px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },
    }),
);

const TestPage = () => {
    const [test, setTest] = useState<any>();
    const { testId } = useParams<ParamTypes>();
    const classes = useStyles();
    const [answers, setAnswers] = useState<any>({});
    const [isFinish, setIsFinish] = useState<boolean>(false);
    const [scorce, setScorce] = useState<number>(0);
    useEffect(() => {
        apiAxios.get('api/test/' + testId + '?embeds=tasks.questions.answers').then((res) => {
            if (res.data.status == 'successful') {
                setTest(res.data.result);
                console.log(res.data.result);
            }
        });
    }, []);

    const checkAnswer = () => {
        Object.values(answers).forEach((answer: any) => {
            if (answer.is_correct == 1) {
                console.log(1);
                setScorce((state) => (state += 1));
            }
        });
        setIsFinish(true);
    };

    return (
        <>
            <AppBar position={isFinish ? 'static' : 'fixed'}>
                <Toolbar>
                    <Typography variant="h6" className={classes.evname}>
                        EV Academy
                    </Typography>
                    <Button color="inherit" className={classes.menuButton} onClick={checkAnswer}>
                        Finish
                    </Button>
                </Toolbar>
            </AppBar>
            <Container className={classes.root}>
                {!isFinish ? (
                    <>
                        <div className={classes.title}>
                            <Typography variant="h3">{test?.name}</Typography>
                        </div>
                        <div>
                            {test?.tasks?.map((task: any, index: number) => {
                                return <TaskItem key={index} task={task} index={index} setAnswers={setAnswers} />;
                            })}
                        </div>
                    </>
                ) : (
                    <div className={classes.finishContainer}>
                        <Typography variant="h4">Your scorce:</Typography>
                        <Typography variant="h3">{scorce}</Typography>
                    </div>
                )}
            </Container>
        </>
    );
};

export default TestPage;
