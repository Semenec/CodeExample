import React, { Component } from "react";
import styled from "styled-components";
import Heading from "../../../common/Heading";
import MainDrugSearch from "./MainDrugSearch";
import MainSourcesOfInformation from "./MainSourcesOfInformation";
import MainSearchForSideEffects from "./MainSearchForSideEffects";
import MainSideEffectsTable from "./MainSideEffectsTable";

export default class MainPage extends Component {
  state = {
    tab: 0
  };

  handleChangeTab = index => this.setState({ tab: index });

  render() {
    const { tab } = this.state;

    return (
      <Wrap>
        <Heading size={1.5}>Главная</Heading>
        <BlockContainer>
          <MainDrugSearch />
          <TabsContainer>
            <MainSourcesTabsWrap width={tab === 1 ? "100%" : "47%"}>
              <MainSourcesTabsItem
                active={tab === 0}
                onClick={() => this.handleChangeTab(0)}
              >
                <Heading>Источники</Heading>
              </MainSourcesTabsItem>
              <MainSourcesTabsItem
                active={tab === 1}
                onClick={() => this.handleChangeTab(1)}
              >
                <Heading>Побочные эффекты</Heading>
              </MainSourcesTabsItem>
            </MainSourcesTabsWrap>
            <div className="content">
              {tab === 0 ? (
                <div className="content_conteiners">
                  <MainSourcesOfInformation
                    tab={tab}
                    handleChangeTab={this.handleChangeTab}
                  />
                  <MainSearchForSideEffects />
                </div>
              ) : (
                <SideEffectWrap>
                  <MainSideEffectsTable />
                </SideEffectWrap>
              )}
            </div>
          </TabsContainer>
        </BlockContainer>
      </Wrap>
    );
  }
}

const TabsContainer = styled.div`
  width: 68%;
  margin-top: 25px;
  .content {
    display: flex;
  }
  .content_conteiners {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 1000px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    .content_conteiners {
      flex-direction: column;
    }
  }
`;

const MainSourcesTabsItem = styled.div`
  text-transform: uppercase;
  padding-bottom: 4px;
  border-bottom: 2px solid ${props => (props.active ? "#004D40" : "#01B6A7")};
  position: relative;
  top: 2px;
  margin-right: 11px;
  cursor: pointer;
  h1 {
    font-size: 1em;
    color: ${props => (props.active ? "#004D40" : "rgba(0, 77, 64, 0.5)")};
  }
`;

const MainSourcesTabsWrap = styled.div`
  display: flex;
  align-items: center;
  width: ${props => props.width};
  border-bottom: 2px solid #01b6a7;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SideEffectWrap = styled.div`
  width: 100%;
  max-width: 100%;
`;

const BlockContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 27px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Wrap = styled.div`
  width: 100%;
  min-height: 400px;
`;
