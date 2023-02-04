let news = {}
const getLatestNews = async() => {
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`);
    let header = new Headers({'x-api-key':'t9Yut0w6KuD8EYiSxyR0Q5OKVKoxGSg9TQITAq-U92c'})

    let response = await fetch(url,{headers:header}) //ajax, http, fetch
    let data = await response.json()
    news = data.articles
    console.log(news)
    
}
getLatestNews()