import { useMsal } from "@azure/msal-react";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { driveRequest } from "../authConfig";
import { callMsGraph, callMsGraphFileContent } from "../graph";
import { FileListData } from "./FileListData";
import { graphConfig } from "../authConfig";

export const DbFileProvider = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  function RequestFileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...driveRequest,
        account: accounts[0],
      })
      .then((response) => {
        return callMsGraphFileContent(response.accessToken);
      })
      .then((text_body) => {
        console.log(text_body);
        if (!text_body.includes("itemNotFound")) {
          setGraphData(text_body);
        } else {
          setGraphData(
            "name,address,status\nJohn Doe,18L3eimfvS1t4DvNweJdv1s7KZUKkHRiGF,verified\nPeter Parker,16e4iyWU4Vj6GGvVgiXZDRZ7jQBfsU75jq,verified"
          );
        }
      });
  }

  return (
    <>
      {graphData ? (
        <FileListData graphData={graphData} />
      ) : (
        <div>
          If this is the first time you are using this, a "proofs.csv" file with
          some minimal fake data will be generated on OneDrive. <br></br>
          <br></br>
          New data you generate will be synced there afterwards.
          <br></br>
          <br></br>
          You can find the file in "My files -> Apps -> Sync Demo -> proofs.csv"
          <br></br>
          <br></br>
          <Button variant="secondary" onClick={RequestFileData}>
            Get data from {accounts[0].name}'s OneDrive
          </Button>
        </div>
      )}
    </>
  );
};
