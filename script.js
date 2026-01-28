const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true,
    multiplier: 2,
    lerp: 0.09   
});



document.querySelectorAll(".elem").forEach(function (elem){

    var rotate = 0;
    var diffrot = 0;



    elem.addEventListener("mouseleave",function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power3,
        });
    });

    elem.addEventListener("mouseover",()=>{
        Object.assign(document.querySelector(".ccircle").style, {
             height: "40px",
             width: "40px"
        })
    })

    elem.addEventListener("mouseleave",()=>{
        Object.assign(document.querySelector(".ccircle").style, {
             height: "10px",
             width: "10px"
        })
    })

    elem.addEventListener("mousemove",function(dets){
        


        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3.out,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot * 0.5),
        });
    });
});



var timeout;

function flat(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(0.8,1.2,dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8,1.2,dets.clientY- yprev);
        
        xprev = dets.clientX;
        yprev = dets.clientY;

        mousefollower(xscale,yscale);
        
        timeout = setTimeout(function(){
        document.querySelector(".ccircle")
        .style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)` ;
        
        },100)

    });
}

function mousefollower(xscale,yscale) {
    window.addEventListener("mousemove", function(dets) {
        document.querySelector(".ccircle")
        .style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})` ; 
    
    });
}

setInterval(updateClock, 1000); // update every second
updateClock(); // run once immediately
flat();
mousefollower();
firstpage();

function firstpage(){
    var tl = gsap.timeline();

    tl.from(".navi",{
        y:-20,
        opacity:0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    .to(".boundingelem",{
        y:0,
        delay:-1,
        ease: Expo.easeInOut,
        duration: 2,
        stagger: 0.2
        
    })

    .from(".foooter",{
        y:45,
        opacity: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1.95,
        stagger: 0.2
        
    })

}



function updateClock() {
      let now = new Date();
      let hours = String(now.getHours()).padStart(2, "0");
      let minutes = String(now.getMinutes()).padStart(2, "0");
      let seconds = String(now.getSeconds()).padStart(2, "0");
      document.getElementById("clock").textContent =
        `${hours}:${minutes}  IN`;
}



