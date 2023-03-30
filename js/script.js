import { SlideNav } from "./slide.js"

const slide = new SlideNav('.slide', '.container')
slide.init()
slide.addArrowNav('.prev', '.next')
slide.addControl('.custom-controls')
