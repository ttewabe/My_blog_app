const form = document.querySelector('form') as HTMLFormElement;

const createPost = async (e: Event) => {
    e.preventDefault();
    const doc = {
        title: (form.title as HTMLInputElement).value,
        body: (form.body as HTMLInputElement).value,
        likes: 10,
    };
    await fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: { 'Content-Type': 'application/json' },
    });
    window.location.replace('/index.html');
};

form.addEventListener('submit', createPost);