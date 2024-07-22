class ChatUI {
  constructor(list){
    this.list = list;
  }
  clear(){
    this.list.innerHTML = '';
  }
  render(data){
    const when = dateFns.formatDistanceToNow(
      data.created_at.toDate(),
      { addSuffix:true }
    );
    const html = `
      <div
            class="list-group-item flex items-start gap-2 bg-white/30 mt-3 rounded-xl border-l-4 border-orange-300 hover:border-blue-300 shadow-md">
            <div class="flex flex-col p-3 pr-6">
              <div class="text-justify">
                <i class="fa-solid fa-fingerprint text-orange-600"></i>
                <span class="font-bold username">${data.username}</span>
                <i class="fa-regular fa-comments text-orange-600"></i>
                <span class="message">${data.message}</span>
              </div>
              <div class="flex items-center mt-1 gap-1">
                <i class="fa-solid fa-stopwatch text-purple-500"></i>
                <div class="font-semibold time">${when}</div>
              </div>
            </div>
          </div>
    `;
    this.list.innerHTML += html;
  }
}