import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

interface Iprops {
    index: number;
    question: any;
    setAnswers: (value: any) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        answers: {
            paddingLeft: theme.spacing(1),
        },
    }),
);

const MultipleItem: any = ({ index, question, setAnswers }: Iprops) => {
    const classes = useStyles();
    const [value, setValue] = useState<string>('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: any) => {
        event.persist();
        setValue((event.target as HTMLInputElement).value);
        setAnswers((state: any) => {
            state[question.id] = question.answers.find((a: any) => a.id == (event.target as HTMLInputElement).value);
            return state;
        });
    };
    return (
        <div className={classes.root}>
            <Typography>
                {index + 1}. {question.title}
            </Typography>
            <FormControl className={classes.answers} component="fieldset">
                {/* <FormLabel component="legend">Gender</FormLabel> */}
                <RadioGroup aria-label="value" name="value" value={value} onChange={handleChange}>
                    {question.answers.map((answer: any, index: number) => (
                        <FormControlLabel
                            key={answer.id}
                            value={`${answer.id}`}
                            control={<Radio color="primary" />}
                            label={answer.content}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default MultipleItem;
