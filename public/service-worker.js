// this.addEventListener('activate', function (event) {
//     console.log('service worker activated');
// });
// this.addEventListener('push', async function (event) {
//     const message = event.data.json();
//     let { title, description } = message;
//     console.log('push event message', message);
//     await event.waitUntil(
//         this.registration.showNotification(title, {
//             body: description,

//         })

//     );
// });