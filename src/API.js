//This is the Auth token, you will use it to generate a meeting and connect to it
export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIyZDg1ZjgyOC0wNzQ2LTRhZDgtYmQwNy1mOTQxMGM4YmU4NzIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc3MDE5MTE4NiwiZXhwIjoxNzcwNzk1OTg2fQ.IPwOPYt69iZoY2CkribcLoQo2xv620cugDKpyY5R0p0";
// API call to create a meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
 
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  return roomId;
};