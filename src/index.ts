const container = document.querySelector('.blogs') as HTMLElement;
const searchForm = document.querySelector('.search') as HTMLFormElement;

type Blog={
    id: number,
    title:string,
    body:string,
    likes:number
}

const renderPosts = async (term: string | null) => {
    let uri = 'http://localhost:3000/posts?_sort=likes&_order=desc';
    if (term) {
        uri += `&q=${term}`;//placeholder that will be replaced with the actual value of the term variable
    }
    const res = await fetch(uri);
    const posts = await res.json();

    let template = '';

    posts.forEach((post: any) => {
        template += `
            <div class="post">
                <h2>${post.title}</h2>
                <p><small>${post.likes} likes</small></p>
                <p>${post.body.slice(0, 200)}</p>
                <a href="/details.html?id=${post.id}">Read more...</a>
            </div>
        `;
    });
    container.innerHTML = template;
};

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    renderPosts((searchForm.term as HTMLInputElement).value.trim());
});

window.addEventListener('DOMContentLoaded', () => renderPosts(null));