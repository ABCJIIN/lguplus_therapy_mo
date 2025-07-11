$(function(){
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
})