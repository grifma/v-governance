import React, { useState, ErrorBoundary } from "react";
import { useAragonApi } from "@aragon/api-react";
import {
  Box,
  Button,
  GU,
  Header,
  IconMinus,
  IconPlus,
  IconSettings,
  IconEthereum,
  Main,
  SyncIndicator,
  Tabs,
  Text,
  textStyle,
  TokenAmount,
} from "@aragon/ui";
import styled from "styled-components";
import TextInput from "@aragon/ui/dist/TextInput";

function App() {
  const { api, appState, path, requestPath } = useAragonApi();
  var {
    isSyncing,
    name,
    governedContractAddress,
    totalSupply,
    transactionFee,
    communityContribution,
  } = appState;
  console.info("appState -->> ", appState);
  const [txtGovernedContractAddress, setTxtGovernedContractAddress] = useState(
    governedContractAddress
  );
  const [txtVerifyAccount, setTxtVerifyAccount] = useState("");
  const [txtUnapproveAccount, setTxtUnapproveAccount] = useState("");
  const [txtApproveAccount, setTxtApproveAccount] = useState("");
  const [txtCommunityContribution, setTxtCommunityContribution] = useState(
    communityContribution
  );
  const [txtTransactionFee, setTxtTransactionFee] = useState(transactionFee);
  const [txtFuseId, setTxtFuseId] = useState(0);
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
          "Experimental", //5
        ]}
        selected={selectedTab}
        onChange={setSelectedTab}
      />
      {selectedTab == 0 && (
        //OVERVIEW TAB
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
          {/* <ErrorBoundary>
            <TokenAmount
              address={"0x6B175474E89094C44Da98b954EedeAC495271d0F"}
              amount={totalSupply}
              decimals={18}
            />
          </ErrorBoundary> */}
        </Box>
      )}
      {selectedTab == 1 && (
        //ECONOMIC PARAMETERS TAB
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
          <div>
            Community contribution: (to 2 decimal places)
            <TextInput
              label="Community contribution"
              value={txtCommunityContribution}
              onChange={(event) => {
                setTxtCommunityContribution(event.target.value);
              }}
            ></TextInput>
            <Button
              display="icon"
              icon={<IconSettings />}
              label="Set"
              onClick={() => {
                api
                  .updateCommunityContribution(txtCommunityContribution)
                  .toPromise();
              }}
              css={`
                margin-left: ${2 * GU}px;
              `}
            />
          </div>
          <div>
            Transaction fee: (to 2 decimal places)
            <TextInput
              label="Transaction fee"
              value={txtTransactionFee}
              onChange={(event) => {
                setTxtTransactionFee(event.target.value);
              }}
            ></TextInput>
            <Button
              display="icon"
              icon={<IconSettings />}
              label="Set"
              onClick={() => {
                api.updateTransactionFee(txtTransactionFee).toPromise();
              }}
              css={`
                margin-left: ${2 * GU}px;
              `}
            />
          </div>
        </Box>
      )}
      {selectedTab == 2 && (
        //ACCOUNTS TAB
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
      )}
      {selectedTab == 3 && (
        //FUSES TAB
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
          <div>
            Permanently lock setting with ID:
            <TextInput
              label="Fuse ID"
              value={txtFuseId}
              onChange={(event) => {
                setTxtFuseId(event.target.value);
              }}
            ></TextInput>
            <Button
              display="icon"
              icon={<IconEthereum />}
              label="Set"
              mode="negative"
              onClick={() => {
                api.blowFuse(txtFuseId, true).toPromise();
              }}
              css={`
                margin-left: ${2 * GU}px;
              `}
            />
          </div>
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
      {
        // //EXPERIMENTAL TAB
        // selectedTab == 5 && (
        //   <Box
        //     css={`
        //       display: flex;
        //       align-items: center;
        //       justify-content: center;
        //       text-align: center;
        //       height: ${50 * GU}px;
        //       ${textStyle("title3")};
        //     `}
        //   >
        //     <TotalSupply totalSupply={totalSupply} />
        //   </Box>
        // )
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

const TotalSupply = ({ totalSupply }) => {
  return (
    <ErrorBoundary>
      <TokenAmount
        address={"0x6B175474E89094C44Da98b954EedeAC495271d0F"}
        amount={totalSupply}
        decimals={18}
      />
    </ErrorBoundary>
  );
};
// const TotalSupply = (
//   <ErrorBoundary>
//     <TokenAmount
//       address={"0x6B175474E89094C44Da98b954EedeAC495271d0F"}
//       amount={totalSupply}
//       decimals={18}
//     />
//   </ErrorBoundary>
// );

export default App;
