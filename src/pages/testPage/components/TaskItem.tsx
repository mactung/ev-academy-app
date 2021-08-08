import React from 'react';
import { Typography } from '@material-ui/core';
import MultipleItem from '../../../components/MultipleItem';
import FillItem from '../../../components/FillItem';
import RewriteItem from '../../../components/RewriteItem';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
interface IProps {
    task: any;
    index: number;
    chooseAnswer: (questionId: number, answerId: number) => void;
    answers: any;
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        question: {
            marginLeft: theme.spacing(3),
        },
    }),
);
const TaskItem = ({ task, index, chooseAnswer, answers }: IProps) => {
    const classes = useStyles();
    return (
        <div>
            <div>
                <Typography variant="h6">
                    Task {index + 1}: {task.title}
                </Typography>
            </div>
            <div dangerouslySetInnerHTML={{ __html: task.content }}></div>
            <div className={classes.question}>
                {task.questions.map((q: any, index: number) => {
                    if (q.type === 'multiple') {
                        return (
                            <MultipleItem
                                question={q}
                                key={index}
                                index={index}
                                chooseAnswer={chooseAnswer}
                                answers={answers}
                            />
                        );
                    } else if (q.type === 'fill') {
                        return <FillItem question={q} key={index} index={index} />;
                    } else if (q.type === 'rewrite') {
                        return <RewriteItem key={index} question={q} index={index} />;
                    }
                })}
            </div>
        </div>
    );
};

export default TaskItem;
