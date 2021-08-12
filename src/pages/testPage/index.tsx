import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Button, Fab } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { apiAxios } from '../../services/axios';
import TaskItem from './components/TaskItem';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { getUserByAccessToken } from '../../services/service';
import { useAppSelector } from '../../stores/hooks';
import MainLayout from '../../layouts/Main';
import AppBar from '../../components/AppBar';
import Start from './components/Start';
import TestInfo from './components/TestInfo';
// import  Helmet from 'react-helmet';

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
            minHeight: '100vh',
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
    const history = useHistory();
    const classes = useStyles();
    const [answers, setAnswers] = useState<any>({});
    const [testStatus, setTestStatus] = useState<string>('loading');
    const [testPoint, setTestPoint] = useState<number>(0);
    const [result, setResult] = useState<any>();
    const { user } = useAppSelector((state) => state.storage);

    const checkAnswer = () => {
        apiAxios
            .post('api/test/check-answers', {
                answers,
                test_id: testId,
                user_id: user.isLogin ? user.id : null,
            })
            .then((res) => {
                const result = res.data.result;
                if (res.data.status === 'successful') {
                    setTestPoint(result.point);
                }
            });
        setTestStatus('finish');
    };

    useEffect(() => {
        getUserByAccessToken().then((dataUser) => {
            apiAxios.get('api/test/' + testId + '?embeds=tasks.questions.answers').then((res) => {
                if (res.data.status == 'successful') {
                    if (!!dataUser || res.data.result.required_login === 0) {
                        const testData = res.data.result;
                        setTest(testData);
                        if (user.id === 0) {
                            setTestStatus('start');
                            return;
                        }
                        apiAxios
                            .get(`api/result?filters=user_id=${user.id},test_id=${testData.id}`)
                            .then((response) => {
                                if (response.data.status === 'successful') {
                                    if (response.data.result.length > 0) {
                                        const result = response.data.result[0];
                                        setTestPoint(result.point);
                                        setResult(result);
                                        setAnswers(JSON.parse(result.meta_data));
                                        if (result.is_done == 1) {
                                            setTestStatus('finish');
                                        } else {
                                            setTestStatus('start');
                                        }
                                    } else {
                                        setTestStatus('start');
                                    }
                                }
                            });
                    } else {
                        history.replace('/');
                    }
                }
            });
        });
    }, [user]);

    const chooseAnswer = (questionId: number, answerId: number) => {
        setAnswers((state: any) => {
            state[questionId] = { answer_id: answerId, question_id: questionId };
            if (result.is_done !== 1) {
                apiAxios.patch('api/result/' + result.id, {
                    meta_data: JSON.stringify(state),
                });
            }
            return state;
        });
    };

    const doTest = () => {
        setTestStatus('doing');
        if (!result && user.isLogin) {
            apiAxios
                .post('api/result', {
                    user_id: user.id,
                    test_id: test.id,
                    meta_data: '{}',
                })
                .then((res) => {
                    setResult(res.data.result);
                });
        }
    };

    const doTestAgain = () => {
        setTestStatus('start');
        setAnswers([]);
    };

    return (
        <MainLayout>
            <AppBar user={user} />
            <Container className={classes.root}>
                {testStatus === 'loading' && (
                    <div className={classes.loadingContainer}>
                        <CircularProgress />
                    </div>
                )}
                {testStatus === 'start' && <Start user={user} doTest={doTest} />}
                {testStatus === 'doing' && (
                    <>
                        <div className={classes.title}>
                            <Typography variant="h3">{test?.name}</Typography>
                        </div>
                        <div>
                            {test?.tasks?.map((task: any, index: number) => {
                                return (
                                    <TaskItem
                                        key={index}
                                        task={task}
                                        index={index}
                                        chooseAnswer={chooseAnswer}
                                        answers={answers}
                                    />
                                );
                            })}
                        </div>
                        <TestInfo checkAnswer={checkAnswer} />
                    </>
                )}
                {testStatus === 'finish' && (
                    <div className={classes.finishContainer}>
                        <Typography variant="h4">Your scorce:</Typography>
                        <Typography variant="h3">{testPoint}</Typography>
                        <Button onClick={doTestAgain} variant="outlined">
                            Again
                        </Button>
                    </div>
                )}
            </Container>
        </MainLayout>
    );
};

export default TestPage;
