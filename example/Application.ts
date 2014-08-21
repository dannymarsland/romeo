///<reference path="../vendor/jquery.d"/>

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
    /** @$element({"qs":".slider"})*/
    private $el: JQuery;
}