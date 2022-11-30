function createElemWithText(elemType = "p", elemType = "", className) {
    const myElem = document.createElement(elemType);
    if(className) myElem.classList.add(className)
    return myElem;
}
function createSelectOptions(data) {
    const userArray = [];
    data.forEach((user) => {
        userArray.push(user.name);
    });

}
function toggleCommentSection(postID) {
        // If Post Id Is Passed, Return Undefined
        if (!postID) {
            return undefined;
        } else {
            // Else, Get All Comment Sections
            const commentSections = document.querySelectorAll('/comments');
            // Loop Through Each Comment Section
            for (let i = 0; i < commentSections.length; i++) {
                const commentSection = commentSections[i];
                // If Post Id Attribut Of Comment Section Is Equal To Post Id Passed Arg
                if (commentSection.getAttribute('postId') === postID) {
                    // Toggle Hide Class
                    commentSection.classList.toggle('hide');
                    // Return Comment Section Element
                    return commentSection;
                }
            }

            // If We Are Here, No Matching Post Id Is Found
            // Return NULL
            return null;
        }
    }   
function toggleCommentButton() {

}
function deleteChildElements() {

}
function addButtonListeners() {
    const buttons = document.querySelectorAll("main")[0].querySelectorAll('button');     // selectes all buttons in main
    // button should be exists
    if (buttons.length > 0) {
        // For each button element
        buttons.forEach( (button) => {
            const postID = button.dataset.postId;   // get the postID according to the question
            // Now add event listener to this button
            button.addEventListener("click", function() {
                toggleComments(postID);      // calling toggleComments method with postID as parameter
            })
        })
    }
    return buttons;   // returning the nodeList of buttons
}
function removeButtonListeners() {

}
function createComments() {

}
function populateSelectMenu() {

}
function getUsers() {

}
function getUserPosts() {

}
function getUser() {

}
function getPostComments() {

}
function displayComments() {

}
function createPosts() {

}
function displayPosts() {

}
function toggleComments() {

}
function refreshPosts() {

}
function selectMenuChangeEventHandler() {

}
function initPage() {

}
function initApp() {
    
}
