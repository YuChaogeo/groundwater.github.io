function calculateDistance() {
    const latitude1 = parseFloat(document.getElementById('latitude1').value);
    const longitude1 = parseFloat(document.getElementById('longitude1').value);
    const latitude2 = parseFloat(document.getElementById('latitude2').value);
    const longitude2 = parseFloat(document.getElementById('longitude2').value);

    const distance = getDistance(latitude1, longitude1, latitude2, longitude2);

    document.getElementById('result').innerText = '计算结果：' + distance.toFixed(2) + '公里';
}

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // 地球半径，单位：米
    const radLat1 = (Math.PI / 180) * lat1;
    const radLat2 = (Math.PI / 180) * lat2;
    const deltaLat = (Math.PI / 180) * (lat2 - lat1);
    const deltaLon = (Math.PI / 180) * (lon2 - lon1);

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(radLat1) * Math.cos(radLat2) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c / 1000; // 转换为公里
}
