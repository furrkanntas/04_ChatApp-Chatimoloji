const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
const currentNames = document.querySelector('.currentName');

newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
 
  newNameForm.reset();
 
  const updatedNameDiv = document.querySelector('.updatedName');
  
  updateMssg.innerText = `${newName}`;
  currentNames.innerText = newName;
  

  updatedNameDiv.classList.remove('hidden');
  setTimeout(() => {
    updatedNameDiv.classList.add('hidden');
    updateMssg.innerText = '';
  }, 3000);
});

rooms.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON'){

    const buttonText = e.target.textContent;
    const textTopicDiv = document.querySelector('.textTopic');
    textTopicDiv.textContent = buttonText;

    textTopicDiv.classList.remove('border-green-300', 'border-blue-300', 'border-orange-300', 'border-purple-300');

    const buttonId = e.target.getAttribute('id');
    if (buttonId === 'general') {
      textTopicDiv.classList.add('border-green-300');
    } else if (buttonId === 'films') {
      textTopicDiv.classList.add('border-blue-300');
    } else if (buttonId === 'music') {
      textTopicDiv.classList.add('border-orange-300');
    } else if (buttonId === 'books') {
      textTopicDiv.classList.add('border-purple-300');
    }

    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
  }
});

const username = localStorage.username ? localStorage.username : 'anon';
currentNames.innerText = username;

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

chatroom.getChats(data => chatUI.render(data));