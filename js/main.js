function createElemWithText(elemType = "p", textContent = "", className) {
    const myElem = document.createElement(elemType);
    myElem.textContent = textContent;
    
    if(className) 
        myElem.classList.add(className)
    return myElem;
}
function createSelectOptions(users) {  
    if(!users) 
        return;

    const userArray = [];
    
    users.forEach( (user) => {
        let option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        userArray.push(option);
    });
    return userArray;
}
function toggleCommentSection(postId) {
    if (!postId) 
        return;

    const section = document.querySelector(`section[data-post-id='${postId}']`);
    
    if (section) {
        section.classList.toggle('hide');
    }
    return section;
}
function toggleCommentButton(postId) {
    if(!postId)
        return;

    const commentbutton = document.querySelector(`button[data-post-id='${postId}']`);
    
    if(commentbutton) {
        commentbutton.textContent == "Show Comments" ? (commentbutton.textContent = "Hide Comments") : (commentbutton.textContent = "Show Comments");
    }
    return commentbutton;
}
function deleteChildElements(parentElement) {
    if(!parentElement?.lastElementChild)
        return;
    else if(parentElement.lastElementChild == "")
        return parentElement;
    else {
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }  
    return parentElement;
}
}
function addButtonListeners() {
    const buttons = document.querySelectorAll('main')[0].querySelectorAll('button');     
    
    if (buttons) {
        buttons.forEach( (button) => {
            const postID = button.dataset.postId;   
            button.addEventListener('click', function (e) {
                toggleComments(e, postID)      
            }, false);
        });   
        return buttons;
    }
}
function removeButtonListeners() {
    const buttons = document.querySelectorAll('main')[0].querySelectorAll('button');
    buttons.forEach( (button) => {
        const postID = button.dataset.id;   

        button.removeEventListener('click', function (e) {
                toggleComments(e, postID)
        }, true);
    });
    return buttons;
}
function createComments(comments) {
    if (!comments) 
        return;
      
    let fragment = document.createDocumentFragment();

    comments.forEach( (comment) => {
        let article = createElemWithText('article');
        let h3 = createElemWithText('h3', comment.name);
        let p1 = createElemWithText('p', comment.body);
        let p2 = createElemWithText('p', `From: ${comment.email}`);

        article.append(h3, p1, p2);
        fragment.append(article);
    });
    return fragment;  
}
function populateSelectMenu(users) {
    if (!users) 
        return;

    let menu = document.getElementById('selectMenu');
    let options = createSelectOptions(users);

    options.forEach( (option) => {
        menu.append(option);
    });
    return menu;
}
const getUsers = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        return await response.json();
    } catch(e) {
        console.log(e);
    }
}

const getUserPosts = async (userId) => {
    if (!userId) 
        return;
    
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        return await response.json();;
    } catch(e) {
        console.log(e);
    }
}

const getUser = async (userId) => {
    if (!userId) 
        return;

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        return await response.json();
    } catch(e) {
        console.log(e);
    }
}

const getPostComments = async (postId) => {
    if(!postId) 
        return;

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        return await response.json();
    } catch(e){
        console.log(e);
    }
} 

const displayComments = async (postId) =>{
    if(!postId) return;
    let section = document.createElement('section');
    section.dataset.postId = postId;
    section.classList.add('comments', 'hide');
    const comments = await getPostComments(postId);
    const fragment = createComments(comments);
    section.append(fragment);
    console.log(section);
    return section;
} 
const createPosts = async (posts) => {
    if(!posts) 
        return;

    let fragment = document.createDocumentFragment();

    for(let i = 0; i < posts.length; i++) {
        let post = posts[i];
        let article = document.createElement('article');
        let author = await getUser(post.userId);
        let section = await displayComments(post.id);

        let h2 = createElemWithText('h2', post.title);
        let p = createElemWithText('p', post.body);
        let p2 = createElemWithText('p', `Post ID: ${post.id}`);
        let p3 = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
        let p4 = createElemWithText('p', `${author.company.catchPhrase}`);
        let button = createElemWithText('button', 'Show Comments');
        button.dataset.postId = post.id;

        article.append(h2, p, p2, p3, p4, button, section); 
        fragment.append(article);
    }
    return fragment;
}
const displayPosts = async (posts) => {
    const main = document.querySelector('main');
    let element= (posts) ? await createPosts(posts) : document.querySelector('main p');
    main.append(element);    
    return element;

}
function toggleComments(event, postId) {
    if (!event || !postId){
        return undefined;
    }
    event.target.listener = true;
    let section  = toggleCommentSection(postId);
    let button = toggleCommentButton(postId);
    return [section, button];
}
const refreshPosts = async (posts) => {
    if(!posts)
        return;
    let removeButtons = removeButtonListeners();
    let main = deleteChildElements('main');
    let fragment = await displayPosts(posts);
    let addButtons = addButtonListeners();
    return [removeButtons, main, fragment, addButtons];

}
const selectMenuChangeEventHandler = async (e) => {
    if(!e)
        return;
    let menu = document.getElementById('selectMenu');
    menu.disabled = true;

    let userId = e?.target?.value || 1;
    let posts = await getUserPosts(userId);
    let refreshPostsArray = await refreshPosts(posts);
    menu.disabled = false;
    return [userId, posts, refreshPostsArray];
    
}
const initPage = async() => {
    let users = await getUsers();
    let select = populateSelectMenu(users);
    return [users, select];
}
function initApp() {
    initPage();
    let select = document.getElementById('selectMenu');
    select.addEventListener("change", selectMenuChangeEventHandler, false);
}
