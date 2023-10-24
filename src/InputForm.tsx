import { Button, Grid, Paper } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { API } from "./API";
import InputCheckBox from './components/InputCheckBox';
import InputText from "./components/InputText";
import data from './data/questions1.json';


type Answer = {
  id: string,
  answers: string | null

}

type Question = {
  id: string,
  answers: string | null

}

const InputForm = () => {

  const [answers, setAnswers] = useState<Answer[]>([])

  useEffect(() => {
    let _answers: Answer[] = [];
    data.map((q) => {
      _answers.push({ id: q.id, answers: null })
    })
    setAnswers(_answers)
  }, [])

  const {
    control,
    formState: { errors }
  } = useForm({
    mode: "onChange",
    criteriaMode: "all"
  })

  const handleDataRef = (_id: string, _an: string) => {
    let _answers: any[] = answers.filter(q => q.id !== _id)
    _answers.push({ id: _id, answers: _an })
    setAnswers(_answers)
  }

  const handleSubmit = () => {
    // console.log(answers)
    API.submit(answers);
  }

  return (
    <>
      <Paper
        sx={{ position: 'fixed', top: 0, width: '100%', textAlign: 'right', zIndex: '10000' }}>
        <Button
          onClick={() => handleSubmit()}
          sx={{ backgroundColor: '#008000', color: '#FFF' }}
          variant='contained'
        >回答を保存</Button>
      </Paper >
      <br /><br />

      <Grid container spacing={6} sx={{ backgroundColor: '#EEE' }}>
        {data.map((item, i) => (
          <Grid key={i} item xs={12}>
            {(item.qaFormat == 'TEXT') &&
              <FormControl fullWidth>
                <Controller
                  name={item.questionNumber}
                  control={control}
                  rules={{ maxLength: 100 }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <InputText
                      id={item.id}
                      inputTitle={item.questionTitle}
                      inputContents={item.questionSentence}
                      onDataRef={handleDataRef}
                      maxSize={100}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                {errors[item.questionNumber] && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    100文字以下にしてください。。
                  </FormHelperText>
                )}
              </FormControl>
            }

            {(item.qaFormat == 'CHECKBOX') &&
              <FormControl fullWidth>
                <Controller
                  name={item.questionNumber}
                  control={control}
                  rules={{ maxLength: 100 }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <InputCheckBox
                      id={item.id}
                      inputTitle={item.questionTitle}
                      inputContents={item.questionSentence}
                      onDataRef={handleDataRef}
                      maxSize={100}
                      value={value}
                      onChange={onChange}
                      options={item.options}
                    />
                  )}
                />
              </FormControl>
            }
          </Grid>
        ))}
      </Grid>
      <br /><br />
    </>
  );
};

export default InputForm;
