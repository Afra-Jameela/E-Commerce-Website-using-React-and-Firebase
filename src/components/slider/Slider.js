import { AiOutlineArrowLeft , AiOutlineArrowRight  } from "react-icons/ai"
import { SliderData } from "./Slider-data"
import { useEffect, useState } from "react"
import "./Slider.scss"

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideLength= SliderData.length;
  const autoScroll = true;
  let slideInterval
  let intervalTime=5000
  const nextSlide =()=>{
    setCurrentSlide(currentSlide ===slideLength-1?0:currentSlide+1)
  }
  const PrevSlide =()=>{
    setCurrentSlide(currentSlide === 0 ?slideLength-1 :currentSlide-1)
  }
   
  useEffect(()=>{
    setCurrentSlide(0)

  },[])
  
  useEffect(()=>{
    
    if (autoScroll){
      const auto=()=>{
    slideInterval=setInterval(nextSlide,intervalTime)
    } 
    auto()
    }
    return ()=>clearInterval(slideInterval)
    
  },[currentSlide,slideInterval,autoScroll])
  return (
    <div className="slider">
      <AiOutlineArrowLeft  onClick={PrevSlide} className=" arrow prev"/>
      <AiOutlineArrowRight onClick={nextSlide} className=" arrow next"/>
      

      {SliderData.map((slide,index) =>{
        const {image, heading, desc} = slide
        return(
          <div key={index} className={index === currentSlide ? "slide current": "slide"}> 
            {index === currentSlide && (
              <>
                <img src={image} alt="slide"></img>
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a href="#product" className="--btn --btn-primary"> Shop Now</a>
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Slider
