const graphlib = require('graphlib');


const linearConfig = () => {
  let directedG = new graphlib.Graph();
  // Just list all the props you want to collect in props
  directedG.setNode('/a', { props: "some-props" });
  directedG.setNode('/b', { props: "some-props" });
  directedG.setNode('/c', { props: "some-props" });
  directedG.setNode('/d', { props: "some-props" });

  directedG.setEdge('/a', '/b', { validation: "validation-rules" });
  directedG.setEdge('/b', '/c', { validation: "validation-rules" });
  directedG.setEdge('/c', '/d', { validation: "validation-rules" });

  const allNodesFromA = graphlib.alg.preorder(directedG, '/a'); 
  console.log('All nodes', allNodesFromA);
}

const loopyConfig = () => {
  let directedG = new graphlib.Graph();
  // Just list all the props you want to collect in props
  directedG.setNode('/a', { props: "some-props" });
  directedG.setNode('/b', { props: "some-props" });
  directedG.setNode('/c', { props: "some-props" });
  directedG.setNode('/d', { props: "some-props" });
  directedG.setNode('/e', { props: "some-props" });

  directedG.setNode('/f', { props: "some-props" });
  directedG.setNode('/g', { props: "some-props" });
  directedG.setNode('/h', { props: "some-props" });

  directedG.setNode('/i', { props: "some-props" });
  directedG.setNode('/j', { props: "some-props" });
  directedG.setNode('/k', { props: "some-props" });

  directedG.setEdge('/a', '/b', { validation: "validation-rules" });
  directedG.setEdge('/b', '/c', { validation: "validation-rules" });
  directedG.setEdge('/c', '/d', { validation: "validation-rules" });
  directedG.setEdge('/d', '/b', { validation: "validation-rules" });

  directedG.setEdge('/d', '/e', { validation: "validation-rules" });
  directedG.setEdge('/e', '/f', { validation: "validation-rules" });
  directedG.setEdge('/f', '/g', { validation: "validation-rules" });
  directedG.setEdge('/e', '/h', { validation: "validation-rules" });
  directedG.setEdge('/h', '/i', { validation: "validation-rules" });

  const allNodesFromA = graphlib.alg.preorder(directedG, '/a'); 
  console.log('All nodes', allNodesFromA);
  const cycles = graphlib.alg.findCycles(directedG);
  console.log(cycles);

  console.log(directedG.edges());
}

const checkAllConfigurations = () => {
  linearConfig();
  loopyConfig();
}

checkAllConfigurations();
