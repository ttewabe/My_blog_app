//import { API_URL } from './apiConfig';

// update.ts
const form = document.querySelector('.update-form') as HTMLFormElement;
const id = new URLSearchParams(window.location.search).get('id');

const updatePost = async (e: Event) => {
    e.preventDefault();
    const doc = {
        title: (form.querySelector('#title') as HTMLInputElement).value,
        body: (form.querySelector('#body') as HTMLTextAreaElement).value,
        likes: 5,
    };
    await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(doc),
        headers: { 'Content-Type': 'application/json' },
    });
    window.location.replace(`/index.html?id=${id}`);
};

form.addEventListener('submit', updatePost);
