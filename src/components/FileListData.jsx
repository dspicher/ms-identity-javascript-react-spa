import React from "react";

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */
export const FileListData = (props) => {
  return (
    <div id="filelist-div">
      <pre>
        {JSON.stringify(
          props.graphData.value.filter(
            (value) => value.name === "2023_03_signature_proofs.xlsx"
          ),
          null,
          2
        )}
      </pre>
    </div>
  );
};
