$(function () {
    let scrollTop = 0;

    // vh 단위 보정 (모바일 Safari 대응)
    function setVhUnit() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    window.addEventListener('resize', setVhUnit);
    setVhUnit();

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

    // 녹음 목록 - 편집모드
    $("header .edit-btn").on("click", function() {
        $(this).closest(".wrapper").addClass("edit");
    });

    // 녹음 목록 - 편집모드 취소
    $("header .cancel-btn").on("click", function() {
        $(this).closest(".wrapper").removeClass("edit");
    });

    // 녹음 목록 - 편집모드 - 체크박스 선택 시 삭제 버튼 활성화
    const $checkboxes = $(".wrapper.home .list-wrap input[type='checkbox']");
    const $deleteBtn = $(".wrapper.home .delete-wrap .delete-btn");

    $checkboxes.on("change", function () {
        const hasChecked = $checkboxes.is(":checked");
        $deleteBtn.prop("disabled", !hasChecked);
    });
});
