import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './phone.css'

function Phone() {
  const navigate = useNavigate();
  const initialValues = { phone: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.phone) {
      errors.phone = "Phone number is required!";
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios
        .post("/auth/mobile", {
          phone: formValues.phone,
        })
        .then((response) => {
            console.log(response);
          if (
            response.data === "Mobile number not found" ||
            response.data === "You are blocked"
          ){
            console.log('Mobile number not found');
            setFormErrors(response.data);
          } else {
            navigate("/OTP_verify", { replace: true });
          }
        });
    }
  }, [formErrors]);

  return (
    <>
      <div className='login_main'>
          <div className='login_container'>
              <p>Please enter mobile number you have registered</p>
              <form onSubmit={(e)=>handleSubmit(e)}>
                <div className='login_input'>
                    <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    />
                </div>
                {formErrors.phone}
                
                <button type='submit'>Send OTP</button>
              </form>
          </div>
      </div>
    </>
  )
}

export default Phone