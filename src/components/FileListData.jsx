import React from "react";

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */
export const FileListData = (data) => {
  const csv = data.graphData;
  return (
    <div id="data">
      <div id="filelist-div">
        <pre>{csv}</pre>
      </div>
      New entry:
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br></br>
        <label>
          Address:
          <input type="text" name="address" />
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
