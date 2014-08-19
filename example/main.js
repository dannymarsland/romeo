var reader = new AnnotationReader(__annotations);
var processors = [
    new InjectionProcessor(),
    new JQueryProcessor()
];
var container = new Container(reader, processors);
var app = new Application();
console.log('Before processing', app);
container.addBean(app);
container.process();
console.log('After processing', app);
//# sourceMappingURL=main.js.map
