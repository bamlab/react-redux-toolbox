const getNodeText = (node) => {
  const hasChildren = node.children().length;

  if (!hasChildren) return node.text();

  return node.children().reduce((text, child) => text + getNodeText(child), '');
};

export default getNodeText;
