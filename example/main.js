///<reference path="Application"/>
///<reference path="../src/Container"/>
///<reference path="../src/AnnotationReader"/>
///<reference path="../src/InjectionProcessor"/>
///<reference path="../src/JQueryProcessor"/>

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

var jsonProcessor = new JsonProcessor(reader);

var testJson = new JsonExample();

console.log(testJson);
console.log(jsonProcessor.classToJson(testJson));
//# sourceMappingURL=main.js.map
