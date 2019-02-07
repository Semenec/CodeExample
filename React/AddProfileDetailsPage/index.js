import React, { Component } from "react";
import styled from "styled-components";
import omit from "lodash/omit";
import AddProfileDetailsPageForm from "./Form";
import { Logo, Spinner } from "../../../common";

class AddProfileDetailsPage extends Component {
  componentDidMount() {
    const {
      getAccountWithInvite,
      match: { params }
    } = this.props;

    if (params && params.key) {
      getAccountWithInvite(params.key);
    }
  }

  onSubmit = values => {
    const {
      profile,
      registration,
      match: { params }
    } = this.props;
    const isTeam = params && params.key;
    const newProfile = {
      ...profile,
      ...omit(values, ["confirm_password", "confirm_term_of_use"])
    };

    registration(newProfile, isTeam);
  };

  render() {
    const { profile, isLoading, error, isLoadingGet } = this.props;
    const formValues = {
      firstName: profile ? profile.firstName : "",
      lastName: profile ? profile.lastName : "",
      companyName: "",
      email: profile ? profile.email : "",
      password: "",
      confirm_password: "",
      confirm_term_of_use: false
    };

    if (isLoadingGet) return <Spinner wrap />;

    return (
      <Wrap>
        <LogoWrap>
          <Logo />
        </LogoWrap>
        <FormPaperWithHeading>
          <HeadingContainer>
            <h1>Edit your profile details</h1>
          </HeadingContainer>
          <FormPaper>
            <AddProfileDetailsPageForm
              error={error}
              isLoading={isLoading}
              values={formValues}
              handleSubmit={this.onSubmit}
            />
          </FormPaper>
        </FormPaperWithHeading>
      </Wrap>
    );
  }
}

const LogoWrap = styled.div`
  position: absolute !important;
  left: 50px !important;
  top: 25px !important;
  @media (max-width: 768px) {
    left: calc(50% - 85px) !important;
    margin: auto;
  }
`;

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  h1,
  p {
    margin: 0;
  }
  h1 {
    font-size: 1.5em !important;
    text-align: center;
  }

  @media (max-width: 480px) {
    h1,
    p {
      text-align: center;
    }
  }
`;

const FormPaperWithHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 450px;
  margin-top: 60px;
  overflow-y: auto;
  p {
    font-size: 1em !important;
    color: rgba(34, 55, 77, 0.5);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    margin-top: 100px;
  }
`;

const FormPaper = styled.div`
  box-shadow: 0px 20px 50px rgba(34, 55, 77, 0.1);
  border-radius: 5px;
  width: 100%;
  padding: 30px 50px;
  background-color: #fff;
  margin-bottom: 30px;
  svg {
    fill: #29496a;
  }
  .submit_button {
    margin-top: 20px;
  }
  p {
    margin-top: 15px;
    text-align: center;
    font-size: 1em;
  }

  @media (max-width: 480px) {
    width: 90%;
    margin: auto;
    margin-top: 20px;
    padding: 15px 25px;
  }
`;

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #f9f8f8;
`;

export default AddProfileDetailsPage;
