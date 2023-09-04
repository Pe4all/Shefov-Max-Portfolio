import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";



export default class Controls {
  
  constructor(experience) {
    this.experience = experience;
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;
    this.room.children.forEach((child) => {
      if (child.type === "RectAreaLight") {
        this.rectLight = child;
      }
    });

    this.circleFirst = this.experience.world.floor.circleFirst;
    this.circleSecond = this.experience.world.floor.circleSecond;
    this.circleThird = this.experience.world.floor.circleThird;

    GSAP.registerPlugin(ScrollTrigger);

    this.setScrollTrigger();
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 969px)": () => {
        this.room.scale.set(0.11, 0.11, 0.11);
        this.rectLight.width = 0.5;
        this.rectLight.height = 0.7;
        this.camera.orthographicCamera.position.set(0, 6.5, 10);
        this.room.position.set(0, 0, 0);

        // First section ---------------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.firstMoveTimeline.to(this.room.position, {
          x: () => {
            return this.sizes.width * 0.0014;
          },
        });

        // Second section ---------------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.secondMoveTimeline.to(
          this.room.position,
          {
            x: () => {
              return 1;
            },
            z: () => {
              return this.sizes.height * 0.0032;
            },
          },
          "same"
        );
        this.secondMoveTimeline.to(
          this.room.scale,
          {
            x: 0.3,
            y: 0.3,
            z: 0.3,
          },
          "same"
        );
        this.secondMoveTimeline.to(
          this.rectLight,
          {
            width: 0.97 * 3,
            height: 0.48 * 3,
          },
          "same"
        );

   // Third section -----------------------------------------
   this.thirdMoveTimeline = new GSAP.timeline({
    scrollTrigger: {
        trigger: ".third-move",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
    },
}).to(this.camera.orthographicCamera.position, {
    y: 4.5,
    x: -3,
});
},

      // Mobile
      "(max-width: 968px)": () => {
        console.log("fired mobile")
        // Resets
        this.room.scale.set(0.07, 0.07, 0.07);
        this.room.position.set(0, 0, 0);
        this.rectLight.width = 0.3;
        this.camera.orthographicCamera.position.set(0, 6.5, 10);
        this.rectLightheight = 0.4;

        // First section ---------------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(this.room.scale, {
          x: 0.1,
          z: 0.1,
          y: 0.1,
        });
        // Second section ---------------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.scale,
            {
              x: 0.25,
              y: 0.25,
              z: 0.25,
            },
            "same"
          )
          .to(
            this.rectLight,
            {
              width: 0.3 * 3.4,
              height: 0.4 * 3.4,
            },
            "same"
          )
          .to(
            this.room.position,
            {
              x: 1.5,
            },
            "same"
          );
        // Third section ---------------------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(this.camera.orthographicCamera.position, {
          y: 0.5,
          x: -4.1,
          z: 0,
        });
      },

      // all
      all: () => {
        this.sections = document.querySelectorAll(".section");
        this.sections.forEach((section) => {
            this.progressWrapper =
                section.querySelector(".progress-wrapper");
            this.progressBar = section.querySelector(".progress-bar");

            if (section.classList.contains("right")) {
                GSAP.to(section, {
                    borderTopLeftRadius: 10,
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "top top",
                        scrub: 0.6,
                    },
                });
                GSAP.to(section, {
                    borderBottomLeftRadius: 700,
                    scrollTrigger: {
                        trigger: section,
                        start: "bottom bottom",
                        end: "bottom top",
                        scrub: 0.6,
                    },
                });
            } else {
                GSAP.to(section, {
                    borderTopRightRadius: 10,
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "top top",
                        scrub: 0.6,
                    },
                });
                GSAP.to(section, {
                    borderBottomRightRadius: 700,
                    scrollTrigger: {
                        trigger: section,
                        start: "bottom bottom",
                        end: "bottom top",
                        scrub: 0.6,
                    },
                });
            }
            GSAP.from(this.progressBar, {
              scaleY: 0,
              scrollTrigger: {
                  trigger: section,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 0.4,
                  pin: this.progressWrapper,
                  pinSpacing: false,
              },
          });
        });

        // All animations
                // First section -----------------------------------------
                this.firstCircle = new GSAP.timeline({
                  scrollTrigger: {
                      trigger: ".first-move",
                      start: "top top",
                      end: "bottom bottom",
                      scrub: 0.6,
                  },
              }).to(this.circleFirst.scale, {
                  x: 3,
                  y: 3,
                  z: 3,
              });

              // Second section -----------------------------------------
              this.secondCircle = new GSAP.timeline({
                  scrollTrigger: {
                      trigger: ".second-move",
                      start: "top top",
                      end: "bottom bottom",
                      scrub: 0.6,
                  },
              })
                  .to(
                      this.circleSecond.scale,
                      {
                          x: 3,
                          y: 3,
                          z: 3,
                      },
                      "same"
                  )
                  .to(
                      this.room.position,
                      {
                          y: 0.7,
                      },
                      "same"
                  )

              // Third section -----------------------------------------
              this.thirdCircle = new GSAP.timeline({
                  scrollTrigger: {
                      trigger: ".third-move",
                      start: "top top",
                      end: "bottom bottom",
                      scrub: 0.6,
                  },
              }).to(this.circleThird.scale, {
                  x: 3,
                  y: 3,
                  z: 3,
              });

        // Mini platform animations

        this.secondPartTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "center center",
          },
        });

        this.room.children.forEach((child) => {
          if (child.name === "Mini_floor") {
            this.first = GSAP.to(child.position, {
              x: 0.680934,
              z: 5.58561,
              duration: 0.3,
            });
          }
          if (child.name === "Mailbox") {
            this.second = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
          if (child.name === "Flower1") {
            this.third = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
          if (child.name === "Flower2") {
            this.fourth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
          if (child.name === "lamp") {
            this.fifth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
          if (child.name === "Floor_first") {
            this.sixth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
          if (child.name === "Floor_second") {
            this.seventh = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
          if (child.name === "Floor_third") {
            this.eightst = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
        });
        this.secondPartTimeline.add(this.first);
        this.secondPartTimeline.add(this.second);
        this.secondPartTimeline.add(this.third, "-=0.2");
        this.secondPartTimeline.add(this.fourth);
        this.secondPartTimeline.add(this.fifth);
        this.secondPartTimeline.add(this.sixth, "-=0.2");
        this.secondPartTimeline.add(this.seventh, "-=0.2");
        this.secondPartTimeline.add(this.eightst);
      },
    });
  }

  resize() {}

  update() {}
}
