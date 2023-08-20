import { API_URL } from './apiConfig';

const form = document.querySelector('form') as HTMLFormElement;

const createPost = async (e: Event) => {
    e.preventDefault();
    const doc = {
        title: (form.querySelector('#title') as HTMLInputElement).value,
        body: (form.querySelector('#body') as HTMLInputElement).value,
        likes: 10,
    };
    await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: { 'Content-Type': 'application/json' },
    });
    window.location.replace('/index.html');
};

form.addEventListener('submit', createPost);