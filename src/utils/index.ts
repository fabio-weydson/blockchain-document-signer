const formatHash = (
  address: string,
  atStart: number = 6,
  atEnd: number = 5
) => {
  if (address.length <= 10) return address;
  return `${address.slice(0, atStart)}...${address.slice(-atEnd)}`;
};

const docNameSlugify = (hash: string, name: string) => {
  const hashPart = hash.slice(0, 8);
  const extensionPart = name.includes(".") ? name.split(".").pop() : "";
  const namePart = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  return `${hashPart}-${namePart}.${extensionPart}`;
};

export { formatHash, docNameSlugify };
