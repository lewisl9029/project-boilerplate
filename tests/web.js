import '@tests/node.cjs'
import 'https://jspm.dev/react'
import '@dep/@lewisl9029/render-hooks'

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

export const Component = () => <div>hi</div>
