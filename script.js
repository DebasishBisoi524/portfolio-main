//loader Animation
function loaderAnimation() {
  window.onload = () => {
    const load = gsap.timeline();
    const headings = document.querySelectorAll("#loader h1");

    load
      .to(headings[0], {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      })
      .to(headings[0], {
        opacity: 0,
        duration: 0.5,
        delay: 1.5,
      })
      .to(headings[1], {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      })
      .to(headings[1], {
        opacity: 0,
        duration: 0.5,
        delay: 1.5,
      })
      .to(headings[2], {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      })
      .to(headings[2], {
        opacity: 0,
        duration: 0.5,
        delay: 1.5,
      })
      .to("#loader", {
        y: "-100%",
        duration: 1.5,
        ease: "expo.inOut",
        onComplete: () => {
          document.getElementById("loader").style.display = "none";
        },
      });
  };
}

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  multiplier: 1.5,
});

//List Image Container Animation
function listImageContainerAnimation() {
  var listImg = document.querySelector("#list-container");
  var fixImg = document.querySelector("#fixed-image");
  listImg.addEventListener("mouseenter", function () {
    fixImg.style.display = "block";
  });
  listImg.addEventListener("mouseleave", function () {
    fixImg.style.display = "none";
  });

  var list = document.querySelectorAll(".list");
  list.forEach(function (e) {
    e.addEventListener("mouseenter", function () {
      var image = e.getAttribute("data-image");
      fixImg.style.backgroundImage = `url(${image})`;
    });
  });
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  const lerp = (a, b, n) => (1 - n) * a + n * b;
  listImg.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    fixImg.style.opacity = 1;
  });
  function animateCursor() {
    currentX = lerp(currentX, mouseX, 0.08);
    currentY = lerp(currentY, mouseY, 0.08);
    fixImg.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

// github-box scroll animation
function githubScroll() {
  scroll.on("scroll", (args) => {
    const githubBox = document.querySelector("#github-box");
    if (!githubBox) return;
    // Get bounding rect relative to viewport
    const rect = githubBox.getBoundingClientRect();
    // When #github-box is about 40% visible from bottom of viewport, trigger animation
    if (
      rect.top < window.innerHeight * 0.8 &&
      !githubBox.classList.contains("animated")
    ) {
      githubBox.classList.add("animated");
      gsap.fromTo(
        githubBox,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        }
      );
    }
  });
}

//page 2 text animation
function page2TextAnimation() {
  const split = SplitText.create(".page2-text", {
    type: "lines",
  });
  split.lines.forEach((line) => {
    line.classList.add("split-line");
  });
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? scroll.scrollTo(value, 0, 0)
        : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
  scroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.defaults({ scroller: "#main" });

  gsap.registerPlugin(SplitText, ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page2-bottom",
      start: "31% 80%",
      scroller: "#main",
      // markers: true,
      toggleActions: "play none none none",
    },
  });

  tl.from(
    split.lines,
    {
      x: -100,
      autoAlpha: 0,
      stagger: 0.07, // preserves character-by-character effect
      duration: 1.8,
      ease: "power2.out",
    },
    0
  ) // start immediately

    .from(
      ["#bottom-part2 img", "#bottom-part2 p"],
      {
        x: 100,
        autoAlpha: 0,
        duration: 1.8,
        stagger: 0.07,
        ease: "power2.out",
      },
      0
    );
}

// alert box
function alertBoxAnimation() {
  const alertBox = document.querySelector("#customAlert");
  const backdrop = document.querySelector("#backdrop");
  const resumeLink = document.querySelector("#driveLink");
  const yesBtn = document.querySelector("#yesBtn");
  const noBtn = document.querySelector("#noBtn");
  const video = document.querySelector("#bgvideo");

  const RESUME_URL =
    "https://drive.google.com/file/d/1S44pvvrOsjbhxHgFAEobyIjp6aWb87WW/view?usp=sharin";

  function showAlertBox() {
    document.body.style.overflow = "hidden";

    backdrop.style.display = "block";
    alertBox.style.display = "block";
    video.pause();

    gsap.fromTo(
      backdrop,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power1.out" }
    );

    gsap.fromTo(
      alertBox,
      { top: "-150px", opacity: 0 },
      {
        duration: 0.6,
        top: "20%",
        opacity: 1,
        ease: "power3.out",
      }
    );
  }

  function hideAlertBox() {
    gsap.to(alertBox, {
      duration: 0.5,
      top: "-150px",
      opacity: 0,
      ease: "power2.in",
      onComplete: () => {
        alertBox.style.display = "none";
      },
    });

    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.4,
      ease: "power1.inOut",
      onComplete: () => {
        backdrop.style.display = "none";
        document.body.style.overflow = "auto";
        video.play();
        currentAction = null;
      },
    });
  }

  let isBouncing = false;
  function bounceAlertBox() {
    if (isBouncing) return;
    isBouncing = true;

    gsap.fromTo(
      alertBox,
      { y: 0 },
      {
        y: -20,
        duration: 0.2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 5,
        onComplete: () => {
          gsap.to(alertBox, {
            y: 0,
            duration: 0.2,
            ease: "sine.out",
            clearProps: "y",
            onComplete: () => {
              isBouncing = false;
            },
          });
        },
      }
    );
  }

  resumeLink.addEventListener("click", function (e) {
    e.preventDefault();
    showAlertBox("resume");
  });

  yesBtn.addEventListener("click", function () {
    window.open(RESUME_URL, "_blank");
    hideAlertBox();
  });

  noBtn.addEventListener("click", function () {
    hideAlertBox();
  });

  backdrop.addEventListener("click", function () {
    bounceAlertBox();
  });
}

// github-box Content
function githubBoxContentAnimation() {
  const Design = document.querySelector("#Design");
  const design = document.querySelector("#design");
  const Project = document.querySelector("#Project");
  const project = document.querySelector("#project");
  const Execution = document.querySelector("#Execution");
  const execution = document.querySelector("#execution");
  const desc = document.querySelector("#desc");
  const image = document.querySelector("#page4-img");

  Design.addEventListener("click", function () {
    desc.textContent =
      "Your code design is truly unique—why bother with clarity or structure when chaos is so much more exciting? Functions are optional, naming is abstract art, and DRY clearly stands for “Don’t Repeat Yelling.” It’s less software engineering, more digital scavenger hunt for your teammates.";
    var add = Design.getAttribute("data-img");
    image.setAttribute("src", add);
    Design.style.right = "2vw";
    design.style.color = "#EFEAE3";
    Project.style.right = "0vw";
    project.style.color = "#504A45";
    Execution.style.right = "0vw";
    execution.style.color = "#504A45";
  });

  Project.addEventListener("click", function () {
    desc.textContent =
      "Projects in code are a wild ride—hours of debugging, mysterious errors at 3 AM, and features that break just by existing. It’s exhausting, mildly traumatic, yet somehow thrilling—like solving a puzzle that keeps changing the rules just to mess with you.";
    var add = Project.getAttribute("data-img");
    image.setAttribute("src", add);
    Project.style.right = "2vw";
    project.style.color = "#EFEAE3";
    Design.style.right = "0vw";
    design.style.color = "#504A45";
    Execution.style.right = "0vw";
    execution.style.color = "#504A45";
  });

  Execution.addEventListener("click", function () {
    desc.textContent =
      "Execution is where dreams go to die—plans look great on paper until the code decides otherwise. Deadlines loom, bugs throw surprise parties, and nothing works until five minutes before the demo. Still, there’s a weird thrill in watching chaos barely hold itself together.";
    var add = Execution.getAttribute("data-img");
    image.setAttribute("src", add);
    Design.style.right = "0vw";
    design.style.color = "#504A45";
    Project.style.right = "0vw";
    project.style.color = "#504A45";
    Execution.style.right = "2vw";
    execution.style.color = "#EFEAE3";
  });
}

function footer() {
  const links = document.querySelectorAll(".links");
  const linkImg = document.querySelector("#link-img");

  let mouse = { x: 0, y: 0 };
  let pos = { x: 0, y: 0 };

  // Mouse move listener
  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // GSAP lerp animation loop
  gsap.ticker.add(() => {
    pos.x += (mouse.x - pos.x) * 0.1;
    pos.y += (mouse.y - pos.y) * 0.1;

    gsap.set(linkImg, {
      x: pos.x,
      y: pos.y,
    });
  });

  // Hover effects on links
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const imgSrc = link.getAttribute("data-logo");
      linkImg.style.backgroundImage = `url(${imgSrc})`;

      gsap.to(linkImg, {
        scale: 1,
        duration: 0.3,
        autoAlpha: 1,
      });
    });

    link.addEventListener("mouseleave", () => {
      gsap.to(linkImg, {
        scale: 0,
        duration: 0.3,
        autoAlpha: 0,
      });
    });
  });
}

function footerScroll() {
  const split = new SplitText("#h1-text", { type: "chars" });

  // Add a class to each char (optional)
  split.chars.forEach((char) => char.classList.add("char-style"));

  gsap.from(split.chars, {
    scrollTrigger: {
      trigger: "#footer",
      start: "32% center", // when top of footer hits 60% of viewport
      once: true, // run only once
      // markers: true,
    },
    y: 100,
    opacity: 0,
    duration: 1.6,
    ease: "power4.out",
    stagger: 0.09,
  });
}

loaderAnimation();
listImageContainerAnimation();
githubScroll();
page2TextAnimation();
alertBoxAnimation();
githubBoxContentAnimation();
footer();
footerScroll();
