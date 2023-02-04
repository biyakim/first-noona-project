let news = [];
let menus = document.querySelectorAll(".menus button")
menus.forEach((menu)=>menu.addEventListener("click", (event)=>getNewsByTopic(event)));

let searchButton = document.getElementById("search-button");
let url;

// 각 함수에서 필요한 url을 만든다
// api호출 함수를 부른다

const getNews = async() => {
    let header = new Headers({"x-api-key":"t9Yut0w6KuD8EYiSxyR0Q5OKVKoxGSg9TQITAq-U92c",})

    let response = await fetch(url,{headers:header}); //ajax, http, fetch
    let data = await response.json();
    news = data.articles;
    console.log(news);

    render();
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
}
searchButton.addEventListener("click",getNewsByKeyword)
getLatestNews()