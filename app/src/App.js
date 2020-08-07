import React, { useState } from "react";
import { useAragonApi } from "@aragon/api-react";
import {
  Box,
  Button,
  GU,
  Header,
  IconMinus,
  IconPlus,
  Main,
  SyncIndicator,
  Tabs,
  Text,
  textStyle,
} from "@aragon/ui";
import styled from "styled-components";
import TextInput from "@aragon/ui/dist/TextInput";

function App() {
  const { api, appState, path, requestPath } = useAragonApi();
  var {
    count,
    isSyncing,
    name,
    governedContractAddress,
    totalSupply,
  } = appState;
  console.info("appState -->> ", appState);
  const [txtGovernedContractAddress, setTxtGovernedContractAddress] = useState(
    governedContractAddress
  );
  const [txtVerifyAccount, setTxtVerifyAccount] = useState("");
  const [txtUnapproveAccount, setTxtUnapproveAccount] = useState("");
  const [txtApproveAccount, setTxtApproveAccount] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Main>
      {isSyncing && <SyncIndicator />}
      <Header
        primary="V-governance for:"
        secondary={
          <span
            css={`
              ${textStyle("title2")}
            `}
          >
            {name}
          </span>
        }
      />
      <Tabs
        items={[
          "Overview", //0
          "Economic Parameters", //1
          "Accounts", //2
          "Fuses", //3
          "Governed contract", //4
        ]}
        selected={selectedTab}
        onChange={setSelectedTab}
      />
      {selectedTab == 0 && (
        <Box
          css={`
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            height: ${50 * GU}px;
            ${textStyle("title3")};
          `}
        >
          <p>Overview for : {name}</p>
          <p>Total supply : {totalSupply}</p>
        </Box>
      )}
      {
        //OVERVIEW TAB
        selectedTab == 1 && (
          <Box
            css={`
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              height: ${50 * GU}px;
              ${textStyle("title3")};
            `}
          >
            Under development
          </Box>
        )
      }
      {
        //ACCOUNTS TAB
        selectedTab == 2 && (
          <Box
            css={`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
              height: ${50 * GU}px;
              ${textStyle("title3")};
            `}
          >
            <div
              css={`
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                text-align: center;
                height: ${10 * GU}px;
              `}
            >
              Verify account:&nbsp;
              <TextInput
                label="Verify account"
                value={txtVerifyAccount}
                onChange={(event) => {
                  setTxtVerifyAccount(event.target.value);
                }}
              ></TextInput>
              <Button
                display="icon"
                icon={<IconPlus />}
                label="Verify"
                mode="positive"
                onClick={() => {
                  api.verifyAccount(txtVerifyAccount).toPromise();
                }}
                css={`
                  margin-left: ${2 * GU}px;
                `}
              />
            </div>
            <div
              css={`
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                text-align: center;
                height: ${10 * GU}px;
              `}
            >
              Approve account:&nbsp;
              <TextInput
                label="Approve account"
                value={txtApproveAccount}
                onChange={(event) => {
                  setTxtApproveAccount(event.target.value);
                }}
              ></TextInput>
              <Button
                display="icon"
                icon={<IconPlus />}
                label="Approve"
                mode="positive"
                onClick={() => {
                  api.approveAccount(txtApproveAccount).toPromise();
                }}
                css={`
                  margin-left: ${2 * GU}px;
                `}
              />
            </div>
            <div
              css={`
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                text-align: center;
                height: ${10 * GU}px;
              `}
            >
              Unapprove Account:&nbsp;
              <TextInput
                label="Unapprove account"
                value={txtUnapproveAccount}
                onChange={(event) => {
                  setTxtUnapproveAccount(event.target.value);
                }}
              ></TextInput>
              <Button
                display="icon"
                icon={<IconMinus />}
                label="Unapprove"
                mode="negative"
                onClick={() => {
                  api.unapproveAccount(txtUnapproveAccount).toPromise();
                }}
                css={`
                  margin-left: ${2 * GU}px;
                `}
              />
            </div>
          </Box>
        )
      }
      {selectedTab == 3 && (
        <Box
          css={`
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            height: ${50 * GU}px;
            ${textStyle("title3")};
          `}
        >
          Under development
        </Box>
      )}
      {
        //GOVERNED CONTRACT TAB
        selectedTab == 4 && (
          <Box
            css={`
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              height: ${50 * GU}px;
              ${textStyle("title3")};
            `}
          >
            Governed contract is {governedContractAddress}
            <TextInput
              label="Governed Contract Address"
              value={txtGovernedContractAddress}
              onChange={(event) => {
                setTxtGovernedContractAddress(event.target.value);
              }}
            ></TextInput>
            <Button
              label="Set"
              onClick={() =>
                api.setVICoinAddress(txtGovernedContractAddress).toPromise()
              }
            ></Button>
          </Box>
        )
      }
    </Main>
  );
}

const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 40px;
  margin-top: 20px;
`;

export default App;
