import './Create.scss';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { axiosInstance } from '../../config';

const Create = () => {
    const [img, setImg] = useState(undefined);
    const [imgPerc, setImgPerc] = useState(0);
    const [payload, setPayload] = useState({
        title: "",
        description: "",
        cover_photo: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const fileRef = useRef(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const uploadFile = () => {
            setLoading(true);
            const storage = getStorage(app);
            const fileName = new Date().getTime()+ "-" + img.name;
            const storageRef = ref(storage, "images/team/" + fileName);
            const uploadTask = uploadBytesResumable(storageRef, img);
        
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImgPerc(Math.round(progress));
                switch (snapshot.state) {
                  case "paused":
                    console.log("Upload is paused");
                    break;
                  case "running":
                    console.log("Upload is running");
                    break;
                  default:
                    break;
                }
              },
              (error) => {},
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setPayload((prev) => {
                        return { ...prev, cover_photo: downloadURL };
                    });
                    setLoading(false);
                });
              }
            );
        };
        img && uploadFile();
    }, [img]);

    const handleSubmit = async (status) => {
        setError(false);
        setErrorMsg("");
        if(payload.title === "" || payload.description === "" || payload.cover_photo === ""){
            if(payload.title === ""){
                setError(true);
                setErrorMsg("Title Required");
            }else if(payload.description === ""){
                setError(true);
                setErrorMsg("Description Required");
            }else if(payload.cover_photo === ""){
                setError(true);
                setErrorMsg("Cover Photo Required");
            }
        }else{
            setLoading(true);
            const data = {...payload, publish: status};
            
            try {
                const res = await axiosInstance.post("/teams/create", data);
                
                if(res.status === 200){
                    navigate("/teams");
                }else{
                    setError(true);
                    setErrorMsg('Something went wrong.Try again');
                    setLoading(false);
                }
            } catch (error) {
                setError(true);
                setErrorMsg('Something went wrong.Try again');
                setLoading(false);
            }
        }
    }

    return (
        <div className="team-container page">
            <div className="wrapper">
                {loading && <Box sx={{ width: '100%', paddingTop: '1px', borderRadius: '10px' }}>
                    <LinearProgress />
                </Box>}
                <div className="form">
                    <TextField 
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        value={payload.title}
                        onChange={(e) => setPayload((prev) => {
                            return { ...prev, title: e.target.value };
                        })}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        onChange={(e) => setPayload((prev) => {
                            return { ...prev, description: e.target.value };
                        })}
                    />
                    <div className="cover-wrapper">
                        <div className="upload">
                            <h4>Cover Photo</h4>
                            <div className="image">
                                <CloudUploadIcon className="icon" sx={{ fontSize: 60 }} onClick={() => fileRef.current.click()} />
                                <input hidden ref={fileRef} accept="image/*" type="file" onChange={(e) => setImg(e.target.files[0])} />
                            </div>
                        </div>
                        <div className="photo-details">
                            {img && (
                                <>
                                    <h5>{img.name}</h5>
                                    <div className="progress-container">
                                        <Box sx={{ width: '100%'}}>
                                            <LinearProgress variant="determinate" value={imgPerc} color={imgPerc === 100 ? 'success' : 'inherit'} />
                                        </Box>
                                        <p className={imgPerc === 100 ? 'label-success' : 'label-secondary'}> {imgPerc}%</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    {error && <div className="error-container">
                        <Alert severity="error">{errorMsg}</Alert>
                    </div>}
                    <div className="actions">
                        <Link to="/teams" className="cancel link">Cancel</Link>
                        <button className="draft" onClick={() => handleSubmit(1)} disabled={loading}>Save as Draft</button>
                        <button className="publish" onClick={() => handleSubmit(0)} disabled={loading}>Publish</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create