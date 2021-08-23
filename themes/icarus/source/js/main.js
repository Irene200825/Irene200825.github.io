/* eslint-disable node/no-unsupported-features/node-builtins */
(function ($, moment, ClipboardJS, config) {
  $('.article img:not(".not-gallery-item")').each(function () {
    // wrap images with link and add caption if possible
    if ($(this).parent("a").length === 0) {
      $(this).wrap(
        '<a class="gallery-item" href="' + $(this).attr("src") + '"></a>'
      );
      if (this.alt) {
        $(this).after(
          '<p class="has-text-centered is-size-6 caption">' + this.alt + "</p>"
        );
      }
    }
  });

  if (typeof $.fn.lightGallery === "function") {
    $(".article").lightGallery({ selector: ".gallery-item" });
  }
  if (typeof $.fn.justifiedGallery === "function") {
    if ($(".justified-gallery > p > .gallery-item").length) {
      $(".justified-gallery > p > .gallery-item").unwrap();
    }
    $(".justified-gallery").justifiedGallery();
  }

  if (typeof moment === "function") {
    $(".article-meta time").each(function () {
      $(this).text(moment($(this).attr("datetime")).fromNow());
    });
  }

  $(".article > .content > table").each(function () {
    if ($(this).width() > $(this).parent().width()) {
      $(this).wrap('<div class="table-overflow"></div>');
    }
  });

  function adjustNavbar() {
    const navbarWidth =
      $(".navbar-main .navbar-start").outerWidth() +
      $(".navbar-main .navbar-end").outerWidth();
    if ($(document).outerWidth() < navbarWidth) {
      $(".navbar-main .navbar-menu").addClass("justify-content-start");
    } else {
      $(".navbar-main .navbar-menu").removeClass("justify-content-start");
    }
  }
  adjustNavbar();
  $(window).resize(adjustNavbar);

  function toggleFold(codeBlock, isFolded) {
    const $toggle = $(codeBlock).find(".fold i");
    !isFolded
      ? $(codeBlock).removeClass("folded")
      : $(codeBlock).addClass("folded");
    !isFolded
      ? $toggle.removeClass("fa-angle-right")
      : $toggle.removeClass("fa-angle-down");
    !isFolded
      ? $toggle.addClass("fa-angle-down")
      : $toggle.addClass("fa-angle-right");
  }

  function createFoldButton(fold) {
    return (
      '<span class="fold">' +
      (fold === "unfolded"
        ? '<i class="fas fa-angle-down"></i>'
        : '<i class="fas fa-angle-right"></i>') +
      "</span>"
    );
  }

  $("figure.highlight table").wrap('<div class="highlight-body">');
  if (
    typeof config !== "undefined" &&
    typeof config.article !== "undefined" &&
    typeof config.article.highlight !== "undefined"
  ) {
    $("figure.highlight").addClass("hljs");
    $("figure.highlight .code .line span").each(function () {
      const classes = $(this).attr("class").split(/\s+/);
      if (classes.length === 1) {
        $(this).addClass("hljs-" + classes[0]);
        $(this).removeClass(classes[0]);
      }
    });

    const clipboard = config.article.highlight.clipboard;
    const fold = config.article.highlight.fold.trim();

    $("figure.highlight").each(function () {
      if ($(this).find("figcaption").length) {
        $(this).find("figcaption").addClass("level is-mobile");
        $(this).find("figcaption").append('<div class="level-left">');
        $(this).find("figcaption").append('<div class="level-right">');
        $(this)
          .find("figcaption div.level-left")
          .append($(this).find("figcaption").find("span"));
        $(this)
          .find("figcaption div.level-right")
          .append($(this).find("figcaption").find("a"));
      } else {
        if (clipboard || fold) {
          $(this).prepend(
            '<figcaption class="level is-mobile"><div class="level-left"></div><div class="level-right"></div></figcaption>'
          );
        }
      }
    });

    if (typeof ClipboardJS !== "undefined" && clipboard) {
      $("figure.highlight").each(function () {
        const id = "code-" + Date.now() + ((Math.random() * 1000) | 0);
        const button =
          '<a href="javascript:;" class="copy" title="Copy" data-clipboard-target="#' +
          id +
          ' .code"><i class="fas fa-copy"></i></a>';
        $(this).attr("id", id);
        $(this).find("figcaption div.level-right").append(button);
      });
      new ClipboardJS(".highlight .copy"); // eslint-disable-line no-new
    }

    if (fold) {
      $("figure.highlight").each(function () {
        if ($(this).find("figcaption").find("span").length > 0) {
          const span = $(this).find("figcaption").find("span");
          if (span[0].innerText.indexOf(">folded") > -1) {
            span[0].innerText = span[0].innerText.replace(">folded", "");
            $(this)
              .find("figcaption div.level-left")
              .prepend(createFoldButton("folded"));
            toggleFold(this, true);
            return;
          }
        }
        $(this)
          .find("figcaption div.level-left")
          .prepend(createFoldButton(fold));
        toggleFold(this, fold === "folded");
      });

      $("figure.highlight figcaption .fold").click(function () {
        const $code = $(this).closest("figure.highlight");
        toggleFold($code.eq(0), !$code.hasClass("folded"));
      });
    }
  }

  const $toc = $("#toc");
  if ($toc.length > 0) {
    const $mask = $("<div>");
    $mask.attr("id", "toc-mask");

    $("body").append($mask);

    function toggleToc() {
      // eslint-disable-line no-inner-declarations
      $toc.toggleClass("is-active");
      $mask.toggleClass("is-active");
    }

    $toc.on("click", toggleToc);
    $mask.on("click", toggleToc);
    $(".navbar-main .catalogue").on("click", toggleToc);
  }

  
  // $.fn.snow({ 
  //   minSize: 5,		//雪花的最小尺寸
  //   maxSize: 40, 	//雪花的最大尺寸
  //   newOn: 400,		//雪花出现的频率 这个数值越小雪花越多
  //   flakeColor: 'rgb(50 115 220 / 50%)'
  // });

})(jQuery, window.moment, window.ClipboardJS, window.IcarusThemeSettings);

//鼠标点击出现安息
(function (window, document, undefined) {
  var hearts = [];
  window.requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        setTimeout(callback, 1000 / 60);
      }
    );
  })();
  init();
  function init() {
    css(
      ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
    );
    attachEvent();
    gameloop();
  }
  function gameloop() {
    for (var i = 0; i < hearts.length; i++) {
      if (hearts[i].alpha <= 0) {
        document.body.removeChild(hearts[i].el);
        hearts.splice(i, 1);
        continue;
      }
      hearts[i].y--;
      hearts[i].scale += 0.004;
      hearts[i].alpha -= 0.013;
      hearts[i].el.style.cssText =
        "left:" +
        hearts[i].x +
        "px;top:" +
        hearts[i].y +
        "px;opacity:" +
        hearts[i].alpha +
        ";transform:scale(" +
        hearts[i].scale +
        "," +
        hearts[i].scale +
        ") rotate(45deg);background:" +
        hearts[i].color;
    }
    requestAnimationFrame(gameloop);
  }
  function attachEvent() {
    var old = typeof window.onclick === "function" && window.onclick;
    window.onclick = function (event) {
      old && old();
      createHeart(event);
    };
  }
  function createHeart(event) {
    var d = document.createElement("div");
    d.className = "heart";
    hearts.push({
      el: d,
      x: event.clientX - 5,
      y: event.clientY - 5,
      scale: 1,
      alpha: 1,
      color: randomColor(),
    });
    document.body.appendChild(d);
  }
  function css(css) {
    var style = document.createElement("style");
    style.type = "text/css";
    try {
      style.appendChild(document.createTextNode(css));
    } catch (ex) {
      style.styleSheet.cssText = css;
    }
    document.getElementsByTagName("head")[0].appendChild(style);
  }
  function randomColor() {
    return (
      "rgb(" +
      ~~(Math.random() * 255) +
      "," +
      ~~(Math.random() * 255) +
      "," +
      ~~(Math.random() * 255) +
      ")"
    );
  }

  L2Dwidget.init({
    model: {
      jsonPath:
        "https://unpkg.com/live2d-widget-model-koharu/assets/koharu.model.json",
      scale: 1,
    },
    display: {
      superSample: 2,
      position: "right",
      width: 130,
      height: 200,
      hOffset: 0,
      vOffset: 0,
    },
    name: {
      canvas: "live2dcanvas",
      div: "live2d-widget",
    },
    mobile: {
      show: true,
      scale: 0.5,
    },
    react: {
      opacityDefault: 0.8,
      opacityOnHover: 1,
    },
    dialog: {
      enable: true,
      script: {
        // 每空闲 10 秒钟，显示一条一言
        'every idle 20s': '$hitokoto$'
      },
    },
  });


})(window, document);
