export const importMeta = () => {
  return import.meta
}

export const nestedTernary = () => {
  const condition = true
  const nestedCondition1 = true
  const nestedCondition2 = true
  return condition
    ? nestedCondition1
      ? true
      : false
    : nestedCondition2
    ? true
    : false
}
