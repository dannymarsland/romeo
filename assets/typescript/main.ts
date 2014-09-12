///<reference path="Application"/>
///<reference path="Container"/>
///<reference path="AnnotationReader"/>
///<reference path="InjectionProcessor"/>
///<reference path="JQueryProcessor"/>
///<reference path="../js/vendor/jquery.d.ts"/>
declare var __annotations : {[d:string] :AnnotatedClassJson};


$(document).ready(()=>{
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

    console.log('TestJson',testJson);
    console.log('AfterProcessing',jsonProcessor.classToJson(testJson));

});

