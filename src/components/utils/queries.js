const TBOX = process.env.REACT_APP_TBOX_GRAPH;
const ABOX = process.env.REACT_APP_ABOX_GRAPH;


export const QUERY_TO_GET_MEASURE_FOR_GEOGRAPHIC_LEVEL = (aggFuncShort, selectedDataset, selectedMeasure, selectedGeographicLevel, selectedGeographicLevelAttribute) => {
    return `
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX qb4o: <http://purl.org/qb4olap/cubes#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?regionName (${aggFuncShort}(xsd:integer(?m)) AS ?value)
FROM <${TBOX}>
FROM <${ABOX}>
WHERE {
  ?o a qb:Observation ;
     qb:dataSet <${selectedDataset}> ;
     <${selectedMeasure}> ?m .
  ?o ?cuboidDimProperty ?cuboidEntity .
  ?cuboidEntity qb4o:memberOf ?cuboidLevel .
  FILTER(?cuboidDimProperty != qb:dataSet && ?cuboidDimProperty != <${selectedMeasure}> && ?cuboidLevel != <${selectedMeasure}>)
  OPTIONAL {
    ?cuboidEntity ?hierarchyProperty1 ?geoEntity1 .
    ?hierarchyProperty1 a qb4o:RollupProperty .
    ?geoEntity1 qb4o:memberOf <${selectedGeographicLevel}> .
  }
  OPTIONAL {
    ?cuboidEntity ?hierarchyProperty1 ?geoEntity1 .
    ?hierarchyProperty1 a qb4o:RollupProperty .
    ?geoEntity1 ?hierarchyProperty2 ?geoEntity2 .
    ?hierarchyProperty2 a qb4o:RollupProperty .
    ?geoEntity2 qb4o:memberOf <${selectedGeographicLevel}> .
  }
  OPTIONAL {
    ?cuboidEntity ?hierarchyProperty1 ?geoEntity1 .
    ?hierarchyProperty1 a qb4o:RollupProperty .
    ?geoEntity1 ?hierarchyProperty2 ?geoEntity2 .
    ?hierarchyProperty2 a qb4o:RollupProperty .
    ?geoEntity2 ?hierarchyProperty3 ?geoEntity3 .
    ?hierarchyProperty3 a qb4o:RollupProperty .
    ?geoEntity3 qb4o:memberOf <${selectedGeographicLevel}> .
  }
  BIND(COALESCE(?geoEntity3, ?geoEntity2, ?geoEntity1, ?cuboidEntity) AS ?finalEntity)
  ?finalEntity qb4o:memberOf <${selectedGeographicLevel}> .
  ?finalEntity <${selectedGeographicLevelAttribute}> ?regionName .
}
GROUP BY ?regionName ?m
ORDER BY ?regionName
    `
}

export const QUERY_TO_GET_LEVELS = (selectedDataset) => {
    return `
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX qb4o: <http://purl.org/qb4olap/cubes#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT DISTINCT ?level ?levelAtrribute
FROM <${TBOX}>
FROM <${ABOX}>
WHERE {
  <${selectedDataset}> rdf:type qb:DataSet ; 
    qb:structure ?cuboid.

  ?cuboid qb:component ?BNodeForCuboidLevel ;
          qb4o:isCuboidOf ?cube.

  ?BNodeForCuboidLevel qb4o:level ?cuboidLevel.

  ?cuboidHierarchy qb4o:hasLevel ?cuboidLevel ;
                   qb4o:inDimension ?dimension.

  ?cube rdf:type qb:DataStructureDefinition ;
        qb:component ?BNodeForDimension.

  ?BNodeForDimension qb4o:dimension ?dimension.

  ?dimension qb4o:hasHierarchy ?hierarchy.

  FILTER EXISTS {
    ?hierarchy qb4o:hasLevel ?hl .
    FILTER(?hl = ?cuboidLevel)
  }

  ?hierarchy qb4o:hasLevel ?level.
  ?level qb4o:hasAttribute ?levelAtrribute.
}
ORDER BY ?level ?levelAtrribute`;
}

export const QUERY_TO_GET_MEASURES = (selectedDataset) => {
    return `
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX qb4o: <http://purl.org/qb4olap/cubes#>
SELECT DISTINCT ?measure ?aggFunc
FROM <${TBOX}>
WHERE {
    <${selectedDataset}> a qb:DataSet ;
            qb:structure ?cuboid .
    ?cuboid qb:component ?bnode .
    ?bnode qb:measure ?measure ;
            qb4o:aggregateFunction ?aggFunc .
}
ORDER BY ?measure ?aggFunc
`
}

export const QUERY_TO_GET_DATASETS = ()=>{
    return `
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX qb4o: <http://purl.org/qb4olap/cubes#>
PREFIX cdw: <http://bike-csecu.com/datasets/covid/cdw#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT DISTINCT ?dataset
FROM <${TBOX}>
WHERE {
?dataset rdf:type qb:DataSet ;
            qb:structure ?cuboid .
?cuboid qb:component ?BNodeForCuboidLevel ;
        qb4o:isCuboidOf ?cube .
}
ORDER BY ?dataset
`
}