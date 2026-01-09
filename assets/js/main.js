(function ($) {
  'use strict';
  
  // ==========================================
  //      Start Document Ready function
  // ==========================================
  $(document).ready(function () {
      
  // ============== Mobile Nav Menu Dropdown Js Start =======================
  function toggleSubMenu() {
    if ($(window).width() <= 991) {
      $('.has-submenu').off('click').on('click', function () {
        $(this).toggleClass('active').siblings('.has-submenu').removeClass('active').find('.nav-submenu').slideUp(300);
        $(this).find('.nav-submenu').stop(true, true).slideToggle(300);
      });

    } else {
      $('.has-submenu').off('click'); 
    }
  }

  toggleSubMenu();
  $(window).resize(toggleSubMenu);
  // ============== Mobile Nav Menu Dropdown Js End =======================
    
  // ===================== Scroll Back to Top Js Start ======================
  var progressPath = document.querySelector('.progress-wrap path');
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
  progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
  };
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 50;
  var duration = 550;
  jQuery(window).on('scroll', function() {
    if (jQuery(this).scrollTop() > offset) {
      jQuery('.progress-wrap').addClass('active-progress');
    } else {
      jQuery('.progress-wrap').removeClass('active-progress');
    }
  });
  jQuery('.progress-wrap').on('click', function(event) {
    event.preventDefault();
    jQuery('html, body').animate({scrollTop: 0}, duration);
    return false;
  });
  // ===================== Scroll Back to Top Js End ======================

  
// ========================== add active class to navbar menu current page Js Start =====================
  function dynamicActiveMenuClass(selector) {
    let FileName = window.location.pathname.split("/").reverse()[0];

    // If we are at the root path ("/" or no file name), keep the activePage class on the Home item
    if (FileName === "" || FileName === "index.html") {
      // Keep the activePage class on the Home link
      selector.find("li.nav-menu__item.has-submenu").eq(0).addClass("activePage");
    } else {
      // Remove activePage class from all items first
      selector.find("li").removeClass("activePage");

      // Add activePage class to the correct li based on the current URL
      selector.find("li").each(function () {
        let anchor = $(this).find("a");
        if ($(anchor).attr("href") == FileName) {
          $(this).addClass("activePage");
        }
      });

      // If any li has activePage element, add class to its parent li
      selector.children("li").each(function () {
        if ($(this).find(".activePage").length) {
          $(this).addClass("activePage");
        }
      });
    }
  }

  if ($('ul').length) {
    dynamicActiveMenuClass($('ul'));
  }
// ========================== add active class to navbar menu current page Js End =====================

  // ********************* Toast Notification Js start *********************
  function toastMessage(messageType, messageTitle, messageText, messageIcon) {
    let $toastContainer = $('#toast-container');
  
    let $toast = $('<div>', {
      class: `toast-message ${messageType}`,
      html: `
        <div class="toast-message__content">
          <span class="toast-message__icon">
            <i class="${messageIcon}"></i>
          </span>
          <div class="flex-grow-1">
            <div class="d-flex align-items-start justify-content-between mb-1">
              <h6 class="toast-message__title">${messageTitle}</h6>
              <button type="button" class="toast-message__close">
                <i class="ph-bold ph-x"></i>
              </button>
            </div>
            <span class="toast-message__text">${messageText}</span>
          </div>
        </div>
        <div class="progress__bar"></div>
      `
    });
  
    $toastContainer.append($toast);
  
    setTimeout(() => {
      $toast.addClass('active');
    }, 50);
  
    let totalDuration = 3500;
    let startTime = Date.now();
    let remainingTime = totalDuration;
    let toastTimeout = setTimeout(hideToast, remainingTime);
  
    function hideToast() {
      $toast.removeClass('active');
      setTimeout(() => {
        $toast.remove();
      }, 500);
    }
  
    // Remove Toast on Close Button Click
    $toast.find('.toast-message__close').on('click', function () {
      $toast.removeClass('active');
      setTimeout(() => {
        $toast.remove();
      }, 500);
    });
  
    // Pause Timeout on Hover
    $toast.on('mouseenter', function () {
      remainingTime -= Date.now() - startTime;
      clearTimeout(toastTimeout);
    });
  
    // Resume Timeout on Mouse Leave
    $toast.on('mouseleave', function () {
      startTime = Date.now();
      toastTimeout = setTimeout(hideToast, remainingTime);
    });
  }
// ********************* Toast Notification Js End *********************


// ======================== Top Features Slider Start ==========================
if ($(".top-features-slider").length > 0) { 
  $('.top-features-slider').marquee({
    pauseOnHover: true,
    duplicated: true,
    allowCss3Support: true,
    css3easing: 'linear',
    easing: 'linear',
    delayBeforeStart: 0,
    duration: 24000,
    direction: $('html').attr('dir') === 'rtl' ? 'right' : 'left',
    gap: 32,
    pauseOnCycle: false,
    startVisible: true, 
  });
}
// ======================== Top Features Slider end ==========================


// ================================= Brand slider Start =========================
var brandSlider = new Swiper('.brand-slider', {
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
  autoplay: true,
  speed: 1500,
  grabCursor: true,
  loop: true,
  slidesPerView: 7,
  breakpoints: {
      300: {
          slidesPerView: 2,
      },
      575: {
          slidesPerView: 3,
      },
      768: {
          slidesPerView: 4,
      },
      992: {
          slidesPerView: 5,
      },
      1200: {
          slidesPerView: 6,
      },
      1400: {
          slidesPerView: 7,
      },
  }
});
// ================================= Brand slider End =========================


// ================================= Testimonials slider Start =========================
var testimonialsFour = new Swiper('.testimonials-four-slider', {
  autoplay: {
    delay: 1000,
    disableOnInteraction: false
  },
  effect: "fade",
  autoplay: true,
  speed: 500,
  grabCursor: true,
  loop: true,
  slidesPerView: 1,
  navigation: {  // ✅ Add navigation settings
    nextEl: "#testimonials-four-next",
    prevEl: "#testimonials-four-prev"
  }
});
// ================================= Testimonials slider End =========================

// ================================= Testimonials Five slider Start =========================
var testimonialsFive = new Swiper(".testimonials-five-slider", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  grabCursor: true,
  speed: 500,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".testimonials-five-slider-pagination",
    clickable: true,
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  }
});
// ================================= Testimonials Five slider End =========================

// ================================= Testimonials Five slider Start =========================
var pricingFive = new Swiper(".pricing-five-slider", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  grabCursor: true,
  speed: 500,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".pricing-five-slider-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    992: {
      slidesPerView: 2,
    },
  }
});
// ================================= Testimonials Five slider End =========================

// ========================= Counter Up Js Start ===================
const counterUp = window.counterUp.default;

  const callback = (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting && !el.classList.contains('is-visible')) {
        counterUp(el, {
          duration: 3500,
          delay: 16,
        });
        el.classList.add('is-visible');
      }
    });
  };
  const IO = new IntersectionObserver(callback, { threshold: 1 });

  // Banner statistics Counter
  const statisticsCounter = document.querySelectorAll('.counter');
  if (statisticsCounter.length > 0) {
    statisticsCounter.forEach((counterNumber) => {
      IO.observe(counterNumber);
    });
  }

  // performance Count
  const performanceCount = document.querySelectorAll('.counter');
  if (performanceCount.length > 0) {
    performanceCount.forEach((counterNumber) => {
      IO.observe(counterNumber);
    });
  }
// ========================= Counter Up Js End ===================

// ========================= AOS Js Start ===================
// AOS.init();
  AOS.init({ 
    once: true 
  })
// ========================= AOS Js End ===================


// ========================= Animated Radial Progress Js Start ===================
  function animateProgress() {
      $('svg.radial-progress').each(function () {
          // Check if the element is within the viewport
          const elementTop = $(this).offset().top;
          const elementBottom = elementTop + $(this).outerHeight();
          const viewportTop = $(window).scrollTop();
          const viewportBottom = viewportTop + $(window).height();

          if (elementBottom > viewportTop && elementTop < viewportBottom) {
              const percent = $(this).data('percentage');
              const radius = $(this).find('circle.complete').attr('r');
              const circumference = 2 * Math.PI * radius;
              const strokeDashOffset = circumference - (percent / 100) * circumference;

              // Animate the circle
              $(this).find('circle.complete').css('stroke-dashoffset', strokeDashOffset);
          }
      });
  }

  // Trigger animation on scroll and page load
  $(window).on('scroll', animateProgress);
  animateProgress(); // Run on page load
// ========================= Animated Radial Progress Js End ===================

// ========================= ShowCase Slider Js start ===================
var showCaseSlider = new Swiper('.show-case-slider', {
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
  autoplay: true,
  speed: 1500,
  grabCursor: true,
  loop: true,
  spaceBetween: 24,
  slidesPerView: 4,
  centeredSlides: true, 
  breakpoints: {
    300: {
        slidesPerView: 1,
    },
    576: {
        slidesPerView: 2,
    },
    768: {
        slidesPerView: 2,
    },
    1200: {
        slidesPerView: 3,
    },
    1201: {
        slidesPerView: 4,
    },
  }
});
// ========================= ShowCase Slider Js End ===================


// ========================= Accordion Tabs Image Change Js Start ===================
  $(document).on("click", ".accordion-button", function () {
    const $faqImage = $("#faqImage");
    const newImageSrc = $(this).data("img");
  
    if (newImageSrc && $faqImage.attr("src") !== newImageSrc) {
      $faqImage.css("opacity", ".3");
      setTimeout(() => {
        $faqImage.attr("src", newImageSrc).css("opacity", "1");
      }, 300);
    }
  });
// ========================= Accordion Tabs Image Change Js End ===================

// ========================= Testimonials Tab Js start ===================
$(document).on('click', '.testimonials-item', function () {
  $('.testimonials-item').removeClass('active');
  $(this).addClass('active');
});
// ========================= Testimonials Tab Js End ===================

// ========================== Set Text In Custom dropdown Js Start =================================
$('.selectable-text-list li').each(function () {
  var thisItem = $(this); 

  thisItem.on('click', function () {
    const listText = thisItem.text(); 
    var item = thisItem.parent().parent().find('.selected-text').text(listText); 
  }); 
}); 
// ========================== Set Text In Custom dropdown Js End =================================


// ========================== Domain Select Js Start =================================
$(document).on('click', '.domain-item-button', function () {
  const selectedDomain = $(this).data('domain');

  const $wrapper = $(this).closest('.select-domain-wrapper'); 
  const $select = $wrapper.find('.select-domain');

  $select.val(selectedDomain);

  // Remove and add active class
  $wrapper.find('.domain-item-button').removeClass('active-domain');
  $(this).addClass('active-domain');
});

// ========================== Domain Select Js End =================================
  
// ========================== About Two Js Start =====================
var aboutTwoThumbsSliderOne = new Swiper(".about-two-thumbs-slider-one", {
	slidesPerView: 2,
  grabCursor: true,
	loop: true,
	centeredSlides: true,
	direction: "vertical",
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	speed: 6000,
  autoplay: {
		delay: 0,
		enabled: true,
	}
});

var aboutTwoThumbsSliderTwo = new Swiper(".about-two-thumbs-slider-two", {
	slidesPerView: 2,
  grabCursor: true,
	loop: true,
	centeredSlides: true,
	direction: "vertical",
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	speed: 6000,
  autoplay: {
		delay: 0,
		enabled: true,
    reverseDirection: true,
    disableOnInteraction: false,
	}
});
// ========================== About Two Js End =====================

// ========================== hosting plan slider Js start =====================
var hostingPlanSlider = new Swiper('.hosting-plan-slider', {
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
  autoplay: false,
  speed: 1500,
  grabCursor: true,
  loop: true,
  slidesPerView: 4,
  navigation: {
    nextEl: ".swiper-hosting-button-next",
    prevEl: ".swiper-hosting-button-prev",
  },
  pagination: {
    el: ".swiper-hosting-pagination",
    clickable: true
  },
  breakpoints: {
    300: {
        slidesPerView: 1,
    },
    576: {
        slidesPerView: 2,
    },
    768: {
        slidesPerView: 2,
    },
    992: {
        slidesPerView: 3,
    },
    1199: {
        slidesPerView: 4,
    },
  }
});
// ========================== hosting plan slider Js End =====================


// ========================== Add Attribute For Bg Image Js Start ====================
$(".background-img").css('background', function () {
  var bg = ('url(' + $(this).data("background-image") + ')');
  return bg;
});
// ========================== Add Attribute For Bg Image Js End =====================

// ========================= ShowCase Slider Js start ===================
var serviceSlider = new Swiper('.service-slider', {
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
  autoplay: false,
  speed: 1500,
  grabCursor: true,
  loop: true,
  spaceBetween: 24,
  slidesPerView: 4,
  pagination: {
    el: ".service-slider-pagination",
    clickable: true,
  },
  breakpoints: {
    300: {
        slidesPerView: 1,
    },
    576: {
        slidesPerView: 2,
    },
    768: {
        slidesPerView: 2,
    },
    992: {
        slidesPerView: 3,
    },
    1300: {
        slidesPerView: 4,
    },
  }
});
// ========================= ShowCase Slider Js End ===================

// ================================= Brand slider Start =========================
var brandThreeSlider = new Swiper('.brand-three-slider', {
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
  autoplay: true,
  speed: 1500,
  grabCursor: true,
  loop: true,
  slidesPerView: 7,
  breakpoints: {
      300: {
          slidesPerView: 2,
      },
      575: {
          slidesPerView: 3,
      },
      768: {
          slidesPerView: 4,
      },
      992: {
          slidesPerView: 5,
      },
      1200: {
          slidesPerView: 6,
      },
      1400: {
          slidesPerView: 7,
      },
  }
});
// ================================= Brand slider End =========================

// ========================= Plan Execute slider Js start ===================
var planExecuteSlider = new Swiper('.plan-execute-slider', {
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
  speed: 1500,
  grabCursor: true,
  loop: true,
  spaceBetween: 24,
  slidesPerView: 4,
  pagination: {
    el: ".plan-execute-pagination",
    clickable: true,
  },
  breakpoints: {
    300: {
        slidesPerView: 1,
    },
    576: {
        slidesPerView: 2,
    },
    768: {
        slidesPerView: 2,
    },
    992: {
        slidesPerView: 3,
    },
    1300: {
        slidesPerView: 4,
    },
  }
});
// ========================= Plan Execute slider Js End ===================

// ========================= Testimonials Three slider Js start ===================
var planExecuteSlider = new Swiper('.testimonials-three-slider', {
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
  autoplay: false,
  speed: 1500,
  grabCursor: true,
  loop: true,
  spaceBetween: 24,
  slidesPerView: 1,
  pagination: {
    el: ".plan-execute-pagination",
    clickable: true,
  },
});
// ========================= Testimonials Three slider Js End ===================

  // ========================= magnific Popup Js Start =====================
  $('.play-button').magnificPopup({
    type:'iframe',
    removalDelay: 300,
    mainClass: 'mfp-fade',
  });
  // ========================= magnific Popup Js End =====================

  // ========================= List gird View Js Start =====================
  $(document).on('click', '.list-view-btn', function () {
    const $btn = $(this);
    const $gridViewBtn = $('.grid-view-btn');
    const $body = $('body');
  
    $body.removeClass('grid-view');
    $btn.removeClass('text-heading').addClass('text-main-600');
    $gridViewBtn.removeClass('text-main-600');
  });
  
  $(document).on('click', '.grid-view-btn', function () {
    const $btn = $(this);
    const $listViewBtn = $('.list-view-btn');
    const $body = $('body');
  
    $body.addClass('grid-view');
    $btn.removeClass('text-heading').addClass('text-main-600');
    $listViewBtn.removeClass('text-main-600');
  });
  // ========================= List gird View Js End =====================

  // ========================= Range Slider Js Start =====================
  $(document).ready(function () {
    var $rangeInput = $(".range-input input"),
        $priceInput = $(".price-input input"),
        $range = $(".slider .progress"),
        priceGap = 1000;
  
    // Update the range and price inputs when the price input fields change
    $priceInput.on("input", function () {
      var minPrice = parseInt($priceInput.eq(0).val(), 10),
          maxPrice = parseInt($priceInput.eq(1).val(), 10);
  
      if (maxPrice - minPrice >= priceGap && maxPrice <= parseInt($rangeInput.eq(1).attr("max"), 10)) {
        if ($(this).hasClass("input-min")) {
          $rangeInput.eq(0).val(minPrice);
          $range.css("left", (minPrice / parseInt($rangeInput.eq(0).attr("max"), 10)) * 100 + "%");
        } else {
          $rangeInput.eq(1).val(maxPrice);
          $range.css("right", 100 - (maxPrice / parseInt($rangeInput.eq(1).attr("max"), 10)) * 100 + "%");
        }
      }
    });
  
    // Update the price input fields and range visual when the range slider is dragged
    $rangeInput.on("input", function () {
      var minVal = parseInt($rangeInput.eq(0).val(), 10),
          maxVal = parseInt($rangeInput.eq(1).val(), 10);
  
      if (maxVal - minVal < priceGap) {
        if ($(this).hasClass("range-min")) {
          $rangeInput.eq(0).val(maxVal - priceGap);
        } else {
          $rangeInput.eq(1).val(minVal + priceGap);
        }
      } else {
        $priceInput.eq(0).val(minVal);
        $priceInput.eq(1).val(maxVal);
        $range.css("left", (minVal / parseInt($rangeInput.eq(0).attr("max"), 10)) * 100 + "%");
        $range.css("right", 100 - (maxVal / parseInt($rangeInput.eq(1).attr("max"), 10)) * 100 + "%");
      }
    });
  });
  // ========================= Range Slider Js End =====================

  
  // ========================= Shop Details Slider Js Start =====================
  var shopSmallThumbs = new Swiper(".shop-small-thumbs", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var shopThumbs = new Swiper(".shop-thumbs", {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: shopSmallThumbs,
    },
  });
  // ========================= Shop Details Slider Js End =====================

  
  // ========================= Color Picker Js Start =====================
  $(document).on('click', '.color-picker', function () {
    $('.color-picker__color').css('transform', 'scale(1)');
  
    $(this).find('.color-picker__color').css('transform', 'scale(2)');
  });
  // ========================= Color Picker Js End =====================

  // ========================= Size Picker Js Start =====================
  $(document).on('click', '.size-btn', function () {
    $('.size-btn').removeClass('bg-main-600 text-white border-main-600');
  
    $(this).addClass('bg-main-600 text-white border-main-600');
  });
  // ========================= Size Picker Js End =====================

  
  // ========================= Increment & Decrement Js Start =====================
  $(document).on('click', '.increment-btn', function () {
    const $input = $(this).siblings('.input-value');
    let count = parseInt($input.val(), 10);
    $input.val(count + 1);
  });
  
  $(document).on('click', '.decrement-btn', function () {
    const $input = $(this).siblings('.input-value');
    let count = parseInt($input.val(), 10);
    if (count > 0) {
      $input.val(count - 1);
    }
  });
  // ========================= Increment & Decrement Js End =====================


  // ========================= Delete Item Js start ===================
  $(document).on('click', '.delete-button', function () {
    $(this).closest('.delete-item').addClass('d-none');
    
    toastMessage("danger", "Deleted", "You deleted successfully!", 'ph-bold ph-trash');
  });
  
  // ========================= Delete Item Js End ===================

  // ========================= Form Submit Js Start ===================
  $(document).on('submit', '.form-submit', function (e) {
    e.preventDefault();
  
    $('input').val('');
    
    $('textarea').val('');
  
    toastMessage("success", "Success", "Form submitted successfully!", 'ph-fill ph-check-circle');
  });
  // ========================= Form Submit Js End ===================
  
  // ================== Password Show Hide Js Start ==========
  $(".toggle-password").on('click', function() {
    $(this).toggleClass("active");
    var input = $($(this).attr("id"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
      $(this).removeClass('ph-bold ph-eye-slash');
      $(this).addClass('ph-bold ph-eye');
    } else {
      input.attr("type", "password");
        $(this).addClass('ph-bold ph-eye-slash');
    }
  });
  // ========================= Password Show Hide Js End ===========================

  // ========================= Active Tab Background animation Js Start ===================
  function moveBackground(wrapper) { 
    var $activeTab = $(wrapper).find(".active").parent("li");
    var position = $activeTab.position();
    var width = $activeTab.width();
    
    $(wrapper).find(".background").css({
        "left": position.left + "px",
        "width": width + "px"
    });
  }

  // Move Background on page load for each tab group
  $(".animate-background-wrapper").each(function() {
      moveBackground(this);
  });

  // Move Background on tab click
  $(".animate-background-wrapper .nav-link").on("click", function () {
      var wrapper = $(this).closest(".animate-background-wrapper");
      wrapper.find(".nav-link").removeClass("active");
      $(this).addClass("active");
      moveBackground(wrapper);
  });
  // ========================= Active Tab Background animation Js End ===================

  
  // ========================= See All Feature pricing plan Js Start ===================
  $(document).on('click', '.see-all-btn', function () {
    const $pricingItem = $(this).closest('.pricing-item');
    $pricingItem.toggleClass('expand');
  
    // Check if 'expand' class is added and update the button content accordingly
    if ($pricingItem.hasClass('expand')) {
      $(this).html(`
        Less features
        <i class="ph-bold ph-caret-up"></i>
      `);
    } else {
      $(this).html(`
        See all features
        <i class="ph-bold ph-caret-down"></i>
      `);
    }
  });
  // ========================= See All Feature pricing plan Js End ===================

  
  // ========================= Toggle Monthly Yearly duration pricing plan Js Start ===================
  $(document).on('change', '.pricing-item-toggle', function () {
    const $pricingItem = $(this).closest('.pricing-item');
    const $pricingDuration = $pricingItem.find('.pricing-duration');
    const $currentPrice = $pricingItem.find('.current-price');
    
    let priceValue = parseFloat($currentPrice.text().replace(/[^\d.-]/g, ''));
  
    if ($(this).prop('checked')) {
      if ($pricingDuration.text() === '/Monthly') {
        $pricingDuration.text('/Yearly');
        $currentPrice.text((priceValue * 10).toFixed(2));
      } else if ($pricingDuration.text() === '/Yearly') {
        $pricingDuration.text('/Monthly');
        $currentPrice.text((priceValue / 10).toFixed(2));
      }
    } else {
      if ($pricingDuration.text() === '/Monthly') {
        $pricingDuration.text('/Yearly');
        $currentPrice.text((priceValue * 10).toFixed(2));
      } else if ($pricingDuration.text() === '/Yearly') {
        $pricingDuration.text('/Monthly');
        $currentPrice.text((priceValue / 10).toFixed(2));
      }
    }
  });
  // ========================= Toggle Monthly Yearly duration pricing plan Js End ===================


  // ========================= Dynamic Blog Posts Fetch Start ===================
  const blogContainer = $('#blog-posts-container');
  if (blogContainer.length) {
    $.ajax({
      url: 'https://resources.smax.ai/wp-json/wp/v2/tin-tuc?per_page=2&_embed',
      method: 'GET',
      success: function(posts) {
        let blogHtml = '';
        posts.forEach(function(post, index) {
            // Format date: DD MMM YYYY
            const dateObj = new Date(post.date);
            const dateStr = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
            
            // Image handling
            let imgUrl = 'assets/images/thumbs/blog-img1.png'; // Fallback
            if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] && post._embedded['wp:featuredmedia'][0].source_url) {
                imgUrl = post._embedded['wp:featuredmedia'][0].source_url;
            }
            
            // Comments count
            let commentCount = 0;
            if (post._embedded && post._embedded['replies'] && post._embedded['replies'][0]) {
                 commentCount = post._embedded['replies'][0].length;
            }

            // Animation delay
            const aosDuration = index === 0 ? 200 : 400;

            blogHtml += `
            <div class="col-sm-6" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="${aosDuration}">
                <div class="group-item">  
                    <a href="blog-details.html?id=${post.id}" class="w-100 overflow-hidden d-block" style="height: 300px;">
                        <img src="${imgUrl}" alt="${post.title.rendered}" class="w-100 h-100 object-fit-cover group-hover-item-scale-12 tw-duration-300">
                    </a>
                    <div class="tw-mt-7 d-flex align-items-center tw-gap-5 flex-wrap">
                        <span class="text-heading fw-medium tw-py-05 tw-px-405 border border-neutral-400 rounded-pill tw-text-base">${dateStr}</span>
                        <span class="text-heading fw-medium tw-text-base">Comments (${commentCount.toString().padStart(2, '0')})</span>
                    </div>
                    <h5 class="tw-mt-4">
                        <a href="blog-details.html?id=${post.id}" class="hover-text-main-600 line-clamp-1 tw-mb-3 hover--translate-y-1">${post.title.rendered}</a>
                    </h5>
                    <a href="blog-details.html?id=${post.id}" class="text-main-600 fw-medium tw-text-lg hover--translate-y-1">
                        Learn More
                        <span class="d-inline-flex tw-text-sm">
                            <i class="ph-bold ph-arrow-up-right"></i>
                        </span>
                    </a>
                </div>
            </div>
            `;
        });
        blogContainer.html(blogHtml);
        if (typeof AOS !== 'undefined') { AOS.refresh(); }
      },
      error: function(err) {
        console.error('Error fetching blog posts:', err);
      }
    });
  }
  // ========================= Dynamic Blog Posts Fetch End ===================

  // ========================= Blog Page Dynamic Posts Fetch Start ===================
  const blogListContainer = $('#blog-list-container');
  if (blogListContainer.length) {
    let currentPage = 1;
    const postsPerPage = 10;
    const loadMoreBtn = $('#load-more-blog-btn');
    const loadMoreContainer = $('#load-more-container');

    function fetchFullBlogPosts(page) {
        // Show loading state
        const originalBtnText = loadMoreBtn.find('.button__label').text();
        loadMoreBtn.find('.button__label').text('Loading...');
        loadMoreBtn.prop('disabled', true);

        // Check for category ID in URL
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('id');
        const categoryName = urlParams.get('name');
        
        // Update page title if category is present (optional but good for UX)
        if (categoryId && categoryName && page === 1) {
             $('.breadcrumb h1').text(decodeURIComponent(categoryName));
        }

        let apiUrl = `https://resources.smax.ai/wp-json/wp/v2/tin-tuc?per_page=${postsPerPage}&page=${page}&_embed`;
        if (categoryId) {
            apiUrl += `&tin_tuc_category=${categoryId}`;
        }

        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(posts) {
                let postsHtml = '';
                posts.forEach(function(post) {
                    // Format date
                    const dateObj = new Date(post.date);
                    const dateDay = dateObj.getDate().toString().padStart(2, '0');
                    const dateMonth = dateObj.toLocaleDateString('en-GB', { month: 'short' });
                    
                    // Image handling
                    let imgUrl = 'assets/images/thumbs/blog-page-img1.png'; // Fallback
                    if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] && post._embedded['wp:featuredmedia'][0].source_url) {
                        imgUrl = post._embedded['wp:featuredmedia'][0].source_url;
                    }

                    // Author handling
                    let authorName = 'Smax Team';
                    if (post._embedded && post._embedded['author'] && post._embedded['author'][0]) {
                        authorName = post._embedded['author'][0].name;
                    }

                    // Comments count
                    let commentCount = 0;
                    if (post._embedded && post._embedded['replies'] && post._embedded['replies'][0]) {
                         commentCount = post._embedded['replies'][0].length;
                    }

                    // Excerpt handling (strip HTML tags and limit length if needed)
                    let excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "");
                    if (excerpt.length > 200) excerpt = excerpt.substring(0, 200) + '...';

                    postsHtml += `
                    <div data-aos="fade-up" data-aos-duration="800">
                        <div class="position-relative">
                            <a href="blog-details.html?id=${post.id}" class="w-100 h-100 overflow-hidden tw-rounded-3xl d-block">
                                <img src="${imgUrl}" alt="${post.title.rendered}" class="w-100 h-100 object-fit-cover hover-scale-108 tw-duration-500" style="height: 400px;">
                            </a>
                            <h6 class="blog-date tw-duration-300 tw-py-4 text-white d-flex justify-content-center align-items-center max-w-85-px w-100 tw-px-4 text-center tw-rounded-lg fw-medium position-absolute top-0 tw-start-0 tw-mt-4 tw-ms-4 bg-main-600 fw-bold font-body">
                                ${dateDay} <br> ${dateMonth}
                            </h6>
                        </div>
                        <div class="tw-mt-10">
                            <div class="tw-mb-4 d-flex align-items-center tw-gap-205 flex-wrap">
                                <div class="d-flex align-items-center tw-gap-2">
                                    <span class="text-main-600 tw-text-lg">
                                        <i class="ph ph-user"></i>
                                    </span>
                                    <span class="text-neutral-600 tw-text-sm">${authorName}</span>
                                </div>
                                <span class="tw-w-205 border border-neutral-200"></span>
                                <div class="d-flex align-items-center tw-gap-2">
                                    <span class="text-main-600 tw-text-lg">
                                        <i class="ph-bold ph-chats-circle"></i>
                                    </span>
                                    <span class="text-neutral-600 tw-text-sm">Comments (${commentCount.toString().padStart(2, '0')})</span>
                                </div>
                            </div>
                            <h4 class="tw-mb-4">
                                <a href="blog-details.html?id=${post.id}" class="splitTextStyleOne">${post.title.rendered}</a>
                            </h4>
                            <p class="tw-text-lg text-neutral-600 max-w-730-px splitTextStyleOne">${excerpt}</p>
                            <a href="blog-details.html?id=${post.id}" class="text-uppercase tw-text-sm text-main-two-600 fw-bold hover-text-main-600 d-flex align-items-center tw-gap-4 tw-mt-11 tw-tracking-wider">
                                Read More
                                <span class=""><img src="assets/images/icons/arrow-long.svg" alt="" class=""></span>
                            </a>
                        </div>
                    </div>
                    `;
                });

                blogListContainer.append(postsHtml);
                if (typeof AOS !== 'undefined') { AOS.refresh(); }

                // Manage Load More button
                if (posts.length < postsPerPage) {
                    loadMoreContainer.hide();
                } else {
                    loadMoreContainer.show();
                    loadMoreBtn.find('.button__label').text('Xem thêm');
                    loadMoreBtn.prop('disabled', false);
                }
            },
            error: function(err) {
                console.error('Error fetching full blog posts:', err);
                loadMoreBtn.find('.button__label').text('Xem thêm'); // Reset text on error
                loadMoreBtn.prop('disabled', false);
            }
        });
    }

    // Initial load
    fetchFullBlogPosts(currentPage);

    // Load More click
    loadMoreBtn.on('click', function() {
        currentPage++;
        fetchFullBlogPosts(currentPage);
    });
  }
  // ========================= Blog Page Dynamic Posts Fetch End ===================

  // ========================= Sidebar Recent News Fetch Start ===================
  const sidebarRecentNews = $('#sidebar-recent-news');
  if (sidebarRecentNews.length) {
    $.ajax({
      url: 'https://resources.smax.ai/wp-json/wp/v2/tin-tuc?per_page=3&_embed',
      method: 'GET',
      success: function(posts) {
        let newsHtml = '';
        posts.forEach(function(post) {
            // Format date
            const dateObj = new Date(post.date);
            const dateStr = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
            
            newsHtml += `
            <div class="group-item">
                <h6 class="tw-mb-2">
                    <a href="blog-details.html?id=${post.id}" class="text-heading hover-text-main-600 line-clamp-2 splitTextStyleOne">${post.title.rendered}</a>
                </h6>
                <span class="text-neutral-600 tw-text-sm">${dateStr}</span>
            </div>
            `;
        });
        sidebarRecentNews.html(newsHtml);
      },
      error: function(err) {
        console.error('Error fetching recent news:', err);
      }
    });
  }
  // ========================= Sidebar Recent News Fetch End ===================

  // ========================= Sidebar Categories Fetch Start ===================
  const sidebarCategories = $('#sidebar-categories');
  if (sidebarCategories.length) {
    $.ajax({
      url: 'https://resources.smax.ai/wp-json/wp/v2/tin_tuc_category',
      method: 'GET',
      success: function(categories) {
        let catsHtml = '';
        categories.forEach(function(cat) {
            catsHtml += `
            <a href="category.html?id=${cat.id}&name=${encodeURIComponent(cat.name)}" class="d-flex align-items-center justify-content-between text-neutral-600 hover-text-main-600 tw-duration-300">
                <span class="d-flex align-items-center tw-gap-2">
                    <i class="ph-bold ph-caret-right text-main-600"></i>
                    ${cat.name}
                </span>
                <span>(${cat.count})</span>
            </a>
            `;
        });
        sidebarCategories.html(catsHtml);
      },
      error: function(err) {
        console.error('Error fetching categories:', err);
      }
    });
  }
  // ========================= Sidebar Categories Fetch End ===================

  // ========================= Sidebar Search Functionality Start ===================
  const sidebarSearchForm = $('#sidebar-search-form');
  const searchInput = $('#sidebar-search-input');
  const searchResults = $('#sidebar-search-results');

  if (sidebarSearchForm.length && searchInput.length && searchResults.length) {
    let searchTimeout;

    // Handle form submit
    sidebarSearchForm.on('submit', function(e) {
        e.preventDefault();
        performSearch(searchInput.val().trim());
    });

    // Handle input typing (debounce)
    searchInput.on('input', function() {
        clearTimeout(searchTimeout);
        const keyword = $(this).val().trim();
        
        if (keyword.length === 0) {
            searchResults.addClass('d-none').empty();
            return;
        }

        searchTimeout = setTimeout(function() {
            performSearch(keyword);
        }, 500);
    });

    // Close results when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#sidebar-search-form').length) {
            searchResults.addClass('d-none');
        }
    });

    function performSearch(keyword) {
        if (!keyword) return;

        // Show loading state
        searchResults.removeClass('d-none').html('<div class="text-center py-3"><div class="spinner-border text-main-600" role="status"></div></div>');

        $.ajax({
            url: `https://resources.smax.ai/wp-json/wp/v2/tin-tuc?search=${encodeURIComponent(keyword)}&_embed`,
            method: 'GET',
            success: function(posts) {
                if (posts.length === 0) {
                    searchResults.html('<p class="text-center text-muted mb-0 py-2">Không tìm thấy bài viết nào phù hợp.</p>');
                    return;
                }

                let resultsHtml = '<div class="d-flex flex-column tw-gap-4">';
                posts.forEach(function(post) {
                    let excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "");
                    if (excerpt.length > 80) excerpt = excerpt.substring(0, 80) + '...';

                    resultsHtml += `
                    <div class="border-bottom pb-2">
                        <h6 class="mb-1 tw-text-base"><a href="blog-details.html?id=${post.id}" class="text-heading hover-text-main-600">${post.title.rendered}</a></h6>
                        <p class="mb-0 text-muted tw-text-sm line-clamp-2">${excerpt}</p>
                    </div>
                    `;
                });
                resultsHtml += '</div>';
                
                searchResults.html(resultsHtml);
            },
            error: function(err) {
                console.error('Error searching posts:', err);
                searchResults.html('<p class="text-center text-danger mb-0 py-2">Có lỗi xảy ra, vui lòng thử lại sau.</p>');
            }
        });
    }
  }
  // ========================= Sidebar Search Functionality End ===================

  // ========================= Blog Detail Page Fetch Start ===================
  const blogDetailContainer = $('#blog-details-container');
  const blogTocContainer = $('#blog-toc-container');

  if (blogDetailContainer.length) {
    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) {
        $.ajax({
            url: `https://resources.smax.ai/wp-json/wp/v2/tin-tuc/${postId}?_embed`,
            method: 'GET',
            success: function(post) {
                // Format date
                const dateObj = new Date(post.date);
                const dateDay = dateObj.getDate().toString().padStart(2, '0');
                const dateMonth = dateObj.toLocaleDateString('en-GB', { month: 'short' });
                const dateYear = dateObj.getFullYear();
                
                // Image handling
                let imgUrl = 'assets/images/thumbs/blog-page-img1.png'; // Fallback
                if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] && post._embedded['wp:featuredmedia'][0].source_url) {
                    imgUrl = post._embedded['wp:featuredmedia'][0].source_url;
                }

                // Author handling
                let authorName = 'Smax Team';
                if (post._embedded && post._embedded['author'] && post._embedded['author'][0]) {
                    authorName = post._embedded['author'][0].name;
                }

                // Breadcrumb Update
                let categoryBreadcrumb = '';
                if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0]) {
                    const primaryCat = post._embedded['wp:term'][0][0]; 
                    if (primaryCat) {
                         categoryBreadcrumb = `<li class="breadcrumb-item"><a href="category.html?id=${primaryCat.id}&name=${encodeURIComponent(primaryCat.name)}" class="text-heading hover-text-main-600 fw-medium">${primaryCat.name}</a></li>`;
                    }
                }
                
                const breadcrumbHtml = `
                    <nav aria-label="breadcrumb" class="d-flex justify-content-center tw-mt-6">
                        <ol class="breadcrumb mb-0 align-items-center">
                            <li class="breadcrumb-item"><a href="index.html" class="text-heading hover-text-main-600 fw-medium"><i class="ph-bold ph-house"></i> Home</a></li>
                            <li class="breadcrumb-item"><a href="blog.html" class="text-heading hover-text-main-600 fw-medium">Blog</a></li>
                            ${categoryBreadcrumb}
                            <li class="breadcrumb-item active text-main-600 fw-medium" aria-current="page">${post.title.rendered}</li>
                        </ol>
                    </nav>
                `;
                // Append to breadcrumb section container if not already there
                if ($('.breadcrumb .text-center nav').length === 0) {
                     $('.breadcrumb .text-center').append(breadcrumbHtml);
                }

                // Comments count
                let commentCount = 0;
                if (post._embedded && post._embedded['replies'] && post._embedded['replies'][0]) {
                        commentCount = post._embedded['replies'][0].length;
                }

                // Process Content for TOC
                const $tempContent = $('<div>').html(post.content.rendered);
                let tocHtml = `
                    <div class="toc-card sticky-toc">
                        <h5 class="mb-4">Table of Contents</h5>
                        <div class="toc-links">
                `;
                let hasHeadings = false;
                
                $tempContent.find('h2, h3').each(function(index) {
                    hasHeadings = true;
                    const $heading = $(this);
                    const id = 'toc-heading-' + index;
                    $heading.attr('id', id);
                    
                    const tagName = $heading.prop('tagName').toLowerCase();
                    const activeClass = index === 0 ? 'active' : '';
                    const subLinkClass = tagName === 'h3' ? 'sub-link' : '';
                    
                    tocHtml += `<a href="#${id}" class="toc-link ${subLinkClass} ${activeClass}">${$heading.text()}</a>`;
                });
                
                tocHtml += `
                        </div>
                    </div>
                `;

                // Update content
                const processedContent = $tempContent.html();
                
                // Inject TOC
                if (hasHeadings && blogTocContainer.length) {
                    blogTocContainer.html(tocHtml);
                    
                    // TOC Smooth Scroll
                    $(document).on('click', '.toc-link', function(e) {
                        e.preventDefault();
                        $('.toc-link').removeClass('active');
                        $(this).addClass('active');
                        
                        const targetId = $(this).attr('href');
                        const $target = $(targetId);
                        
                        if ($target.length) {
                            $('html, body').animate({
                                scrollTop: $target.offset().top - 120
                            }, 500);
                        }
                    });
                } else {
                     if (blogTocContainer.length) {
                         blogTocContainer.parent().addClass('d-none');
                         blogDetailContainer.parent().removeClass('col-lg-8').addClass('col-lg-10 mx-auto');
                     }
                }

                const detailHtml = `
                    <div data-aos="fade-up" data-aos-duration="800">
                        <div class="position-relative">
                            <div class="w-100 overflow-hidden tw-rounded-3xl">
                                <img src="${imgUrl}" alt="${post.title.rendered}" class="w-100 object-fit-cover">
                            </div>
                            <h6 class="blog-date tw-duration-300 tw-py-4 text-white d-flex justify-content-center align-items-center max-w-85-px w-100 tw-px-4 text-center tw-rounded-lg fw-medium position-absolute top-0 tw-start-0 tw-mt-4 tw-ms-4 bg-main-600 fw-bold font-body">
                                ${dateDay} <br> ${dateMonth}
                            </h6>
                        </div>
                        <div class="tw-mt-10">
                            <div class="tw-mb-6 d-flex align-items-center tw-gap-205 flex-wrap">
                                <div class="d-flex align-items-center tw-gap-2">
                                    <span class="text-main-600 tw-text-lg">
                                        <i class="ph ph-user"></i>
                                    </span>
                                    <span class="text-neutral-600 tw-text-sm">${authorName}</span>
                                </div>
                                <span class="tw-w-205 border border-neutral-200"></span>
                                <div class="d-flex align-items-center tw-gap-2">
                                    <span class="text-main-600 tw-text-lg">
                                        <i class="ph-bold ph-chats-circle"></i>
                                    </span>
                                    <span class="text-neutral-600 tw-text-sm">Comments (${commentCount.toString().padStart(2, '0')})</span>
                                </div>
                                <span class="tw-w-205 border border-neutral-200"></span>
                                <div class="d-flex align-items-center tw-gap-2">
                                    <span class="text-main-600 tw-text-lg">
                                        <i class="ph ph-calendar-blank"></i>
                                    </span>
                                    <span class="text-neutral-600 tw-text-sm">${dateDay} ${dateMonth} ${dateYear}</span>
                                </div>
                            </div>
                            <h3 class="tw-mb-6 splitTextStyleOne">${post.title.rendered}</h3>
                            <div class="blog-content text-neutral-600 tw-text-base">
                                ${processedContent}
                            </div>
                        </div>
                    </div>
                `;
                blogDetailContainer.html(detailHtml);
                if (typeof AOS !== 'undefined') { AOS.refresh(); }

                // Fetch Related Posts
                if (post._embedded && post._embedded['wp:term']) {
                    let primaryCatId = null;
                    // Find category id from tin_tuc_category
                    const terms = post._embedded['wp:term'].flat();
                    const catTerm = terms.find(t => t.taxonomy === 'tin_tuc_category');
                    
                    if (catTerm) {
                        primaryCatId = catTerm.id;
                    } else if (post._embedded['wp:term'][0] && post._embedded['wp:term'][0][0]) {
                        // Fallback to first term found if specific taxonomy not matched
                        primaryCatId = post._embedded['wp:term'][0][0].id;
                    }

                    if (primaryCatId) {
                        const relatedPostsContainer = $('#related-posts-container');
                        const relatedPostsSection = $('#related-posts-section');
    
                        if (relatedPostsContainer.length) {
                            $.ajax({
                                url: `https://resources.smax.ai/wp-json/wp/v2/tin-tuc?tin_tuc_category=${primaryCatId}&per_page=2&exclude=${post.id}&_embed`,
                                method: 'GET',
                                success: function(relatedPosts) {
                                    if (relatedPosts.length > 0) {
                                        let relatedHtml = '';
                                        relatedPosts.forEach(function(rPost) {
                                            // Format date
                                            const rDateObj = new Date(rPost.date);
                                            const rDateStr = rDateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                                            
                                            // Image
                                            let rImgUrl = 'assets/images/thumbs/blog-page-img1.png';
                                            if (rPost._embedded && rPost._embedded['wp:featuredmedia'] && rPost._embedded['wp:featuredmedia'][0] && rPost._embedded['wp:featuredmedia'][0].source_url) {
                                                rImgUrl = rPost._embedded['wp:featuredmedia'][0].source_url;
                                            }
    
                                            relatedHtml += `
                                            <div class="col-md-6" data-aos="fade-up" data-aos-duration="800">
                                                <div class="group-item h-100 d-flex flex-column">
                                                    <div class="position-relative overflow-hidden tw-rounded-xl mb-3">
                                                        <a href="blog-details.html?id=${rPost.id}" class="d-block w-100">
                                                            <img src="${rImgUrl}" alt="${rPost.title.rendered}" class="w-100 object-fit-cover hover-scale-108 tw-duration-500" style="height: 240px;">
                                                        </a>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <div class="tw-mb-2 text-neutral-600 tw-text-sm">
                                                            <i class="ph ph-calendar-blank text-main-600 me-1"></i> ${rDateStr}
                                                        </div>
                                                        <h5 class="mb-0">
                                                            <a href="blog-details.html?id=${rPost.id}" class="text-heading hover-text-main-600 line-clamp-2">${rPost.title.rendered}</a>
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            `;
                                        });
                                        relatedPostsContainer.html(relatedHtml);
                                        relatedPostsSection.removeClass('d-none');
                                    }
                                },
                                error: function(err) {
                                    console.error('Error fetching related posts:', err);
                                }
                            });
                        }
                    }
                }
            },
            error: function(err) {
                console.error('Error fetching blog detail:', err);
                blogDetailContainer.html('<div class="text-center py-5"><h3>Bài viết không tồn tại hoặc đã bị xóa.</h3><a href="blog.html" class="btn btn-main-two mt-3">Quay lại Blog</a></div>');
                if (blogTocContainer.length) blogTocContainer.parent().addClass('d-none');
            }
        });
    } else {
        blogDetailContainer.html('<div class="text-center py-5"><h3>Không tìm thấy bài viết.</h3><a href="blog.html" class="btn btn-main-two mt-3">Quay lại Blog</a></div>');
        if (blogTocContainer.length) blogTocContainer.parent().addClass('d-none');
    }
  }
  // ========================= Blog Detail Page Fetch End ===================

  });
  // ==========================================
  //      End Document Ready function
  // ==========================================

  // ========================= Preloader Js Start =====================
    $(window).on("load", function(){
      $('.preloader').fadeOut(); 
    })
    // ========================= Preloader Js End=====================

    // ========================= Header Sticky Js Start ==============
    $(window).on('scroll', function() {
      if ($(window).scrollTop() >= 100) {
        $('.header').addClass('fixed-header');
      }
      else {
          $('.header').removeClass('fixed-header');
      }
    }); 
    // ========================= Header Sticky Js End===================

// ========================== Recruitment Pages Js Start =====================
$(document).ready(function () {
    const API_BASE = 'https://resources.smax.ai/wp-json/wp/v2';

    // Helper: Get URL Parameter
    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    }

    // ---------------------------------------------------------
    // Logic for Job Listing Page (jobs.html)
    // ---------------------------------------------------------
    if ($('#job-list-container').length > 0) {
        let allJobs = [];
        let jobStatusMap = {}; // Map ID -> Name
        
        // 1. Fetch Job Statuses (to map ID to Name)
        function fetchJobStatuses() {
            return $.ajax({
                url: `${API_BASE}/job_status`,
                method: 'GET',
                success: function(statuses) {
                    statuses.forEach(status => {
                        jobStatusMap[status.id] = status.name;
                    });
                },
                error: function(err) {
                    console.error('Error fetching job statuses:', err);
                }
            });
        }

        // 2. Fetch Categories
        function fetchCategories() {
            return $.ajax({
                url: `${API_BASE}/job_category`,
                method: 'GET',
                success: function (categories) {
                    const $container = $('#job-categories-container');
                    $container.empty();

                    // Add "All" tab
                    $container.append(`
                        <button class="btn btn-outline-main-600 rounded-pill job-category-tab active" data-id="all" style="background-color: #150e3e;color: #fff;">
                            Tất cả
                        </button>
                    `);

                    // Add category tabs
                    categories.forEach(cat => {
                        $container.append(`
                            <button class="btn btn-outline-main-600 rounded-pill job-category-tab" data-id="${cat.id}" style="background-color: #0D4Da5;color: #fff;">
                                ${cat.name}
                            </button>
                        `);
                    });
                },
                error: function (err) {
                    console.error('Error fetching categories:', err);
                }
            });
        }

        // 3. Fetch Jobs
        function fetchJobs() {
            return $.ajax({
                url: `${API_BASE}/recruitments?_embed`,
                method: 'GET',
                success: function (jobs) {
                    allJobs = jobs;
                },
                error: function (err) {
                    console.error('Error fetching jobs:', err);
                    $('#job-list-container').html('<div class="col-12 text-center"><p class="text-danger">Không thể tải danh sách việc làm.</p></div>');
                }
            });
        }

        // Initialize: Fetch all data then render
        $.when(fetchJobStatuses(), fetchCategories(), fetchJobs()).done(function() {
            // Note: fetchJobs sets allJobs variable
            renderJobs(allJobs);
        });

        // 4. Render Jobs
        function renderJobs(jobs) {
            const $container = $('#job-list-container');
            $container.empty();

            if (!jobs || jobs.length === 0) {
                $container.html('<div class="col-12 text-center"><p>Hiện chưa có tin tuyển dụng nào.</p></div>');
                return;
            }

            jobs.forEach(job => {
                const meta = job.meta || {}; // Fallback to meta
                
                // --- Data Extraction ---
                
                // Location
                let location = meta.job_location || '';
                
                // Type
                let type = meta.job_type || '';
                
                // Salary
                let salary = meta.job_salary || 'Thỏa thuận';
                
                // Status: Try to get from taxonomy first, then meta
                let statusName = '';
                if (job.job_status && job.job_status.length > 0 && jobStatusMap[job.job_status[0]]) {
                    statusName = jobStatusMap[job.job_status[0]];
                } else if (meta.job_status_text) {
                    statusName = meta.job_status_text;
                } else {
                     // Try _embedded if job_status is missing but _embedded exists
                    if (job._embedded && job._embedded['wp:term']) {
                         const terms = job._embedded['wp:term'].flat();
                         const statusTerm = terms.find(t => t.taxonomy === 'job_status');
                         if (statusTerm) statusName = statusTerm.name;
                    }
                }
                if (!statusName) statusName = 'Đang tuyển'; // Default

                // HTML Construction
                let locationHtml = location ? `<span class="d-flex align-items-center gap-1"><i class="ph ph-map-pin"></i> ${location}</span>` : '';
                let typeHtml = type ? `<span class="d-flex align-items-center gap-1"><i class="ph ph-clock"></i> ${type}</span>` : '';
                let statusHtml = `
                    <span class="badge bg-main-50 text-main-600 py-1 px-3 rounded-pill text-xs fw-semibold">
                        ${statusName}
                    </span>
                `;
                let salaryHtml = `<span class="text-main-600 fw-bold">${salary}</span>`;

                const html = `
                    <div class="col-lg-6 col-md-6">
                        <div class="job-item p-4 border border-neutral-200 rounded-4 hover-border-main-600 transition-all bg-neutral-50 h-100 d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h4 class="mb-2">
                                        <a href="job-detail.html?id=${job.id}" class="text-heading hover-text-main-600 line-clamp-2">
                                            ${job.title.rendered}
                                        </a>
                                    </h4>
                                    <div class="d-flex gap-3 text-neutral-500 text-sm">
                                        ${locationHtml}
                                        ${typeHtml}
                                    </div>
                                </div>
                                ${statusHtml}
                            </div>
                            
                            <div class="mt-auto d-flex justify-content-between align-items-center pt-3 border-top border-neutral-200">
                                ${salaryHtml}
                                <a href="job-detail.html?id=${job.id}" class="btn btn-outline-main-600 rounded-pill py-2 px-4 text-sm hover-bg-main-600 hover-text-white transition-all">
                                    Xem chi tiết
                                </a>
                            </div>
                        </div>
                    </div>
                `;
                $container.append(html);
            });
        }

        // 5. Handle Tab Click
        $(document).on('click', '.job-category-tab', function () {
            $('.job-category-tab').removeClass('active');
            $(this).addClass('active');
            
            const categoryId = $(this).data('id');
            
            if (categoryId === 'all') {
                renderJobs(allJobs);
            } else {
                const filteredJobs = allJobs.filter(job => {
                    // Method 1: Check job_category field (IDs)
                    if (job.job_category && job.job_category.includes(categoryId)) {
                        return true;
                    }
                    // Method 2: Check _embedded terms if field is missing
                    if (job._embedded && job._embedded['wp:term']) {
                        const terms = job._embedded['wp:term'].flat();
                        return terms.some(t => t.taxonomy === 'job_category' && t.id === categoryId);
                    }
                    return false;
                });
                renderJobs(filteredJobs);
            }
        });
    }

    // ---------------------------------------------------------
    // Logic for Job Detail Page (job-detail.html)
    // ---------------------------------------------------------
    if ($('#job-description-container').length > 0) {
        const jobId = getUrlParameter('id');
        const jobSlug = getUrlParameter('slug');
        let fetchUrl = '';

        if (jobId) {
            fetchUrl = `${API_BASE}/recruitments/${jobId}?_embed`;
        } else if (jobSlug) {
            fetchUrl = `${API_BASE}/recruitments?slug=${jobSlug}&_embed`;
        } else {
            $('#job-description-container').html('<p class="text-danger">Không tìm thấy thông tin việc làm (thiếu ID hoặc Slug).</p>');
            return;
        }

        $.ajax({
            url: fetchUrl,
            method: 'GET',
            success: function (response) {
                // If fetching by slug, response is an array
                let job = Array.isArray(response) ? response[0] : response;

                if (!job) {
                     $('#job-description-container').html('<p class="text-danger">Không tìm thấy công việc này.</p>');
                     return;
                }
                // Dynamic breadcrumb for job detail page – same layout & style as blog detail
                const $breadcrumb = $('#job-breadcrumb');
                if ($breadcrumb.length) {
                    $breadcrumb.empty();
                    $breadcrumb.append(`
                        <nav aria-label="breadcrumb" class="d-flex justify-content-center tw-mt-6">
                            <ol class="breadcrumb mb-0 align-items-center">
                                <li class="breadcrumb-item"><a href="index.html" class="text-heading hover-text-main-600 fw-medium"><i class="ph-bold ph-house"></i> Home</a></li>
                                <li class="breadcrumb-item"><a href="jobs.html" class="text-heading hover-text-main-600 fw-medium">Tuyển dụng</a></li>
                                <li class="breadcrumb-item active text-main-600 fw-medium" aria-current="page">${job.title.rendered}</li>
                            </ol>
                        </nav>
                    `);
                }
              
                const meta = job.meta || {};
                
                // --- Data Extraction ---
                // Image handling
                let imgUrl = ''; 
                if (job._embedded && job._embedded['wp:featuredmedia'] && job._embedded['wp:featuredmedia'][0] && job._embedded['wp:featuredmedia'][0].source_url) {
                    imgUrl = job._embedded['wp:featuredmedia'][0].source_url;
                }

                // Date handling
                const dateObj = new Date(job.date);
                const dateDay = dateObj.getDate().toString().padStart(2, '0');
                const dateMonth = dateObj.toLocaleDateString('en-GB', { month: 'short' });

                // Render Description with Blog Style
                let imageHtml = '';
                if (imgUrl) {
                    imageHtml = `
                    <div class="position-relative mb-5">
                        <div class="w-100 overflow-hidden tw-rounded-3xl">
                            <img src="${imgUrl}" alt="${job.title.rendered}" class="w-100 object-fit-cover">
                        </div>
                    </div>
                    `;
                }

                const detailHtml = `
                    <div data-aos="fade-up" data-aos-duration="800">
                        ${imageHtml}
                        <div class="">
                            <h3 class="tw-mb-6 splitTextStyleOne">${job.title.rendered}</h3>
                            <div class="d-flex align-items-center gap-3 mb-4 text-neutral-500">
                                <span class="d-flex align-items-center gap-1"><i class="ph ph-calendar-blank"></i> Đăng ngày: ${dateDay} ${dateMonth}, ${dateObj.getFullYear()}</span>
                            </div>
                            
                            <div class="blog-content">
                                 ${job.content.rendered}
                            </div>
                        </div>
                    </div>
                `;
                
                $('#job-description-container').html(detailHtml);
                if (typeof AOS !== 'undefined') { AOS.refresh(); }

                // Render Meta (Summary Box)
                const metaContainer = $('#job-meta-container');
                const metaFields = [
                    { label: 'Trạng thái', value: meta.job_status_text, icon: 'ph-check-circle' },
                    { label: 'Mức lương', value: meta.job_salary, icon: 'ph-currency-dollar' },
                    { label: 'Địa điểm', value: meta.job_location, icon: 'ph-map-pin' },
                    { label: 'Loại hình', value: meta.job_type, icon: 'ph-clock' },
                    { label: 'Cấp bậc', value: meta.job_level, icon: 'ph-briefcase' },
                    { label: 'Số lượng', value: meta.job_quantity, icon: 'ph-users' },
                    { label: 'Hạn nộp', value: meta.job_deadline, icon: 'ph-calendar' },
                    { label: 'Email nộp CV', value: meta.job_contact_email, icon: 'ph-email' },
                    { label: 'Link nộp CV', value: meta.job_apply_url, icon: 'ph-link' },
                ];

                metaContainer.empty(); // Clear placeholders
                metaFields.forEach(field => {
                    if (field.value) {
                        metaContainer.append(`
                            <li class="d-flex align-items-center gap-3 text-neutral-600">
                                <span class="w-32-px h-32-px bg-main-50 text-main-600 rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                                    <i class="ph ${field.icon}"></i>
                                </span>
                                <div>
                                    <span class="d-block text-xs text-neutral-400">${field.label}</span>
                                    <span class="fw-medium text-heading">${field.value}</span>
                                </div>
                            </li>
                        `);
                    }
                });

                // Render Apply Section
                const applySection = $('#job-apply-section');
                applySection.empty();
                if (meta.job_apply_url) {
                    applySection.append(`
                        <a href="${meta.job_apply_url}" target="_blank" class="btn btn-main-600 rounded-pill py-3 px-5 fw-bold hover--translate-y-1 transition-all">
                            Ứng tuyển ngay
                        </a>
                    `);
                }
                
                //if (meta.job_contact_email) {applySection.append(`<p class="mt-3 text-neutral-500">Hoặc gửi CV qua email: <a href="mailto:${meta.job_contact_email}" class="text-main-600 fw-medium">${meta.job_contact_email}</a></p>`);}//
            },
            error: function (err) {
                console.error('Error fetching job details:', err);
                $('#job-description-container').html('<p class="text-danger">Đã xảy ra lỗi khi tải dữ liệu.</p>');
            }
        });
    }
});
// ========================== Recruitment Pages Js End =====================

})(jQuery);
