const customizedMsg = (result: object, item: string) => {
  if (Object.keys(result).length > 1) {
    return `${Object.keys(result).length} ${item} have been retrieved`;
  } else if (Object.keys(result).length === 1) {
    return `${Object.keys(result).length} ${item} has retrieved`;
  } else return 'No user found in DB';
};

export default customizedMsg;
