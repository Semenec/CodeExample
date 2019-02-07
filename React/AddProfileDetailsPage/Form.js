import React, { Component } from "react";
import styled from "styled-components";
import { withFormik } from "formik";
import { Link } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { InputMaterial, FormButton, CheckBoxMaterial } from "../../../common";

const Yup = require("yup");

class AddProfileDetailsPageForm extends Component {
  state = {
    showPassword: false
  };

  handleChangeIsShowPassword = () =>
    this.setState({ showPassword: !this.state.showPassword });

  render() {
    const {
      handleSubmit,
      handleChange,
      values,
      errors,
      handleBlur,
      touched,
      isLoading,
      error
    } = this.props;
    const { showPassword } = this.state;

    return (
      <form onSubmit={handleSubmit}>
        <InputMaterial
          name="firstName"
          label="Name"
          placeholder="Enter your name"
          fullWidth
          value={values.firstName}
          error={touched.firstName ? errors.firstName : null}
          helperText={touched.firstName ? errors.firstName : ""}
          onBlur={handleBlur}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <InputMaterial
          name="lastName"
          label="Surname"
          placeholder="Enter your surname"
          fullWidth
          value={values.lastName}
          error={touched.lastName ? errors.lastName : null}
          helperText={touched.lastName ? errors.lastName : ""}
          onBlur={handleBlur}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <InputMaterial
          name="companyName"
          label="Company name"
          placeholder="Enter your company name"
          fullWidth
          value={values.companyName}
          error={touched.companyName ? errors.companyName : null}
          helperText={touched.companyName ? errors.companyName : ""}
          onBlur={handleBlur}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <InputMaterial
          name="email"
          label="EMail"
          placeholder="Enter your email"
          fullWidth
          value={values.email}
          error={
            touched.email && errors.email
              ? errors.email
              : error && error.errorKey === "email"
              ? true
              : null
          }
          helperText={
            touched.email && errors.email
              ? errors.email
              : error && error.errorKey === "email"
              ? "Email is already in use"
              : ""
          }
          onBlur={handleBlur}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <InputMaterial
          name="password"
          value={values.password}
          error={touched.password ? errors.password : null}
          helperText={touched.password ? errors.password : null}
          onBlur={handleBlur}
          touched={touched.password}
          onChange={handleChange}
          label="Password"
          placeholder="Enter your password"
          fullWidth
          type={showPassword ? "text" : "password"}
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleChangeIsShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          InputLabelProps={{ shrink: true }}
        />
        <InputMaterial
          name="confirm_password"
          label="confirm Password"
          placeholder="Confirm your password"
          fullWidth
          value={values.confirm_password}
          error={touched.confirm_password ? errors.confirm_password : null}
          helperText={touched.confirm_password ? errors.confirm_password : ""}
          onBlur={handleBlur}
          type="password"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <CheckBoxWrapper>
          <StyledCheckBox
            name="confirm_term_of_use"
            value={"true"}
            onChange={handleChange}
            error={
              touched.confirm_term_of_use ? errors.confirm_term_of_use : null
            }
            helperText={
              touched.confirm_term_of_use ? errors.confirm_term_of_use : null
            }
            onBlur={handleBlur}
            checked={values.confirm_term_of_use === true}
            label={
              <p className="check_box_label">
                I agree with <Link to="#">Terms of use</Link>
              </p>
            }
          />
        </CheckBoxWrapper>
        <FormButton
          isLoading={isLoading}
          type="submit"
          className="submit_button"
          fullWidth
          variant="contained"
        >
          SIGN UP
        </FormButton>
      </form>
    );
  }
}

const CheckBoxWrapper = styled.div`
  position: relative;
  top: -15px;
  margin-bottom: -30px;
  p {
    text-align: left !important;
    margin-bottom: 10px !important;
    position: relative;
    top: -2px;
  }
  .check_box_label {
    margin-bottom: 0 !important;
    top: 0 !important;
  }
`;

const StyledCheckBox = styled(CheckBoxMaterial)`
  svg {
    fill: #7157d0 !important;
  }
`;

//

const EnhansedAddProfileDetailsPageForm = withFormik({
  mapPropsToValues: props => props.values,
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .test("len", "Is not valid", e => !/[^A-Za-z0-9]/.test(e))
      .required("Required")
      .trim(),
    lastName: Yup.string()
      .required("Required")
      .test("len", "Is not valid", e => !/[^A-Za-z0-9]/.test(e))
      .trim(),
    companyName: Yup.string()
      .required("Required")
      .test("len", "Is not valid", e => !/[^A-Za-z0-9]/.test(e))
      .trim(),
    password: Yup.string()
      .min(4)
      .required("Required")
      .trim(),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required")
      .trim(),
    email: Yup.string()
      .required("Required")
      .email("Please enter valid email")
      .trim(),
    confirm_term_of_use: Yup.bool().oneOf([true], "Required")
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    props.handleSubmit(values, setSubmitting);
  },
  displayName: "RegistrationForm"
})(AddProfileDetailsPageForm);

export default EnhansedAddProfileDetailsPageForm;
