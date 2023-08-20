import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {TiDelete} from 'react-icons/ti'
// import { Avatar, Badge } from 'antd'

const FileUpload = ({values, setValues, setLoading}) => {

  const {user} = useSelector((state) => ({...state}));

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    // resize
    let files = e.target.files;
    let allUploadedFiles = values.images;

    if (files) {
        setLoading(true);
        for (let i = 0; i < files.length; i++) {
            console.log(files[i]);
            Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {
                // console.log(uri);
                // axios.post(`http://localhost:8000/api/uploadimages`, {image: uri}, {
                axios.post(process.env.REACT_APP_API+`/uploadimages`, {image: uri}, {
                    headers: {
                        authtoken: user ? user.token: '',
                    },
                }).then(res => {
                    console.log('IMAGE UPLOAD UPLOAD DATA ', res);
                    setLoading(false);
                    allUploadedFiles.push(res.data);
                    setValues({...values, images: allUploadedFiles});
                }).catch(err => {
                    setLoading(false);
                    console.log('CLOUDINARY UPLOAD ERR ',err);
                })
            }, 'base64')
        }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component -- ProductCreate
}

const handleImageRemove = (public_id) => {
    setLoading(true);
    // axios.post(`http://localhost:8000/api/removeimage`, {public_id}, {
    axios.post(process.env.REACT_APP_API+`/removeimage`, {public_id}, {
        headers: {
            authtoken: user ? user.token: '',
        }
    })
    .then(res => {
        setLoading(false);
        const {images} = values;
        let filteredImage = images.filter((item) => {
            return item.public_id !== public_id;
        });
        setValues({...values, images: filteredImage});
    })
    .catch(err => {
        setLoading(false);
        console.log(err);
    })
}

  return (
    <div className='my-2'>
        <div className='flex space-x-4 flex-wrap'>
            {values.images && values.images.map((image) => (
                // <Badge key={image.public_id} count='X' onClick={() => handleImageRemove(image.public_id)} style={{cursor: 'pointer'}} >
                //     <Avatar src={image.url} size={100} shape='square' className="m-2" />
                // </Badge>
                <div key={image.public_id} className='relative'>
                    <div className=''>
                        <TiDelete size={22} onClick={() => handleImageRemove(image.public_id)} className='text-red-500 hover:text-red-600 absolute -right-[12px] -top-[12px]' />
                        <img src={image.url} alt="img" className='h-16 w-16' />
                    </div>
                </div>
            ))}
        </div>
      <div className="rounded-md my-2">
          <label className="">Upload Files </label>
          <input type="file" onChange={fileUploadAndResize} multiple accept='images/*' placeholder="Quantity" className="relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" />
      </div>
    </div>
  )
}

export default FileUpload