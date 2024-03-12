import axios from 'axios';
async function regSw() {
    if ('serviceWorker' in navigator) {
        // let url = "http://localhost:5173" + '/service-worker.js';
        // const reg = await navigator.serviceWorker.register(url, { scope: '/' });
        const reg = await navigator.serviceWorker.register("/service-worker.js", { scope: '/' });
        console.log('service config is', { reg });
        return reg;
    }
    throw Error('serviceworker not supported');
}

async function subscribe(serviceWorkerReg) {
    let subscription = await serviceWorkerReg.pushManager.getSubscription();
    console.log({ subscription });
    if (subscription === null) {
        subscription = await serviceWorkerReg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: "BPPpvocJdelkqVfdkpNKQf_wH2RfA2KTUzC_Bxe7B-DMXpx-9c9RNwpq4QMhlnXemBsKFfhRwn1y05rXHSDFNO4",
        });
        // axios.post('http://localhost:5000/api/v1/subscriptions/web', subscription);
        axios.post('https://notifications.mechconnect.app/api/v1/subscriptions/web', subscription);
    }
}
export { regSw, subscribe };