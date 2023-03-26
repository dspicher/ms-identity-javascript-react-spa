import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";
import { driveRequest } from "../authConfig";
import { callMsGraphUploadFile, callMsGraphFileContent } from "../graph";
import { graphConfig } from "../authConfig";
import React from "react";

import { Form, SubmitButton, TextInputField } from "react-bare-forms";

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */
export const FileListData = (data) => {
  const { instance, accounts } = useMsal();
  const myState = { name: "", address: "" };
  const [state, setState] = React.useState(myState);
  const [CSVstate, setCSVState] = React.useState(data.graphData);
  function SyncToOneDrive() {
    instance
      .acquireTokenSilent({
        ...driveRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraphUploadFile(response.accessToken, CSVstate).then(console.log);
      });
  }

  return (
    <div id="data">
      <div id="filelist-div">
        <pre>{CSVstate}</pre>
      </div>
      New proof:
      <Form
        state={state}
        context={setState}
        bare={false}
        autoComplete="off"
        callback={() =>
          setCSVState(CSVstate + `${state.name},${state.address},verified\n`)
        }
      >
        <TextInputField
          value={state.name}
          name="name"
          label="Name"
          hint="name"
        />
        <TextInputField
          value={state.address}
          name="address"
          label="Address"
          hint="address"
        />

        <SubmitButton>Add Proof</SubmitButton>
      </Form>
      <br></br>
      <Button onClick={SyncToOneDrive}>Sync to OneDrive</Button>
    </div>
  );
};
