$(function () {
    let scrollTop = 0;

    // 1. vh 단위 보정 (모바일 Safari 대응)
    function setVhUnit() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    window.addEventListener('resize', setVhUnit);
    setVhUnit();

    // 2. 바디 스크롤 락 (스크롤 위치 기억)
    function lockBodyScroll() {
        scrollTop = $(window).scrollTop();
        $("body").addClass("scroll-lock").css({
        top: -scrollTop + "px",
        position: "fixed",
        width: "100%",
        });
    }

    function unlockBodyScroll() {
        $("body").removeClass("scroll-lock").css({
        position: "",
        top: "",
        width: "",
        });
        $(window).scrollTop(scrollTop);
    }

    // 3. 바텀시트 열기
    $(document).on("click", ".sorting-btn", function () {
        lockBodyScroll();
        $(".bottom-sheet").addClass("on");
    });

    // 4. 바텀시트 닫기 - 배경 클릭
    $(document).on("click", ".bottom-sheet", function (e) {
        const $inner = $(this).find(".inner");
        if (!$inner.is(e.target) && $inner.has(e.target).length === 0) {
        $(this).removeClass("on");
        unlockBodyScroll();
        }
    });

    // 5. 바텀시트 닫기 - 닫기 버튼
    $(document).on("click", ".bottom-sheet .close-btn", function () {
        $(this).closest(".bottom-sheet").removeClass("on");
        unlockBodyScroll();
    });
});
