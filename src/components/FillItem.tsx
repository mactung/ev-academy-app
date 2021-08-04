import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';
import reactStringReplace from 'react-string-replace';
interface Iprops {
    index: number;
    question: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        input: { padding: 0 },
    }),
);

const FillItem: any = ({ index, question }: Iprops) => {
    const classes = useStyles();
    const [questionTitles, setQuestionTitles] = useState<any>([]);
    useEffect(() => {}, []);
    return (
        <div className={classes.root}>
            <Typography component={'span'}>
                {index + 1}.
                {reactStringReplace(question.title, '{{answer}}', (match, i) => (
                    <TextField inputProps={{ className: classes.input }} />
                ))}
            </Typography>
        </div>
    );
};

export default FillItem;
