$(function(){
    // .bottom-sheet 출력 시 배경 고정 및 닫기
    let scrollTop = 0;

    // 바디 스크롤 락
    function lockBodyScroll() {
        scrollTop = $(window).scrollTop();
        $("body").addClass("scroll-lock").css({
            top: -scrollTop + "px",
            position: "fixed",
            width: "100%",
        });
    };

    function unlockBodyScroll() {
        $("body").removeClass("scroll-lock").css({
            position: "",
            top: "",
            width: "",
        });
        $(window).scrollTop(scrollTop);
    };

    function updateBodyScrollLock() {
        const isAnySheetOpen = $(".bottom-sheet.on").length > 0;
        if (isAnySheetOpen) {
            lockBodyScroll();
        } else {
            unlockBodyScroll();
        }
    };

    // 페이지 최초 로딩 시도 포함해서 체크
    $(document).ready(updateBodyScrollLock);

    // 바텀시트 열기
    $(document).on("click", ".sorting-btn", function () {
        $(".bottom-sheet.sorting").addClass("on");
        updateBodyScrollLock();
    });

    // 바텀시트 닫기 - 배경 클릭
    $(document).on("click", ".bottom-sheet", function (e) {
        const $inner = $(this).find(".inner");
        if (!$inner.is(e.target) && $inner.has(e.target).length === 0) {
            $(this).removeClass("on");
            updateBodyScrollLock();
        }
    });

    // 바텀시트 닫기 - 닫기 버튼
    $(document).on("click", ".bottom-sheet .close-btn", function () {
        $(this).closest(".bottom-sheet").removeClass("on");
        updateBodyScrollLock();
    });
});