$(function(){
    $(".sorting-btn").on("click", function(){
        $(this).closest("main").find(".bottom-sheet").addClass("on");
    });
});