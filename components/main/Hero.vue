<script setup>
const currentSlide = ref(0);
const isTransitioning = ref(false);
const carouselHeight = ref(0);
const carouselRef = ref(null);

const nextSlide = () => {
  if (isTransitioning.value) return;
  isTransitioning.value = true;
  currentSlide.value = (currentSlide.value + 1) % carousel.value.length;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 1000);
};

const previousSlide = () => {
  if (isTransitioning.value) return;
  isTransitioning.value = true;
  currentSlide.value =
    (currentSlide.value - 1 + carousel.value.length) % carousel.value.length;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 1000);
};

function updateCarouselHeight() {
  if (carouselRef.value) {
    carouselHeight.value = carouselRef.value.offsetHeight;
  }
}

const carousel = ref([
  {
    img: "https://ihavecpu.com/_next/image?url=https%3A%2F%2Fihcupload.s3.ap-southeast-1.amazonaws.com%2Fimg%2Fslidebanner%2F173925856867aafac8ae080.jpg&w=1200&q=75",
  },
]);

const categories = ref([
  {
    name: "Action",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-swords"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/></svg>',
  },
  {
    name: "Adventure",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
  },
  {
    name: "RPG",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-anvil"><path d="M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4"/><path d="M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z"/><path d="M9 12v5"/><path d="M15 12v5"/><path d="M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1"/></svg>',
  },
  {
    name: "Strategy",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>',
  },
  {
    name: "Simulation",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-person-standing"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg>',
  },
  {
    name: "Racing",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gauge"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>',
  },
  {
    name: "Indie",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wand"><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h.01"/><path d="M17.8 6.2 19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/></svg>',
  },
  {
    name: "Sports",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
  },
]);
const intervalId = ref(null);

onMounted(() => {
  intervalId.value = setInterval(nextSlide, 5000);
  window.addEventListener("resize", updateCarouselHeight);
  updateCarouselHeight();
});
onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
  window.removeEventListener("resize", updateCarouselHeight);
});

// เพิ่มตัวแปรสำหรับจัดการ touch events
const touchStart = ref(0);
const touchEnd = ref(0);
const minSwipeDistance = 50; // ระยะขั้นต่ำในการ swipe

// เพิ่มฟังก์ชันจัดการ touch events
const handleTouchStart = (e) => {
  touchStart.value = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEnd.value = e.changedTouches[0].screenX;
  handleSwipe();
};

const handleSwipe = () => {
  const swipeDistance = touchStart.value - touchEnd.value;

  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      // Swipe ไปทางซ้าย (slide ถัดไป)
      nextSlide();
    } else {
      // Swipe ไปทางขวา (slide ก่อนหน้า)
      currentSlide.value =
        (currentSlide.value - 1 + carousel.value.length) %
        carousel.value.length;
    }
  }
};

const subCarousel = ref([
  {
    img: "https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/slidebanner/17375116956790530fe1af7.",
  },
  {
    img: "https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/slidebanner/173750983467904bca847e6.jpg",
  },
  {
    img: "https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/slidebanner/173751169767905311438ca.",
  },
]);

const getSlideAriaLabel = (index) => {
  return `Slide ${index + 1} of ${carousel.value.length}: ${
    carousel.value[index].title
  }`;
};
</script>

<template>
  <div class="flex flex-col text-base-content justify-around">
    <div class="w-full h-auto object-cover rounded-lg">
        <img src="https://ihavecpu.com/_next/image?url=https%3A%2F%2Fihcupload.s3.ap-southeast-1.amazonaws.com%2Fimg%2Fslidebanner%2F173925856867aafac8ae080.jpg&w=1200&q=75" class="w-full h-auto object-cover rounded-lg" />
    </div>
    <div class="w-full flex flex-row gap-8 mt-4">
      <div
        v-for="(slide, index) in subCarousel"
        :key="index"
        class="w-full h-auto object-cover rounded-lg"
      >
        <img :src="slide.img" class="w-full h-auto object-cover rounded-lg" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pinch-zoom;
  user-select: none;
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s ease-in-out;
  scroll-behavior: smooth;
  /* pointer-events: none; */
}

.carousel-slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  overflow: hidden;
}

/* .carousel-slide img {
  pointer-events: none;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -webkit-user-select: none;
} */

@media (hover: none) {
  .carousel-container {
    touch-action: pan-y pinch-zoom;
  }
}

.sidebar-container {
  position: relative;
}

::-webkit-scrollbar-button {
  display: none;
}

/* ปรับแต่ง track และ thumb */
::-webkit-scrollbar {
  width: 6px;
  border-radius: 1rem;
}

::-webkit-scrollbar-track {
  background: transparent;
  border: none;
}

::-webkit-scrollbar-thumb {
  background-color: #f3cc30;
  border-radius: 1rem;
  border: none;
  min-height: 40px; /* เพิ่มความสูงขั้นต่ำของ thumb */
}
</style>
