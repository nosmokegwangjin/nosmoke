document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".image-slider img");
    let currentImageIndex = 0;
    const totalImages = images.length;

    // 이미지 슬라이더 함수
    function changeImage() {
        images[currentImageIndex].style.display = "none";
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        images[currentImageIndex].style.display = "block";

        // 만약 현재 이미지가 마지막 이미지라면 슬라이더를 멈춥니다.
        if (currentImageIndex === totalImages - 1) {
            clearInterval(sliderInterval);
        }
    }

    // 페이지 로드 후 첫 이미지 표시
    images[currentImageIndex].style.display = "block";

    // 이미지 변경 간격 (밀리초)
    const interval = 2500; // 3초

    // 이미지 슬라이더 시작
    const sliderInterval = setInterval(changeImage, interval);
});
