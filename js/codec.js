const incomingCall = document.querySelector('.incoming-call');
const codec = document.querySelector('.codec');

function openCodec() {
    incomingCall.classList.remove('is-open');
    codec.classList.add('is-open');
}

function closeCodec() {
    codec.classList.remove('is-open');
}