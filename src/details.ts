const id = new URLSearchParams(window.location.search).get('id');
const containerDetail = document.querySelector('.details') as HTMLElement;
const deleteBtn = document.querySelector('.delete') as HTMLAnchorElement;

const renderDetails = async () => {
    const res = await fetch(`http://localhost:3000/posts/${id}`);
    const post = await res.json();

    const template = `
        <h1>${post.title}</h1>
        <p>${post.body}</p>
        `;
    containerDetail.innerHTML = template;
};

deleteBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE',
    });
    window.location.replace('/index.html');
});

window.addEventListener('DOMContentLoaded', () => renderDetails());


// Function to open a new window for sharing
const shareOnSocialMedia = (platform: string, url: string) => {
    const width = 600;
    const height = 400;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    window.open(url, platform, `width=${width},height=${height},left=${left},top=${top}`);
};

// Add event listeners for social media 
document.getElementById('twitter-share')?.addEventListener('click', (e) => {
    e.preventDefault();
    const postUrl = window.location.href;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`;
    shareOnSocialMedia('Twitter', twitterShareUrl);
});

document.getElementById('facebook-share')?.addEventListener('click', (e) => {
    e.preventDefault();
    const postUrl = window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
    shareOnSocialMedia('Facebook', facebookShareUrl);
});
