import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types'
import { BsFillTrashFill } from 'react-icons/bs'
import { PostFormInputs as inputs } from 'shared/model/Inputs'
import Typography from '@mui/material/Typography'

import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Select,
} from '@mui/material'
import FlexContainer from 'widgets/flexContainer'

import { IPost, PostTypesEnum } from 'shared/model/Types'
import { $api, $postApi } from 'shared/api'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useAppSelector } from 'shared/hooks'
import { PRIVATE_ROUTES } from 'shared/config/consts'

const SendEditPostRequest = async (data: any) => {
  console.log(data)
  return await $postApi.put('/Posts/Edit', data)
}

const SendEditElectionPostDetails = async (data: {
  id: number
  variant: string
}) => {
  console.log(data)
  return await $api.put('/Posts/EditElectionPostDetail', data)
}

const PostEditingForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const post = useAppSelector(
    (state) =>
      state.posts.posts.filter(
        (post: IPost) => post.id.toString() === searchParams.get('id')
      )[0]
  )

  const [selectedImage, setSelectedImage] = useState()
  const [preview, setPreview] = useState<string>()
  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)
  const [variant, setVariant] = useState(
    post.electionPostDetailsList[0]?.variant || ''
  )
  const [variantId, setVariantId] = useState(
    post.electionPostDetailsList[0]?.id || -1
  )
  const [newVariant, setNewVariant] = useState('')
  const [status, setStatus] = useState(0)

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

  const handleVariantChange = (value: string) => {
    setVariant(value)
  }
  const handleVariantIdChange = (value: number) => {
    setVariantId(value)
  }

  const onSelectImage = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined)
      return
    }

    setSelectedImage(e.target.files[0])
  }

  const onSubmit = async (data: FieldValues) => {
    const postData = {
      id: post.id,
      body: body || post.body,
      title: title || post.title,
      image: selectedImage,
    }

    const response = await SendEditPostRequest(postData)
    setTimeout(() => setStatus(response.status), 2000)
    console.log(response)

    const electionPostDetails = {
      id: variantId,
      variant: newVariant,
    }

    console.log(electionPostDetails)

    if (post.type === 2) {
      const result = await SendEditElectionPostDetails(electionPostDetails)
      console.log(result)
    }
  }

  if (status === 200) {
    return <Navigate to={PRIVATE_ROUTES.HOME} />
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
            required={true}
            onChange={(e) => onSelectImage(e)}
            id='selectedImage'
            type='file'
            size='small'
            style={{ margin: '5px 0', width: '100%' }}
          />
          <TextField
            id='title'
            label='title'
            type='text'
            size='small'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ margin: '5px 0', width: '100%' }}
          />
          <TextField
            id='body'
            label='body'
            type='text'
            size='small'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ margin: '5px 0', width: '100%' }}
          />
          {post.type === 2 && {
            ...(
              <FormControl style={{ width: '100%' }}>
                <FlexContainer
                  align='center'
                  justify='space-between'
                >
                  <Typography variant='subtitle1'>
                    <InputLabel id='demo-simple-select-label'>
                      Variant
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={variant}
                      label='Variant'
                      size='small'
                      sx={{ marginRight: 2 }}
                    >
                      {post.electionPostDetailsList.map((item, index): any => (
                        <MenuItem
                          key={index}
                          value={item.variant}
                          onClick={() => {
                            handleVariantChange(item.variant)
                            handleVariantIdChange(item.id)
                          }}
                        >
                          {item.variant}
                        </MenuItem>
                      ))}
                    </Select>
                    <TextField
                      id='variant'
                      label='variant'
                      type='text'
                      size='small'
                      value={newVariant}
                      onChange={(e) => setNewVariant(e.target.value)}
                      style={{ margin: '5px 0', width: '100%' }}
                    />
                  </Typography>
                </FlexContainer>
              </FormControl>
            ),
          }}
          <Button
            variant='outlined'
            type='submit'
            style={{ marginTop: 10 }}
          >
            Edit
          </Button>
        </FlexContainer>
      </form>
    </div>
  )
}

export default PostEditingForm
