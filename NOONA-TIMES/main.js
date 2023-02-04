

const getLatestNews = () => {
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`);
    console.log(url)
}
getLatestNews()