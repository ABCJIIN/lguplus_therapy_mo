$(function() {
    // 전체 공통
    // vh 단위 보정 (모바일 Safari 대응)
    function setVhUnit() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    window.addEventListener('resize', setVhUnit);
    setVhUnit();
});
