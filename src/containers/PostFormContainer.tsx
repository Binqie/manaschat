import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types'

import { BsFillTrashFill } from 'react-icons/bs'

import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/material'
import FlexContainer from './FlexContainer'
import { IInput } from '../types'

interface IInputProps {
  type: 'election' | 'suggestion' | 'comment'
  inputs: IInput[]
}

const PostFormContainer: FC<IInputProps> = ({ type, inputs }) => {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState<string>()
  const [variantsList, setVariantsList] = useState<string[]>([])
  const [variant, setVariant] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' })

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
    console.log('previewImage')
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e: any) => {
    console.log('e', e)
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    console.log('selectImage')
    setSelectedFile(e.target.files[0])
  }

  const onSubmit = (data: FieldValues): void => {
    if (variantsList.length > 0) {
      data.variants = variantsList
    }
    console.log('data', data)
  }

  const addVariant = (): void => {
    if (variantsList.includes(variant)) return
    const newList = [...variantsList, variant]
    setVariantsList(newList)
    setVariant('')
  }

  const removeVariant = (variant: string): void => {
    const newList = variantsList.filter((vt) => vt !== variant)
    setVariantsList(newList)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexContainer
          direction='column'
          justify='center'
          align='stretch'
        >
          <div style={{ width: '100%', height: '200px' }}>
            <img
              src={preview}
              id='previewImage'
              width='100%'
              height={200}
            />
          </div>
          {inputs.map((input, index) => (
            <TextField
              {...(input.type == 'file' && {
                onChange: (event) => onSelectFile(event)
              })}
              id={input.id}
              key={index}
              label={input.label}
              type={input.type}
              size='small'
              style={{ margin: '5px 0', width: '100%' }}
              {...register(input.name)}
            />
          ))}
          {type === 'election' && {
            ...(
              <FormControl style={{ width: '100%' }}>
                <FormLabel>Variants</FormLabel>
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='female'
                  name='radio-buttons-group'
                >
                  {variantsList.map((variant, index) => (
                    <FlexContainer
                      key={index}
                      align='center'
                      justify='space-between'
                    >
                      <FormControlLabel
                        value={variant}
                        control={<Radio />}
                        label={variant}
                      />
                      <Button onClick={() => removeVariant(variant)}>
                        <BsFillTrashFill />
                      </Button>
                    </FlexContainer>
                  ))}
                </RadioGroup>
                <FlexContainer
                  align='center'
                  justify='space-between'
                >
                  <TextField
                    onChange={(event) => setVariant(event.target.value)}
                    value={variant}
                  />
                  <Button onClick={() => addVariant()}>Add varaint</Button>
                </FlexContainer>
              </FormControl>
            ),
          }}
          <Button
            variant='outlined'
            type='submit'
            style={{ marginTop: 10 }}
          >
            Create
          </Button>
        </FlexContainer>
      </form>
    </div>
  )
}

export default PostFormContainer
