// import axios from 'axios';
// async function regSw() {
//     if ('serviceWorker' in navigator) {
//         // let url = "http://localhost:5173" + '/service-worker.js';
//         // const reg = await navigator.serviceWorker.register(url, { scope: '/' });
//         const reg = await navigator.serviceWorker.register("/service-worker.js");
//         console.log('service config is', { reg });
//         return reg;
//     }
//     throw Error('serviceworker not supported');
// }

// async function subscribe(serviceWorkerReg) {
//     let subscription = await serviceWorkerReg.pushManager.getSubscription();
//     if (subscription === null) {
//         const permission = await Notification.requestPermission();
//         if (permission !== 'granted') {
//             throw Error('Permission not granted for Notification');
//         }
//         subscription = await serviceWorkerReg.pushManager.subscribe({
//             userVisibleOnly: true,
//             applicationServerKey: "BPPpvocJdelkqVfdkpNKQf_wH2RfA2KTUzC_Bxe7B-DMXpx-9c9RNwpq4QMhlnXemBsKFfhRwn1y05rXHSDFNO4",
//         });
//         let userToken = localStorage.getItem('userToken')
//         const payload = {
//             subscription,
//             access_token: userToken
//         };
//         // const response = await axios.post('http://localhost:5000/api/v1/subscriptions/web', payload);
//         const response = axios.post('https://notifications.mechconnect.app/api/v1/subscriptions/web', subscription);
//         return response;
//     }
// }
// export { regSw, subscribe };