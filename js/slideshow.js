// HELPER FUNCTION TO GET DOM ELEMENTS
const $ = (id) => document.getElementById(id)

// SLIDESHOW OBJECT
const slideshow = function () {
    // PRIVATE MEMBERS
    let timer
    let play = true
    let nodes = {image: null, caption: null}
    let img = {cache: [], counter: 0}
    // PRIVATE: STOPS SLIDESHOW
    const stopSlideShow = function () {
        clearInterval(timer)
    }
    // PRIVATE: DISPLAYS THE NEXT IMAGE
    const displayNextImage = function () {
        if (img.counter === img.cache.length - 1) {
            img.counter = 0
        } else {
            img.counter++
        }
        let image = img.cache[img.counter]
        nodes.image.src = image.src
        nodes.caption.innerHTML = image.title
    }
    // PRIVATE: DISPLAYS PLAY/PAUSE TEXT ON BUTTON
    const setPlayText = function (btn) {
        if (play) {
            btn.value = 'Resume'
        } else {
            btn.value = 'Pause'
        }
    }

    // PUBLIC MEMBERS
    return {
        loadImages: function (slides) {
            let image
            for (let i = 0; i < slides.length; i++) {
                image = new Image()
                image.src = slides[i].href
                image.title = slides[i].title
                img.cache.push(image)
            }
            return this
        },
        startSlideShow: function () {
            if (arguments.length === 2) {
                nodes.image = arguments[0]
                nodes.caption = arguments[1]
            }
            timer = setInterval(displayNextImage, 2000)
            return this
        },
        createToggleHandler: function () {
            let me = this
            // CLOSURE USED AS THE CLICK EVENT HANDLER
            return function () {
                // 'this' REPRESENTS THE CLICKED BUTTON
                // 'me' IS THE OBJECT LITERAL
                if (play) {
                    stopSlideShow()
                } else {
                    me.startSlideShow()
                }
                setPlayText(this)
                // TOGGLE BETWEEN TRUE AND FALSE
                play = !play
            }
        }
    }
}

// CRRATE NEW SLIDESHOW OBJECT
const newSlideShow = slideshow()

// CREATE ARRAY OF SLIDES
const slides = [
    {href: 'images/backpack.jpg', title: 'He likes to backpack in the Sierras.'},
    {href: 'images/boat.jpg', title: 'He loves his wake boat.'},
    {href: 'images/camaro.jpg', title: 'He loves his 67 Camaro.'},
    {href: 'images/punk.jpg', title: 'He use to be in a punk band.'},
    {href: 'images/race.jpg', title: 'He loves to obstacle course race.'},
    {href: 'images/wakeboard.jpg', title: 'He loves to wakeboard.'},
    {href: 'images/wakesurf.jpg', title: 'He also loves to wakesurf.'}
]

// START SLIDESHOW
newSlideShow.loadImages(slides).startSlideShow($('image'), $('caption'))

// ATTACH EVENT HANDLER TO PLAY/PAUSE BUTTON
$('play_pause').onclick = newSlideShow.createToggleHandler()