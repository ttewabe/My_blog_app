const container = document.querySelector('.blogs') as HTMLElement;
const searchForm = document.querySelector('.search') as HTMLFormElement;

type Blog={
    id: number,
    title:string,
    body:string,
    likes:number
}
const postsPerPage = 2; 
let currentPage = 1; 

const renderPosts = async (term: string | null, page: number)  => {
    //`_page=${page} and _limit=${postsPerPage} are query parameters added to the URL.
    let uri = `http://localhost:3000/posts?_sort=likes&_order=desc&_page=${page}&_limit=${postsPerPage}`;
    if (term) {
        uri += `&q=${term}`;//placeholder that will be replaced with the actual value of the term variable
    }

    // To check Json-server
    try{
        const res = await fetch(uri);

    //check if response status is ok. The ok property of the response object is a boolean that indicates whether the HTTP request was successful. 
    if (!res.ok){
        throw new Error ('Network response is not work')
    }
    
    const posts = await res.json();

    let template = '';

    posts.forEach((post: any) => {
        template += `
            <div class="post">
                <h2>${post.title}</h2>
                <ul><small>${post.likes} likes</small></ul>
                <p>${post.body.slice(0, 200)}</p>
                <a href="/details.html?id=${post.id}">Read more...</a>
                <button class="update-button" data-id="${post.id}">Update</button>
            </div>
        `;
    });
    container.innerHTML = template;

    const updateButtons = document.querySelectorAll('.update-button');
    updateButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const postId = e.target.getAttribute('data-id');
            window.location.href = `/update.html?id=${postId}`;
        });
    });

}catch(error){
    //Handle the error
    console.error('Error:', error);
    container.innerHTML = '<p>Error loading posts. please check if the json server is running. </p>'
}
};

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    renderPosts((searchForm.term as HTMLInputElement).value.trim(), currentPage);
});

//Add pagination
const renderPagination = (totalPosts: number) => {

    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const paginationContainer = document.querySelector('.pagination') as HTMLElement;
    
    paginationContainer.innerHTML = '';

    // Add "Previous" button
    if (currentPage > 1) {
        const prevPage = document.createElement('li');
        prevPage.innerHTML = `<a href="#" data-page="${currentPage - 1}"></a>`;
        paginationContainer.appendChild(prevPage);
    }

    // Add page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');

        //data-page="${i}" is a custom data attribute in HTML. Use to store data and ${i} will be replaced with the current value of i
        pageItem.innerHTML = `<a href="#" data-page="${i}">${i}</a>`;
        paginationContainer.appendChild(pageItem);
    }

    // Add "Next" button
    if (currentPage < totalPages) {
        const nextPage = document.createElement('li');
        nextPage.innerHTML = `<a href="#" data-page="${currentPage + 1}"></a>`;
        paginationContainer.appendChild(nextPage);
    }

    // Add event listeners to pagination links
    const pageLinks = document.querySelectorAll('.pagination a');
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 

        //used to extract the value of the data-page attribute from an HTML element and assign it to the currentPage variable after string convert to integer
            currentPage = parseInt(e.target.getAttribute('data-page') || '1');

            renderPosts((searchForm.term as HTMLInputElement).value.trim(), currentPage);
        });
    });
};


// Function to update the current page number display
const updateCurrentPageDisplay = () => {
    const currentPageDisplay = document.getElementById('currentPage');
    if (currentPageDisplay) {
        currentPageDisplay.textContent = `Page ${currentPage}`;
    }
};


// Add event listeners to Previous and Next buttons
const prevButton = document.getElementById('prevPage') as HTMLElement;
const nextButton = document.getElementById('nextPage') as HTMLElement;

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPosts((searchForm.term as HTMLInputElement).value.trim(), currentPage);
        updateCurrentPageDisplay()

        // Enable the "Next" button when going back to a previous page
        if (currentPage < totalPages) {
            nextButton.classList.remove('disabled');
        }
        
        // Disable the "Previous" button when reaching the first page
        if (currentPage === 1) {
            prevButton.classList.add('disabled');
        }
    }
});

nextButton.addEventListener('click', () => {
    currentPage++;
    renderPosts((searchForm.term as HTMLInputElement).value.trim(), currentPage);
    updateCurrentPageDisplay()

       // Enable the "Previous" button when going forward to the next page
       if (currentPage > 1) {
        prevButton.classList.remove('disabled');
    }
    
    // Disable the "Next" button when reaching the last page
    if (currentPage === totalPages) {
        nextButton.classList.add('disabled');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    // Fetch and display the first page of posts
    renderPosts(null, currentPage);

    // Update the current page number display when the page loads
    updateCurrentPageDisplay()
});