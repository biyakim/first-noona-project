let news = [];
let page = 1;
let total_pages = 1;
let menus = document.querySelectorAll(".menus button")
menus.forEach((menu)=>menu.addEventListener("click", (event)=>getNewsByTopic(event)));

let searchButton = document.getElementById("search-button");
let url;

// 각 함수에서 필요한 url을 만든다
// api호출 함수를 부른다

const getNews = async() => {
    try{
        let header = new Headers({"x-api-key":"QH01zDpjrajJ4lK_0RAMObMluwM_5OmE6xlYncrZPV4",})
        url.searchParams.set('page', page); // &page=
        console.log("url은?",url)
        let response = await fetch(url,{headers:header}); //ajax, http, fetch
        let data = await response.json();
        if(response.status == 200){
            if(data.total_hits == 0){
                throw new Error("검색된 결과값이 없습니다.");
            }
            console.log("받는 데이터가 뭐지?")
            news = data.articles;
            total_page = data.total_pages
            page = data.page;
            console.log(news);
            render();
            pagenation();
        }else{
            throw new Error(data.message)
        }
    }catch(error){
        console.log("잡힌 에러는",error.message)
        errorRender(error.message)
    }
    
}

const getLatestNews = async() => {
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10`);
    
    getNews();
    
};

const getNewsByTopic = async(event) =>{
    let topic = event.target.textContent.toLowerCase()
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`);
    
    getNews();
    
}
const getNewsByKeyword = async() =>{
    //1. 검색 키워드 읽어오기
    //2. url에 검색 키워드 부치기
    //3. 헤더 준비
    //4. url 부르기
    //5. 데이터 가져오기
    //6. 데이터 보여주기

    let keyword = document.getElementById("search-input").value
    url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`);
    
    getNews();
}
const render = () => {
    let newsHTML = "";
    newsHTML = news.map((news)=>{
        return `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${news.media}"/>
        </div>
        <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>
                ${news.summary}
            </p>
            <div>
                ${news.rights} * ${news.published_date}
            </div>
        </div>
    </div>`
    }).join('');

    document.getElementById("news-board").innerHTML = newsHTML
};

const errorRender = (message) => {
    let errorHTML = `<div class="alert alert-danger text-center" role="alert">
    ${message}
  </div>`
    document.getElementById("news-board").innerHTML = errorHTML
}

const pagenation = () =>{
    let pagenationHTML = ``
    // total_page
    // page
    // page group
    let pageGroup = Math.ceil(page/5)
    // last
    let last = pageGroup*5
    // first
    let first = last - 4
    //first~last 페이지 프린트

    // total page 3일경우 3개의 페이지만 프린트 하는 법 last, first
    // << >> 이 버튼 만들어 주기 맨처음, 맨끝으로 가는 버튼 만들기
    // 내가 그룹1 일때 << < 이 버튼이 없다
    // 내가 마지막 그룹일 때 > >> 이 버튼이 없다
   
    pagenationHTML = `<li class="page-item">
    <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${page-5})">
      <span aria-hidden="true">&laquo;</span>
    </a>
  </li>`
    

    pagenationHTML += `<li class="page-item">
    <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${page-1})">
      <span aria-hidden="true">&lt;</span>
    </a>
  </li> `
    
    
    for(let i = first;i<=last;i++){
        pagenationHTML += `<li class="page-item ${page==i?"active":""}"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`
    }

    pagenationHTML += `<li class="page-item">
    <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${page+1})">
      <span aria-hidden="true">&gt;</span>
    </a>
  </li>`

  pagenationHTML += `<li class="page-item">
  <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${page+5})">
    <span aria-hidden="true">&raquo;</span>
  </a>
</li>`
    document.querySelector(".pagination").innerHTML = pagenationHTML;
};

const moveToPage = (pageNum) => {
    //1. 이동하고 싶은 페이지를 알아야겠지
    page = pageNum
    
    //2. 이동하고 싶은 페이지를 가지고 api를 다시 호출해주자
    getNews();
}

searchButton.addEventListener("click",getNewsByKeyword)
getLatestNews()