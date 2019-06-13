const graphlib = require('graphlib');

let directedG = new graphlib.Graph();

const linearConfig = () => {
  // Just list all the props you want to collect in props
  directedG.setNode('/w', { props: "some-props" });
  directedG.setNode('/x', { props: "some-props" });
  directedG.setNode('/y', { props: "some-props" });
  directedG.setNode('/z', { props: "some-props" });

  directedG.setEdge('/w', '/x', { validation: "validation-rules" });
  directedG.setEdge('/x', '/y', { validation: "validation-rules" });
  directedG.setEdge('/y', '/z', { validation: "validation-rules" });

  const allNodesFromA = graphlib.alg.preorder(directedG, '/w'); 
  console.log('All nodes from w', allNodesFromA);
}

const loopyConfig = () => {
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
}


const findPageWithPartiallyFilledData = sessionData => {
  // TODO: Just get the URL data is keyed against,
  //
  // {
  //   '/a': { boo: 'boo' } 
  // }
  // loop through the keys in sessionData and findPariallyFilledData by looking through the page properties
  // directedG.node('/a');
  return;
}


const whereShouldUserGo = (tryingToGetToUrl, sessionDataSoFar) => {
  const possiblePathsIn = directedG.inEdges(tryingToGetToUrl);
  let goToUrl;

  for (let edge of possiblePathsIn) {
    // If you have loops in the configuration - you could check for loops and set the session data to be a list of properties
    // - we could check the list of properties to check which page the user should be taken to within a loop
    console.log(`All possible paths in from ${edge.v} -> ${edge.w}`);
    const validationRules = directedG.edge(edge.v, edge.w);
    // check if user has been to w already to allow access to v
    const userDataForOtherEndOfEdge = sessionDataSoFar[edge.w];
    // if data is there...
    if (userDataForOtherEndOfEdge !== undefined) {
      // check the data
      // if the user data is intact for the other end of the edge i.e previous page then user is allowed access to url they're trying to visit.
      goToUrl = tryingToGetToUrl;
      // TODO: partial data filled in that case user should go to the other page... 

    }  
  }

  if (goToUrl === undefined) {
    // We checked all the paths where tryingToGetToUrl was one end of the edge but user hasn't been to any of the pages that directly
    // has a path to the page they're trying to get to.
    // In this case we can just go through the partial data filled in by user and point user to that URL
    goToUrl = findPageWithPartiallyFilledData(sessionDataSoFar);
  }

  return goToUrl;
   
}

const loadAllConfigurations = () => {
  linearConfig();
  loopyConfig();

  // Later on from app,
  whereShouldUserGo('/g', {});
  // you can get to /b either from /d or /a -> there's a loop between b -> c -> d -> b 
  whereShouldUserGo('/b', { '/a': { foo: 'foo' } });
}

loadAllConfigurations();
