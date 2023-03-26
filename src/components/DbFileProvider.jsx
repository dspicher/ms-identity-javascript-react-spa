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
        callMsGraph(response.accessToken, graphConfig.graphListFilesEndpoint)
          .then((graphData) => {
            return graphData.value;
          })
          .then((b) => b.filter((value) => value.name === "proofs.csv"))
          .then((arr) => arr[0])
          .then((item) => [item.id])
          .then((id) => callMsGraphFileContent(response.accessToken, id))
          .then(setGraphData);
      });
  }

  return (
    <>
      {graphData ? (
        <FileListData graphData={graphData} />
      ) : (
        <Button variant="secondary" onClick={RequestFileData}>
          Fetch from {accounts[0].name}'s OneDrive
        </Button>
      )}
    </>
  );
};
