export default class Slide {
  constructor(slide, container) {
    this.slide = document.querySelector(slide)
    this.container = document.querySelector(container)
    this.distance = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    }
  }

  moveSlide(distX) {
    this.distance.movePosition = distX
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`
  }

  updatePosition(clientX) {
    this.distance.movement = (this.distance.startX - clientX) * 1.5
    return this.distance.finalPosition - this.distance.movement
  }

  onStart(event) {
    let moveType

    if (event.type === 'mousedown') {
      event.preventDefault()

      this.distance.startX = event.clientX
      moveType = 'mousemove'
    } else {
      this.distance.startX = event.changedTouches[0].clientX
      moveType = 'touchmove'
    }

    this.container.addEventListener(moveType, this.onMove)
  }

  onMove(event) {
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX
    const finalPosition = this.updatePosition(pointerPosition)
    this.moveSlide(finalPosition)
  }

  onEnd(event) {
    const moveType = (event.type === 'mouseup') ? 'mousemove' : 'touchmove'
    this.container.removeEventListener(moveType, this.onMove)
    this.distance.finalPosition = this.distance.movePosition
  }

  addSlideEvents() {
    this.container.addEventListener('mousedown', this.onStart)
    this.container.addEventListener('touchstart', this.onStart)
    this.container.addEventListener('mouseup', this.onEnd)
    this.container.addEventListener('touchend', this.onEnd)
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
  }

  // slides settings
  slidePosition(slide) {
    const margin = (this.container.offsetWidth - slide.offsetWidth) / 2
    return -(slide.offsetLeft - margin)
  }

  slidesSettings() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element)
      return {
        position,
        element
      }
    })
  }

  slideIndexNav(index) {
    const last = this.slideArray.length - 1

    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1
    }
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index]
    this.moveSlide(activeSlide.position)
    this.slideIndexNav(index)
    this.distance.finalPosition = activeSlide.position
  }

  init() {
    this.bindEvents()
    this.addSlideEvents()
    this.slidesSettings()
    return this
  }
}
