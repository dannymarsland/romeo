///<reference path="../vendor/jquery.d"/>
///<reference path="../src/Annotations"/>

class Application  {

    /** @inject */
    private gallery: Gallery;

    constructor() {
    }
}

/** @bean({"scope":"prototype"}) */
class Gallery {

    /** @$element({"qs":"#gallery", "root": "body"}) */
    private el: JQuery;

    /** @$element({"qs":"*"}) */
    private $el: JQuery;

    /** @inject */
    private slider: Slider;
}

/** @bean({"scope":"prototype"}) **/
class Slider {
    /** @$element({"qs":".slider", "root":"body"})*/
    private $el: JQuery;
}