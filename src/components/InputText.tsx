import { Card, CardContent, Link, TextField, Typography } from "@mui/material";
import { ChangeEvent, useRef, useState } from 'react';
import { FiLink2 } from "react-icons/fi";

interface Props {
  id: string,
  inputTitle: string,
  inputContents: string,
  onDataRef: (id: string, value: string) => void,
  maxSize: number,
  value: string
  onChange: (e: ChangeEvent) => void
}

const InputText: React.FC<Props> = ({ id, inputTitle, inputContents, onDataRef, maxSize, value, onChange }) => {


  const ref = useRef<HTMLInputElement>(null)
  const [showLink, setShowLink] = useState(false)
  const [inputCount, setInputCount] = useState(0)

  const handleCardClick = () => {
    if (ref.current !== null) {
      ref.current.focus();
      setShowLink(true)
    }
  }

  const handleInputBlur = () => {
    setShowLink(false)
  }

  const handleInputChange = () => {
    if (ref.current !== null) {
      setInputCount(ref.current.value.length)

      onDataRef(id, ref.current.value)
    }
  }

  return (
    <Card sx={{ backgroundColor: '#FFF', textAlign: 'left' }} onClick={() => handleCardClick()}>

      <CardContent>
        {showLink && <Typography><Link href='#'><FiLink2 /> 共有リンクを発行</Link></Typography>}

        <Typography variant='h6'>{inputTitle}</Typography>
        <Typography variant='h4'>{inputContents}</Typography>
        <TextField
          onBlur={() => handleInputBlur()}
          onChange={
            (e) => {
              onChange(e);
              handleInputChange();
            }
          }

          fullWidth={true}
          value={value}
          multiline
          rows={3}
          placeholder="回答を入力してください。"
          inputRef={ref}
        />
        <Typography sx={{ textAlign: 'right' }}>{inputCount}/{maxSize}文字</Typography>
      </CardContent>
    </Card >
  );
};

export default InputText;
