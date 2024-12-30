tiled.registerMapFormat("customjs", {
  name: "Advanced JS Single Layer",
  extension: "js",
  
  write: (map, fileName) => {
    if (map.layers.length < 2) {
      throw new Error("Map must have at least one tile layer and one object layer.");
    }
    
    // Find the tile layer and object layer
    let tileLayer = map.layers.find(layer => layer.isTileLayer);
    let objectLayer = map.layers.find(layer => layer.isObjectLayer);
    
    if (!tileLayer) throw new Error("No tile layer found.");
    if (!objectLayer) throw new Error("No object layer found.");
    
    // Collect map data
    let mapData = {
      name: map.property("name") || "ExampleMap", // Map name
      width: map.width,
      height: map.height,
      tileWidth: map.tileWidth,
      tileHeight: map.tileHeight,
      tileset: map.tilesets.length > 0
      ? map.tilesets[0].image.split("/").pop() // Extract tileset filename
      : null,
      data: [], // 2D array for tile data
      objects: [] // Object layer data
    };
    
    // Fill tile data
    for (let y = 0; y < tileLayer.height; y++) {
      let row = [];
      for (let x = 0; x < tileLayer.width; x++) {
        let cell = tileLayer.cellAt(x, y);
        row.push(cell ? cell.tileId : 0); // 0 for empty tiles
      }
      mapData.data.push(row);
    }
    
    // Fill object data
    objectLayer.objects.forEach(object => {
      
      let obData = {
        name: object.name,
        type: object.type,
        x: object.x,
        y: object.y,
        width: object.width,
        height: object.height,
        rotation: object.rotation,
        properties: object.properties()
      }
      mapData.objects.push(obData);
    });
    
    
    // Write to file
  let jsContent = `var ${mapData.name} = ${JSON.stringify(mapData, null, 2)};`;
    let file = new TextFile(fileName, TextFile.WriteOnly);
    file.write(jsContent);
    file.commit();
  }
});
