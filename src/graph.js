import { graphConfig } from "./authConfig";

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMsGraph(accessToken, graphEndpoint) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(graphEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMsGraphFileContent(accessToken) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  const response = await fetch("https://graph.microsoft.com/v1.0/me/drive/special/approot/children/proofs.csv/content", options);
  return await response.text();
}

export async function callMsGraphUploadFile(accessToken, content) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);
  headers.append("Content-Type", "text/plain")

  const options = {
    method: "PUT",
    headers: headers,
    body: content
  };

  const response = await fetch("https://graph.microsoft.com/v1.0/me/drive/special/approot/children/proofs.csv/content", options);
  return await response.json();
}
