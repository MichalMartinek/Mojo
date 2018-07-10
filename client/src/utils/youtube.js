// @flow
import * as constants from "../constants";

const handleFetchError = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
const parseJson = (res) => (res.json())

export const videoInfo = (id: string): Promise<{}> => (
  fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&key=${constants.GOOGLE_API}`,
    {
      method: 'GET',
    }
  ).then(handleFetchError).then(parseJson)
)