import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import reactStringReplace from 'react-string-replace';
interface IProps {
    question: any;
    index: number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        title: {
            marginBottom: theme.spacing(1),
        },
        answer: {
            marginLeft: theme.spacing(2),
        },
        input: {
            padding: 0,
        },
    }),
);

const RewriteItem = ({ question, index }: IProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                {index + 1}. {question.title}
            </div>
            <div className={classes.answer}>
                {'=>'}{' '}
                {question.subtitle ? (
                    <>
                        {reactStringReplace(question.subtitle, '{{answer}}', (match, i) => (
                            <TextField inputProps={{ className: classes.input }} />
                        ))}
                    </>
                ) : (
                    <TextField inputProps={{ className: classes.input }} />
                )}
            </div>
        </div>
    );
};

export default RewriteItem;
