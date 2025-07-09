$(function(){
    $(".sorting-btn").on("click", function(){
        $(this).closest("main").find(".bottom-sheet").addClass("on");

          // 닫기 버튼 클릭 시
        $(".bottom-sheet .close-btn").on("click", function() {
            $(this).closest(".bottom-sheet").removeClass("on");
        });

        // 바텀시트 바깥 영역 클릭 시
        // 배경 클릭 시 닫기 (inner 제외)
        $(document).on("click", ".bottom-sheet", function (e) {
            const $inner = $(this).find(".inner");
            // 클릭한 위치가 .inner 또는 그 자식이면 무시
            if (!$inner.is(e.target) && $inner.has(e.target).length === 0) {
            $(this).removeClass("on");
            }
        });

    });

    

    function setVhUnit() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

    // 초기 실행 + 리사이즈 대응
    window.addEventListener('resize', setVhUnit);
    setVhUnit();

});