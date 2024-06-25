import React, {useRef, useState} from 'react';
import pageStyles from '../../styles/Page.module.css';
import btnStyles from '../../styles/Button.module.css';
import formStyles from '../../styles/Form.module.css';
import styles from '../../styles/RefineCreate.module.css';
import defaultImage from '../../assets/default-image.webp'
import { Alert, Button, Form, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../context/GlobalMessageContext';

const RefineCreate = () => {


    const setShowGlobalSuccess = useSetShowGlobalSuccess();
    const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

    const [refineData, setRefineData] = useState({
        name: '',
        why: '',
        image: '',
    });
    
    const history = useHistory();
    
    const handleBack = () => {
    history.goBack();
    }

    const [errors, setErrors] = useState({});

    const { name, why, image } = refineData;

    const imageInput = useRef(null);

    const handleChange = (event) => {
    setRefineData({
        ...refineData,
        [event.target.name]: event.target.value,
    });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length > 0){
            URL.revokeObjectURL(image);
            setRefineData({
            ...refineData,
            image: URL.createObjectURL(event.target.files[0])
          });
        }
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name)
        formData.append('why', why)
        if (imageInput.current.files.length > 0) {
          formData.append('image', imageInput.current.files[0]);
        }
        try {
          const {data} = await axiosReq.post('/refine/', formData);
          setGlobalSuccessMessage("You have created a new refinement!");
          setShowGlobalSuccess(true);
          history.push(`/refine/${data.id}`);
        } catch(err){
          if (err.response?.status !== 401){
            setErrors(err.response?.data);
          }
        }
      };

    return (
    <div className={pageStyles.PageContainer}>
        <div>
        <h1 className={pageStyles.TitleContainer}>Create refinement</h1>
      </div>
      <div className={`${pageStyles.ContentContainer} ${styles.FormContainer}`}>
        <button className={btnStyles.BackCross} aria-label="Click to return to the organiser" onClick={handleBack}>
          <i className="fa-solid fa-x"></i>
        </button>
        <Form onSubmit={handleSubmit}>
          <div className={styles.FocusForm}>
            <Form.Group className={styles.ImageGroup}>
              {errors.image?.map((message, idx) => (
                <Alert key={idx}>
                  {message}
                </Alert>
              ))}
              {image ? (
                <Image src={image} className={styles.Image} alt="Chosen refine image"/>
              ) : (
                <div  className={styles.AddImage}>
                  <div className={styles.ImageContainer}>
                    <Image src={defaultImage} className={styles.DefaultImage} alt="Default refine image"/>
                  </div>
                  <p>Click below to add an image</p>
                </div>
              )}
              <Form.File
                id="image-upload"
                accept="image/*"
                className={styles.FormFile}
                onChange={handleChangeImage}
                ref={imageInput}
                aria-label='Click to change the refinement image'
              />
            </Form.Group>
            <div className={styles.MainForm}>
              {errors.name?.map((message, idx) => (
                <Alert key={idx} className={formStyles.ErrorAlert}>
                  {message}
                </Alert>
              ))}
              <Form.Group controlId="name" className={styles.Group}>
                <Form.Label  className={formStyles.FormLabel} >Refine:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Give your refinement area a name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  className={styles.ShortInput}
                />
              </Form.Group>

              {errors.why?.map((message, idx) => (
                <Alert key={idx} className={formStyles.ErrorAlert}>
                  {message}
                </Alert>
              ))}
              <Form.Group controlId="why" className={styles.Group}>
                <Form.Label>Why:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Why is this important to you?"
                  name="why"
                  value={why}
                  onChange={handleChange}
                  className={styles.LongInput}
                />
              </Form.Group >
              {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} className={formStyles.ErrorAlert}>
                  {message}
                </Alert>
              ))}
            </div>
          </div>
          <div className={styles.Buttons}>
            <Button className={btnStyles.Button}>
              <Link to={'/organise'} className={styles.InnerButton}>
                Cancel
              </Link>
            </Button>
            <Button className={btnStyles.Button} type="submit">
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div> 
  )
}

export default RefineCreate