const $ = (id) => {
    return document.getElementById(id);
}

const slideshow = function () {
    // PRIVATE MEMBERS
    let timer;
    let play = true;
    let nodes = {image: null, caption: null};
    let img = {cache: [], counter: 0};

    const stopSlideShow = function () {
        clearInterval(timer);
    }

    const displayNextImage = function () {
        if (img.counter === img.cache.length - 1) {
            img.counter = 0;
        } else {
            img.counter++;
        }
        let image = img.cache[img.counter];
        nodes.image.src = image.src;
        nodes.caption.innerHTML = image.title;
    }

    const setPlayText = function (btn) {
        if (play) {
            btn.value = 'Resume';
        } else {
            btn.value = 'Pause';
        }
    }

    // PUBLIC MEMBERS
    return {
        loadImages: function (slides) {
            let image;
            for (let i = 0; i < slides.length; i++) {
                image = new Image();
                image.src = slides[i].href;
                image.title = slides[i].title;
                img.cache.push(image);
            }
            return this;
        },
        startSlideShow: function () {
            if (arguments.length === 2) {
                nodes.image = arguments[0];
                nodes.caption = arguments[1];
            }
            timer = setInterval(displayNextImage, 2000);
            return this;
        },
        createToggleHandler: function () { 
            let me = this;
            // CLOSURE USED AS THE CLICK EVENT HANDLER
            return function () {
                // 'THIS' IS THE CLICKED BUTTON 
                // 'ME' IS THE OBJECT LITERAL
                if (play) {
                    stopSlideShow();
                } else {
                    me.startSlideShow();
                }
                setPlayText(this);
                // TOGGLE BETWEEN TRUE AND FALSE
                play = !play;
            };
        }
    };
};

// CREATE THE SLIDESHOW OBJECT
const newSlideShow = slideshow();

window.addEventListener('load', () => {
    const slides = [
        {href: 'images/backpack.jpg', title: 'He loves backpacking in the Sierras'},
        {href: 'images/boat.jpg', title: 'He loves his boat'},
        {href: 'images/camaro.jpg', title: 'He loves his Camaro more'},
        {href: 'images/punk.jpg', title: 'He used to be in a punk band and toured with numerous bands'},
        {href: 'images/race.jpg', title: 'He loves obstacle course racing'},
        {href: 'images/wakeboard.jpg', title: 'He loves wakeboarding and wakesurfing'}
    ];
    // START SLIDESHOW
    newSlideShow.loadImages(slides).startSlideShow($('image'), $('caption'));
    // ATTACH EVENT HANDLER TO PLAY/PAUSE BUTTON
    $('play_pause').onclick = newSlideShow.createToggleHandler();
});