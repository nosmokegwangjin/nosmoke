// 파일에서 GeoJSON 데이터 읽기
function loadGeoJSON(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", ".clustered_geojson_file.geojson", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var geojsonData = JSON.parse(xhr.responseText);
            callback(geojsonData);
        }
    };
    xhr.send();
}

// 특정 클러스터의 좌표 추출 함수
function filterCoordinates(geojsonData, targetCluster) {
    return geojsonData.features.filter(function (feature) {
        return feature.properties.cluster === targetCluster;
    }).map(function (feature) {
        return feature.geometry.coordinates;
    });
}

// 지도에 마커 표시 함수
function displayMarkers(coordinates) {
    var map = new kakao.maps.Map(document.getElementById('map'), {
        center: new kakao.maps.LatLng(coordinates[0][1], coordinates[0][0]),
        level: 5
    });

    coordinates.forEach(function (coordinate) {
        var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(coordinate[1], coordinate[0]),
            map: map
            // 추가적인 마커 스타일 설정 가능
        });
    });
}

// GeoJSON 데이터 로드 및 처리
loadGeoJSON(function (geojsonData) {
    var targetCluster = 'A'; // 특정 클러스터 설정
    var clusterCoordinates = filterCoordinates(geojsonData, targetCluster);
    displayMarkers(clusterCoordinates);
});
