import admin from "./firebase.js";

export const cleanUpLogic = async () => {
  const now = Date.now();
  const MAX_AGE = 6 * 60 * 1000; // It will match the 6 mim duration of my user

  let nextPageToken;

  do {
    const result = await admin.auth().listUsers(1000, nextPageToken);
    nextPageToken = result.pageToken;

    for (const user of result.users) {
      const isPasswordUser = user.providerData.some(
        (p) => p.providerId === "password"
      );

      if (!user.emailVerified && isPasswordUser) {
        const createdAt = new Date(user.metadata.creationTime).getTime();

        if (now - createdAt > MAX_AGE) {
          await admin.auth().deleteUser(user.uid);
          console.log("Deleted unverified user:", user.email);
        }
      }
    }
  } while (nextPageToken);
};

