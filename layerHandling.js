class Layer {
  constructor(context) {
    if (!context) console.error("Layer needs Context object to instantiate");
    this.context = context;
    this.drawingFunctions = [];
  }

  addDrawing(id, func) {
    this.drawingFunctions.push({id: id, func: func});
    return this;
  }

  draw() {
    this.context.update();
  }

  privateDraw(ctx) {
    this.drawingFunctions.forEach((d) => {
      d.func(ctx);
    });
  }
}

class Context {
  constructor(ctx) {
    if (!ctx) console.error("Context needs canvas-context to instantiate");
    this.ctx = ctx;
    this.layers = [];
  }

  addLayer(id, layer) {
    this.layers.push({id: id, layer: layer});
    return this;
  }

  update() {
    this.layers.forEach((d) => {
      d.layer.privateDraw(this.ctx);
    });
  }
}
