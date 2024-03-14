var map = new BMap.Map("container");
map.centerAndZoom(new BMap.Point(116.32, 39.959), 15); // 初始化地图到北京

// 添加缩放和平移控件
var navigationControl = new BMap.NavigationControl({
    anchor: BMAP_ANCHOR_TOP_LEFT,
    type: BMAP_NAVIGATION_CONTROL_LARGE
});
map.addControl(navigationControl);

var marker1, marker2, polyline;
var clickedPoints = [];

function degreeToDMS(deg) {
    var d = Math.floor(deg);
    var minFloat = (deg - d) * 60;
    var m = Math.floor(minFloat);
    var secFloat = (minFloat - m) * 60;
    var s = Math.round(secFloat * 100) / 100; // 保留两位小数
    return { degree: d, minute: m, second: s };
}

function onMapClick(e) {
    var point = new BMap.Point(e.point.lng, e.point.lat);

    if (!marker1) {
        marker1 = new BMap.Marker(point);
        map.addOverlay(marker1);
        clickedPoints.push(point);
        var dmsPoint1 = degreeToDMS(point.lng) + '   纬度： ' + degreeToDMS(point.lat);
        document.getElementById('coordinates').innerText = "第一个点的坐标：经度: " + dmsPoint1;
    } else if (!marker2) {
        marker2 = new BMap.Marker(point);
        map.addOverlay(marker2);
        clickedPoints.push(point);
        var dmsPoint2 = degreeToDMS(point.lng) + '   纬度： ' + degreeToDMS(point.lat);
        document.getElementById('coordinates').innerText += "\n第二个点的坐标：经度: " + dmsPoint2;

        // 计算两点间的球面距离
        var R = 6371;
        var dLat = (clickedPoints[1].lat - clickedPoints[0].lat) * Math.PI / 180;
        var dLon = (clickedPoints[1].lng - clickedPoints[0].lng) * Math.PI / 180;
        var lat1 = clickedPoints[0].lat * Math.PI / 180;
        var lat2 = clickedPoints[1].lat * Math.PI / 180;

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distance = R * c;

        document.getElementById('distance').innerText = "岳岳    选择两个点的距离：" + distance.toFixed(2) + " km\n";

        // 在两点间绘制直线
        polyline = new BMap.Polyline([
            clickedPoints[0],
            clickedPoints[1]
        ], {
            strokeColor: "#ff0000",
            strokeWeight: 2,
            strokeOpacity: 0.5
        });
        map.addOverlay(polyline);

        map.removeEventListener('click', onMapClick);
    }
}

map.addEventListener('click', onMapClick);

document.getElementById('clear-btn').addEventListener('click', function() {
    marker1 && map.removeOverlay(marker1);
    marker2 && map.removeOverlay(marker2);
    polyline && map.removeOverlay(polyline);
    marker1 = marker2 = polyline = null;
    clickedPoints = [];
    document.getElementById('coordinates').innerText = "";
    document.getElementById('distance').innerText = "";
    map.addEventListener('click', onMapClick);
});

// 将角度转换为度分秒的函数
function degreeToDMS(deg) {
    deg = Number(deg);
    var sign = deg < 0 ? '-' : '';
    deg = Math.abs(deg);
    var d = Math.floor(deg);
    var m = Math.floor((deg - d) * 60);
    var s = ((deg - d) * 3600 - m * 60).toFixed(2);
    return sign + d + '° ' + m + '\' ' + s + '"';
}