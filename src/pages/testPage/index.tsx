import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Button } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { apiAxios } from '../../services/axios';
import TaskItem from './components/TaskItem';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { getUserByAccessToken } from '../../services/service';
import { useAppSelector } from '../../stores/hooks';
import MainLayout from '../../layouts/Main';
import AppBar from '../../components/AppBar';
import Start from './components/Start';
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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [answers, setAnswers] = useState<any>({});
    const [testStatus, setTestStatus] = useState<string>('start');
    const [scorce, setScorce] = useState<number>(0);
    const [username, setUsername] = useState<string>('');

    const { user } = useAppSelector((state) => state.storage);
    const checkAnswer = () => {
        Object.values(answers).forEach((answer: any) => {
            if (answer.is_correct == 1) {
                setScorce((state) => (state += 1));
            }
        });
        setTestStatus('finish');
    };

    useEffect(() => {
        getUserByAccessToken().then((dataUser) => {
            apiAxios.get('api/test/' + testId + '?embeds=tasks.questions.answers').then((res) => {
                if (res.data.status == 'successful') {
                    if (!!dataUser || !res.data.result.required_login) {
                        setTest(res.data.result);
                        setIsLoading(false);
                    } else {
                        history.push('/');
                    }
                }
            });
        });
    }, []);

    const doTest = () => {
        if (username === '' && !user.isLogin) return;
        setTestStatus('doing');
    };

    return (
        <MainLayout>
            <AppBar user={user} />
            {isLoading ? (
                <div className={classes.loadingContainer}>
                    <CircularProgress />
                </div>
            ) : (
                <Container className={classes.root}>
                    {testStatus === 'start' && (
                        <Start username={username} setUsername={setUsername} user={user} doTest={doTest} />
                    )}
                    {testStatus === 'doing' && (
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
                    )}
                    {testStatus === 'finish' && (
                        <div className={classes.finishContainer}>
                            <Typography variant="h4">Your scorce:</Typography>
                            <Typography variant="h3">{scorce}</Typography>
                        </div>
                    )}
                </Container>
            )}
        </MainLayout>
    );
};

export default TestPage;
