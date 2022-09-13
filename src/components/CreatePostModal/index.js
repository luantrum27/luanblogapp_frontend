import React from 'react';
import { Button, Modal, TextareaAutosize, TextField } from '@material-ui/core'
import { modalState$ } from '../../redux/selectors'
import { useSelector, useDispatch } from 'react-redux'
import useStyles from './styles';
import FileBase64 from 'react-file-base64';
import { createPost, hideModal } from '../../redux/actions';

function CreatePostModal() {

    const [data, setData] = React.useState({
        title: '',
        content: '',
        attachment: ''
    })

    const dispatch = useDispatch();
    // Lấy dữ liệu từ store
    const { isShow } = useSelector(modalState$);

    // handler close modal
    // Hàm được lưu lại các giá trị sau khi re-render, được gọi lại khi có sự thay đổi
    // các desp
    const onClose = React.useCallback(() => {
        dispatch(hideModal());
    }, [dispatch])

    const onSubmit = React.useCallback(() => {
        console.log({data});
        dispatch(createPost.createPostRequest(data));
        dispatch(hideModal());
    }, [data, dispatch])

    const classes = useStyles();

    const body = (
        <div className={classes.paper} id='simple-modal-title'>
            <h2>Create New Post</h2>
            <form noValidate autoComplete='off' className={classes.form}>
                <TextField
                    className={classes.title}
                    required
                    label='Title'
                    value={data.title}
                    onChange={(e) => {
                        setData({...data, title: e.target.value})
                    }}
                />

                <TextareaAutosize
                    className={classes.textarea}
                    rowsMin={10}
                    rowsMax={15}
                    placeholder='Content...'
                    value={data.content}
                    onChange={(e) => {
                        setData({...data, content: e.target.value})
                    }}
                />

                <FileBase64
                    accept='image/*'
                    multiple={false}
                    type='file'
                    value={data.attachment} 
                    onDone={({base64}) => setData({...data, attachment: base64})}
                />

                <div className={classes.footer}>
                    <Button
                        variant='contained'
                        color='primary'
                        component='span'
                        fullWidth
                        onClick={onSubmit}
                    >
                        Create
                    </Button>
                </div>
            </form>
        </div>
    )

    return (
        <div>
            <Modal open={isShow} onClose={onClose}>
                {body}
            </Modal>
        </div>
    )
}

export default CreatePostModal;