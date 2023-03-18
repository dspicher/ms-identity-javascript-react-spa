import React from "react";

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
export const FileListData = (props) => {
    return (
        <div id="filelist-div">
            <pre>{JSON.stringify(props.graphData.value, null, 2)}</pre>
        </div>
    );
};