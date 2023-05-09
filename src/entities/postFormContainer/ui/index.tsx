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
import FlexContainer from 'widgets/flexContainer/ui'

import { IInputProps, PostTypesEnum } from '../model'
import { Console } from 'console'

const PostFormContainer: FC<IInputProps> = ({ inputs }) => {
  const [postType, setPostType] = useState<number>(0)
  const [selectedImage, setSelectedImage] = useState()
  const [preview, setPreview] = useState<string>()
  const [variantsList, setVariantsList] = useState<string[]>([])
  const [variant, setVariant] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' })

  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedImage)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedImage])

  const onSelectImage = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined)
      return
    }

    setSelectedImage(e.target.files[0])
  }

  const handlePostTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostType(+(event.target as HTMLInputElement).value)
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

  const onSubmit = (data: FieldValues): void => {
    const post = {
      ...data,
      image: selectedImage,
      type: postType,
    }
    console.log('data', post)
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
          <TextField
            onChange={(e) => onSelectImage(e)}
            id='selectedImage'
            type='file'
            size='small'
            style={{ margin: '5px 0', width: '100%' }}
          />
          {inputs.map((input, index) => (
            <TextField
              id={input.id}
              key={index}
              label={input.label}
              type={input.type}
              size='small'
              style={{ margin: '5px 0', width: '100%' }}
              {...register(input.name)}
            />
          ))}
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Post Type</FormLabel>
            <RadioGroup
              aria-label='gender'
              name='gender1'
              value={postType}
              onChange={handlePostTypeChange}
            >
              <FormControlLabel
                value={PostTypesEnum.COMMENT}
                control={<Radio />}
                label='Simple post'
              />
              <FormControlLabel
                value={PostTypesEnum.SUGGESTION}
                control={<Radio />}
                label='Suggestion'
              />
              <FormControlLabel
                value={PostTypesEnum.ELECTION}
                control={<Radio />}
                label='Election'
              />
            </RadioGroup>
          </FormControl>
          {postType === 2 && {
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
                    size='small'
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
