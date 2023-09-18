// import GoogleMap from "google-maps-react-markers";
// import { useEffect, useRef, useState } from "react";
// import mapOptions from "./mapoptions.json";
// import { LucideLandmark } from "lucide-react";

// const App = () => {
//   const mapRef = useRef(null);
//   const [mapReady, setMapReady] = useState(false);
//   const [mapBounds, setMapBounds] = useState({});
//   const [usedCoordinates, setUsedCoordinates] = useState(0);
//   const [currCoordinates, setCurrCoordinates] = useState(
//     coordinates[usedCoordinates]
//   );
//   const [highlighted, setHighlighted] = useState(null);

//   /**
//    * @description This function is called when the map is ready
//    * @param {Object} map - reference to the map instance
//    * @param {Object} maps - reference to the maps library
//    */
//   // eslint-disable-next-line no-unused-vars
//   const onGoogleApiLoaded = ({ map, maps }) => {
//     mapRef.current = map;
//     setMapReady(true);
//   };

//   // eslint-disable-next-line no-unused-vars
//   const onMarkerClick = (e, { markerId, lat, lng }) => {
//     setHighlighted(markerId);
//   };

//   const onMapChange = ({ bounds, zoom }) => {
//     const ne = bounds.getNorthEast();
//     const sw = bounds.getSouthWest();
//     /**
//      * useSupercluster accepts bounds in the form of [westLng, southLat, eastLng, northLat]
//      * const { clusters, supercluster } = useSupercluster({
//      *	points: points,
//      *	bounds: mapBounds.bounds,
//      *	zoom: mapBounds.zoom,
//      * })
//      */
//     setMapBounds({
//       ...mapBounds,
//       bounds: [sw.lng(), sw.lat(), ne.lng(), ne.lat()],
//       zoom,
//     });
//     setHighlighted(null);
//   };

//   const updateCoordinates = () => setUsedCoordinates(!usedCoordinates ? 1 : 0);

//   useEffect(() => {
//     setCurrCoordinates(coordinates[usedCoordinates]);
//   }, [usedCoordinates]);

//   return (
//     <main>
//       <div className="map-container">
//         <GoogleMap
//           apiKey=""
//           defaultCenter={{ lat: 45.4046987, lng: 12.2472504 }}
//           defaultZoom={5}
//           options={mapOptions}
//           mapMinHeight="600px"
//           onGoogleApiLoaded={onGoogleApiLoaded}
//           onChange={onMapChange}
//         >
//           {currCoordinates.map(({ lat, lng, name }, index) => (
//             <LocationPin
//               key={index}
//               lat={lat}
//               lng={lng}
//               markerId={name}
//               onClick={onMarkerClick}
//               className="marker"
//               // draggable={true}
//               // onDragStart={(e, { latLng }) => {}}
//               // onDrag={(e, { latLng }) => {}}
//               // onDragEnd={(e, { latLng }) => {}}
//             />
//           ))}
//         </GoogleMap>
//         {highlighted && (
//           <div className="highlighted">
//             {highlighted}{" "}
//             <button type="button" onClick={() => setHighlighted(null)}>
//               X
//             </button>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// };

// export default App;

// interface LocationPinProps {
//   lat: number;
//   lng: number;
//   text: string;
//   markerId: string;
// }

// const LocationPin = ({ text, markerId }: LocationPinProps) => (
//   <div className={markerId}>
//     <LucideLandmark /> {text}
//   </div>
// );
