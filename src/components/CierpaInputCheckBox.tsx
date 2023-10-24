import { Card, CardContent, Checkbox, Grid, Link, TextField, Typography } from "@mui/material";
import { useRef, useState } from 'react';
import { FiLink2 } from "react-icons/fi";

const _anwsers: string[] = []
const CierpaInputCheckBox = (props: any) => {

  const { id, inputTitle, inputContents, options, onDataRef } = props

  const [showLink, setShowLink] = useState(false)
  const [otherReadOnly, setOtherReadOnly] = useState(true)
  const ref = useRef<HTMLInputElement>(null)

  const addAnwsers = (an: string) => {
    if (an == null || an == '') {
      return
    }
    _anwsers.push(an)
  }
  const removeAnwsers = (an: string) => {
    if (an == null || an == '') {
      return
    }
    _anwsers.forEach((item, index) => {
      if (an == item) {
        _anwsers.splice(index, 1);
      }
    });
  }

  const handleTextBlur = () => {
    if (ref.current !== null) {
      addAnwsers(ref.current.value)
    }

    onDataRef(id, JSON.stringify(_anwsers))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == 'その他') {
      if (e.target.checked) {

        // TEXTフォーカス処理
        if (ref.current !== null) {
          ref.current.focus();
          setShowLink(true)
        }

        setOtherReadOnly(false)

      } else {
        if (ref.current !== null) {
          removeAnwsers(ref.current.value)
          ref.current.value = ''
        }

        setOtherReadOnly(true)
      }
    } else {
      if (e.target.checked) {
        addAnwsers(e.target.value)
      } else {
        removeAnwsers(e.target.value)
      }
    }

    onDataRef(id, JSON.stringify(_anwsers))
  }

  return (
    <Card sx={{ backgroundColor: '#FFF', textAlign: 'left' }} >

      <CardContent>
        {showLink && <Typography><Link href='#'><FiLink2 /> 共有リンクを発行</Link></Typography>}

        <Typography variant='h6'>{inputTitle}</Typography>
        <Typography variant='h4'>{inputContents}</Typography>
        <Grid container spacing={2}>
          {options.map((option: any, i: any) =>
          (
            <Grid item key={i} xs={12} sx={{ verticalAlign: 'bottom' }}>
              < Checkbox
                size='medium'
                value={option.text}
                name={id}
                onChange={handleChange}
              />
              {(option.text !== 'その他') && option.text}
              {
                (option.text == 'その他') &&
                <TextField
                  variant="standard"
                  margin="normal"
                  size='small'
                  inputRef={ref}
                  onBlur={handleTextBlur}
                  placeholder="その他"
                  inputProps={{
                    readOnly: otherReadOnly,
                  }}
                />
              }
            </Grid>
          )
          )}
        </Grid>
      </CardContent>
    </Card >
  );
};

export default CierpaInputCheckBox;
