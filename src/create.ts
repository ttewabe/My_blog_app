import { API_URL } from './apiConfig';

const form = document.querySelector('form') as HTMLFormElement;

const createPost = async (e: Event) => {
    e.preventDefault();
    const doc = {
        title: form.title.value,
        body:  form.body.value,
        likes: 10,
    };

    try{
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(doc),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Post was created successfully, show a success message.
        const successMessage = document.createElement('p');
        successMessage.textContent = 'Added successfully!';
        console.log(successMessage)
        form.insertAdjacentElement('afterend', successMessage);

        // Clear the form after success.
        form.reset();

    } catch (error) {
        console.error('Error:', error);
        // Handle the error appropriately.
        form.innerHTML = '<p>Error NOT CREATING. Please check if the JSON server is running.</p>';
    }
};

form.addEventListener('submit', createPost);