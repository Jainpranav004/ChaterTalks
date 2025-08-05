export const getSender = (loggedUser, users) => {
  if (!Array.isArray(users) || users.length === 0) {
    return "Unknown User";
  }

  // Find the other user in the array
  const otherUser = users.find(u => u && u._id !== loggedUser?._id);
  return otherUser?.name || "Unknown User";
};

export const getSenderFull = (loggedUser, users) => {
  if (!Array.isArray(users) || users.length === 0) {
    return "Unknown User";
  }

  // Find the other user in the array
  const otherUser = users.find(u => u && u._id !== loggedUser?._id);
  return users.find(u => u && u._id !== loggedUser?._id) || null;
};
