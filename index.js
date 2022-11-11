// const marker = () => {
//   fetch(
//     "https://api.odcloud.kr/api/15096996/v1/uddi:6738a90c-ec96-4245-a187-9528cea62904?page=1&perPage=10&serviceKey=3MCBWEYPV4%2BY4Un8XqdBpFBiaGQKGsEVpC1HIK1DCoHqjNlhaUGcwjBIJGDYeTaTOiG4GKJorKXpGpfNpOEjhQ%3D%3D"
//   )
//     .then((r) => r.json())
//     .then((r) => console.log(r))
// }
const btnMap = document.querySelector('.btn-map');
const map = document.querySelector('.no');
btnMap.addEventListener('click', (e)=>{
  map.classList.toggle('no');
})


window.initMap = function () {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.3616658, lng: 126.5204118 },
    zoom: 10,
  });

  fetch("https://api.odcloud.kr/api/15096996/v1/uddi:6738a90c-ec96-4245-a187-9528cea62904?page=1&perPage=90&serviceKey=3MCBWEYPV4%2BY4Un8XqdBpFBiaGQKGsEVpC1HIK1DCoHqjNlhaUGcwjBIJGDYeTaTOiG4GKJorKXpGpfNpOEjhQ%3D%3D")
  .then((r) => r.json())
  .then((r) => {
    console.log(r.data);
    const infowindow = new google.maps.InfoWindow();

    r.data.forEach((x) => {
      let lat = parseFloat(x['위도']);
      let lng = parseFloat(x['경도']);
      let name = x['오름명'];
      let content = x['설명'];

      new google.maps.Circle({
        strokeColor: "blue",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "blue",
        fillOpacity: 0.35,
        map,
        center: {lat, lng},
        radius: 600,
      });

      const mark = new google.maps.Marker({
        position: {lat, lng},
        map: map,
      })
      mark.addListener("click", ()=>{
        infowindow.setContent(`${name}\n ${content}`);
        infowindow.open({
          anchor: mark,
          map,
        })
      })

    })
  })

  
  // const bounds = new google.maps.LatLngBounds();

  // marker.forEach(({Name, lat, lng})=>{
  //   const mark = new google.maps.Marker({
  //     position: {lat, lng},
  //     Name,
  //     map: map,
  //   });
  //   bounds.extend(mark.position);
  // });
  // map.fitBounds(bounds);
};