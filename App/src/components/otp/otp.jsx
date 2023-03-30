
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function VerifyOTP() {
  const navigate = useNavigate();
  const initialValues = { otp: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios
        .post("/auth/otp", {
          otp: formValues.otp,
        })
        .then((response) => {
          if (response.data === "OTP is not correct"){
            setFormErrors(response.data);
          }else{
            navigate("/sucess", { replace: true });
          }
        });
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.otp) {
      errors.otp = "OTP number is required!";
    }
    return errors;
  };

  return (
    <div className='login_main'>
        <div className='login_container'>
            <p>Please enter your OTP</p>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className='login_input'>
                    <input
                    type="text"
                    name="otp"
                    placeholder="OTP"
                    value={formValues.otp}
                    onChange={handleChange}
                    />
                </div>
                {formErrors.otp}
                
                <button type='submit'>Verify OTP</button>
            </form>
        </div>
    </div>
  )
}

export default VerifyOTP