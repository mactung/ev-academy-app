import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { apiAxios } from '../../services/axios';
import TaskItem from './components/TaskItem';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { getUserByAccessToken } from '../../services/service';
import AppBar from '../../components/AppBar';
interface ParamTypes {
    testId: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loadingContainer: {
            width: '100%',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
        },
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
    const [user, setUser] = useState<any>();
    const { testId } = useParams<ParamTypes>();
    const history = useHistory();
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [answers, setAnswers] = useState<any>({});
    const [isFinish, setIsFinish] = useState<boolean>(false);
    const [scorce, setScorce] = useState<number>(0);

    const checkAnswer = () => {
        Object.values(answers).forEach((answer: any) => {
            if (answer.is_correct == 1) {
                setScorce((state) => (state += 1));
            }
        });
        setIsFinish(true);
    };

    useEffect(() => {
        getUserByAccessToken().then((dataUser) => {
            apiAxios.get('api/test/' + testId + '?embeds=tasks.questions.answers').then((res) => {
                if (res.data.status == 'successful') {
                    if (!!dataUser || res.data.result.required_login) {
                        setUser(dataUser);
                        setTest(res.data.result);
                        setIsLoading(false);
                    } else {
                        history.push('/');
                    }
                }
            });
        });
    }, []);

    return (
        <>
            <AppBar user={user} setUser={setUser} />
            {isLoading ? (
                <div className={classes.loadingContainer}>
                    <CircularProgress />
                </div>
            ) : (
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
            )}
        </>
    );
};

export default TestPage;
