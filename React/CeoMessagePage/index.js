import React, { Component } from "react";
import styled from "styled-components";
import {
  Paragraph,
  Icon,
  MessageItem,
  MessagePreview,
  ContentWrap,
  ContentPreloader
} from "common";

export default class CeoMessagePage extends Component {
  componentDidMount() {
    const {
      listCeoMessage,
      user_dep_id,
      user_id,
      organizations_id
    } = this.props;

    if (user_dep_id) {
      listCeoMessage({
        department_id: user_dep_id,
        user_id: user_id,
        organization_id: organizations_id,
        limit: 0,
        skip: 0
      });
    }
  }

  render() {
    const {
      isLoading,
      list_ceo_message,
      get_ceo_message,
      first_ceo_message,
      isLoadingGet,
      addCeoMessageReadEntry,
      read,
      organizations_id
    } = this.props;

    const getCeoMessage = get_ceo_message ? get_ceo_message : first_ceo_message;

    if (isLoading) return <ContentPreloader />;
    else if (!list_ceo_message.length) {
      return (
        <ContentWrap>
          <BlockWrap>
            <Paragraph className="Head">CEO's Message</Paragraph>
            <NoContentWrap>
              <Paragraph>You have no messages yet</Paragraph>
              <Icon icon="mailbox" />
            </NoContentWrap>
          </BlockWrap>
        </ContentWrap>
      );
    }

    return (
      <ContentWrap>
        <BlockWrap>
          <Paragraph className="Head">CEO's Message</Paragraph>
          <MessagesBlockWrap>
            <MessageListWrap>
              {list_ceo_message &&
                list_ceo_message.map((item, index) => {
                  return (
                    <MessageItem
                      key={index + item.title}
                      getMessage={getCeoMessage}
                      item={item}
                    />
                  );
                })}
            </MessageListWrap>
            <MessagePreview
              isLoading={isLoadingGet}
              message={get_ceo_message}
              addCeoMessageReadEntry={addCeoMessageReadEntry}
              user_id={user_id}
              read={read}
              organizations_id={organizations_id}
            />
          </MessagesBlockWrap>
        </BlockWrap>
      </ContentWrap>
    );
  }
}

const BlockWrap = styled.div`
  border-radius: 10px;
  background-color: #fff;
  .Head {
    font-size: 1.5em;
    color: #4f4f4f;
    margin-bottom: 60px;
  }

  @media (max-width: 768px) {
    padding-bottom: 10%;
  }
  @media (max-width: 650px) {
    padding-bottom: 20%;
  }
`;

const MessagesBlockWrap = styled.div`
  box-shadow: 0px 5px 5px rgba(190, 190, 190, 0.25);
  border-radius: 0px 0px 2px 2px;
  min-height: 450px;
  max-height: 450px;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0;
    display: block;
  }
`;

const MessageListWrap = styled.div`
  width: 30%;
  background: #fcfcfc;
  box-shadow: 0px 0px 5px rgba(190, 190, 190, 0.25);
  overflow-y: auto;
  @media (max-width: 768px) {
    width: 100%;
    height: 100px;
  }
`;

const NoContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 500px;
  margin-top: -50px;
  i {
    font-size: 5.5em;
    color: #e0e0e0;
    margin: 0 auto;
  }
  p {
    margin: 0 auto;
    font-size: 0.9em;
    margin-bottom: 20px;
  }
`;
