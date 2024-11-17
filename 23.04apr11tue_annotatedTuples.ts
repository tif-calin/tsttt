const hex2rgb = (hex?: string) => Number(hex);

const createMockEdges1 = (
  tuples: Array<[string, string, string?]>
) => {
  return tuples.map(([sourceNodeId, targetNodeId, color]) => ({
    __typename: 'Edge',
    source: sourceNodeId,
    target: targetNodeId,
    color: hex2rgb(color || '')
  }));
};

const createMockEdges2 = (
  tuples: Array<[source: string, target: string, color?: string]>
) => {
  return tuples.map(([sourceNodeId, targetNodeId, color]) => ({
    __typename: 'Edge',
    source: sourceNodeId,
    target: targetNodeId,
    color: hex2rgb(color)
  }));
};

createMockEdges2([
  ['a', 'b', '#ff0000'],
  ['b', 'c', '#00ff00'],
  ['a', 'd']
])
