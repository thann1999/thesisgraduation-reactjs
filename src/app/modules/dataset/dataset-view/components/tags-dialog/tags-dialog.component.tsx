import {
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core'
import {
  Close,
  Search,
  AddCircle
} from '@material-ui/icons'
import 'app/modules/dataset/dataset-view/css/tags-dialog.scss'
import DatasetAPI, { Tags } from 'api/dataset-api'
import React, { useContext, useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DatasetViewContext } from '../../pages/context.component'
import { STATUS_OK } from 'services/axios/common-services.const'
import addToast from 'dataworld/parts/toast/add-toast.component'

export interface TagsDialogProps {
  open: boolean;
  onClose: () => void,
}

interface FormValues {
  tagsName: string
}

export default function TagsDialog(props: TagsDialogProps) {
  const { open, onClose } = props
  const { datasetValues, setDatasetTags } = useContext(DatasetViewContext)
  const [allTags, setAllTags] = useState<Array<Tags> | undefined>(undefined)
  const [checkedTags, setCheckedTags] = useState<Array<Tags>>(datasetValues.dataset.tags)
  const [searchTags, setSearchTags] = useState<Array<Tags>>([])

  const validationSchema = yup.object().shape({
    tagsName: yup.string().trim()
      .matches(/^(?=.{1,20}$)[a-zA-Z0-9]+$/, "Tags phải có 1-20 ký tự. Không sử dụng các ký tự đặc biệt")
  })

  const { register, errors, handleSubmit, watch, setError } = useForm<FormValues>({
    defaultValues: {
      tagsName: ''
    },
    resolver: yupResolver(validationSchema)
  })


  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target
    let newState: Array<Tags> = [];
    if (isCheckedTag(name)) {
      newState = [...checkedTags, { name: name }];
    } else {
      newState = checkedTags.filter(tags => tags.name !== name);
    }
    setCheckedTags(newState)
  }

  const isCheckedTag = (newTags: string) => {
    return checkedTags.findIndex(tags => tags.name === newTags) < 0
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (allTags) {
      setSearchTags(allTags.filter(tags => tags.name.includes(event.target.value)))
    }
  }

  const handleAddTag = (data: FormValues) => {
    const name = data.tagsName.trim().toLowerCase()
    if (isCheckedTag(data.tagsName.toLowerCase())) {
      const newState = [...checkedTags, { name: name }];
      setCheckedTags(newState)
    } else {
      setError('tagsName', { message: 'Tags đã được sử dụng' })
    }
  }

  const handleClose = () => {
    setSearchTags(allTags ? allTags : searchTags)
    onClose()
  }

  const handleDelete = (tagsDelete: Tags) => () => {
    setCheckedTags(checkedTags.filter((tags) => tags.name !== tagsDelete.name));
  };

  const saveTags = async () => {
    const result = await DatasetAPI.updateTags(datasetValues.dataset._id, datasetValues.dataset.tags, checkedTags)
    if (result.status === STATUS_OK) {
      addToast({ message: result.message, type: "success" })
      setDatasetTags(checkedTags)
      onClose()
    } else {
      addToast({ message: result.message, type: "error" })
    }
  }

  const disableButton = () => {
    const oldTags = datasetValues.dataset.tags
    const differentTags = checkedTags.filter(({ name: id1 }) => !oldTags.some(({ name: id2 }) => id2 === id1));
    if (differentTags.length > 0 || (differentTags.length === 0 && checkedTags.length < oldTags.length)) {
      return false
    }
    return true
  }

  useEffect(() => {
    const getTags = async () => {
      if (open) {
        const result = await DatasetAPI.getAllTags()
        setAllTags(result.data)
        setSearchTags(result.data)
      }
    }
    getTags()
  }, [open])

  return (
    <Dialog
      className='b-dialog-tags'
      open={open}
      fullWidth={true}
      maxWidth='sm'
    >
      <DialogTitle id="add-tags-title" className='b-title'>
        <IconButton onClick={handleClose} className='p-icon-close'>
          <Close />
        </IconButton>

        <Typography variant='h6' className='f-weight-700'>Cập nhật tags</Typography>
      </DialogTitle>

      <DialogContent className='b-content'>
        <Grid container spacing={0}>
          <Grid item xs={6} className='b-select-tags'>
            <div className='p-search-bar'>
              <TextField
                type="search"
                onChange={(event) => handleSearch(event)}
                placeholder='Tìm kiếm...'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  )
                }}
                variant="outlined"
                size="small" />
            </div>

            <FormControl component="fieldset" className='p-select'>
              <Typography className='h-mb-10 f-weight-700'>Tags hay dùng</Typography>
              <FormGroup>
                {searchTags.map((tags, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        className='h-mr-16'
                        checked={!isCheckedTag(tags.name)}
                        onChange={(event) => handleSelect(event)}
                        color='primary'
                        name={tags.name}
                      />
                    }
                    label={tags.name}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={6} className='b-input-tags'>
            <form className='p-input' onSubmit={handleSubmit(handleAddTag)}>
              <TextField
                placeholder='Nhập tags...'
                name='tagsName'
                required
                inputRef={register}
                variant="outlined"
                size="small"
              />
              <IconButton
                className='h-ml-10 p-button-add-tag'
                type='submit'
                disabled={watch('tagsName').trim() === ''}
              >
                <AddCircle color='primary' fontSize='large' />
              </IconButton>
            </form>

            {errors.tagsName && watch('tagsName') !== '' &&
              <Typography className='p-validate-error h-ml-14'>
                {errors.tagsName.message}
              </Typography>
            }

            <ul className='p-display-list-tags'>
              {checkedTags.map((tags, index) => (
                <li key={index} className='h-mb-4'>
                  <Chip
                    label={tags.name}
                    onDelete={handleDelete(tags)} />
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions className='b-actions'>
        <Button
          className='p-round-button p-button-save-color'
          onClick={saveTags}
          disabled={disableButton()}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}