///<reference path="../vendor/jquery.d"/>

class Application  {

    /** @inject */
    private gallery: Gallery;

    constructor() {
    }
}


class Gallery {
    /** @$element({"qs":"#gallery"}) */
    private $el: JQuery;
    /** @inject */
    private slider: Slider;
}

class Slider {
    /** @$element({"qs":".slider"})*/
    private $el: JQuery;
}