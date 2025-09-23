const formatHash = (
  address: string,
  atStart: number = 6,
  atEnd: number = 5
) => {
  if (address.length <= 10) return address;
  return `${address.slice(0, atStart)}...${address.slice(-atEnd)}`;
};

export { formatHash };
