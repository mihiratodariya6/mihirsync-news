// 🌍 MihirSync Category Engine (With Premium Pop-up Modal)

const API_LINKS = {
    'all_global': [
        'https://saurav.tech/NewsAPI/top-headlines/category/general/gb.json', 
        'https://saurav.tech/NewsAPI/top-headlines/category/general/us.json',
        'https://saurav.tech/NewsAPI/top-headlines/category/general/au.json'
    ],
    'india': ['https://saurav.tech/NewsAPI/top-headlines/category/general/in.json'],
    'business': [
        'https://saurav.tech/NewsAPI/top-headlines/category/business/in.json',
        'https://saurav.tech/NewsAPI/top-headlines/category/business/us.json'
    ],
    'sports': [
        'https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json', 
        'https://saurav.tech/NewsAPI/top-headlines/category/sports/gb.json'
    ],
    'tech': [
        'https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json', 
        'https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json'
    ]
};

async function loadCategory(categoryName, buttonElement) {
    let allButtons = document.querySelectorAll('.tab-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    if(buttonElement) buttonElement.classList.add('active');

    const newsGrid = document.getElementById('news-grid');
    newsGrid.innerHTML = '<div id="loader">Fetching latest updates...</div>';
    document.getElementById('loader').style.display = 'block';

    try {
        let urls = API_LINKS[categoryName];
        let responses = await Promise.all(urls.map(url => fetch(url)));
        let dataPromises = responses.map(res => res.json());
        let allData = await Promise.all(dataPromises);

        let categoryNews = [];
        allData.forEach(data => {
            if(data.articles) categoryNews = categoryNews.concat(data.articles);
        });

        // ડુપ્લિકેટ ન્યૂઝ ફિલ્ટર
        let uniqueNews = [];
        let seenTitles = new Set();
        for (let news of categoryNews) {
            if (!seenTitles.has(news.title)) {
                seenTitles.add(news.title);
                uniqueNews.push(news);
            }
        }

        // લેટેસ્ટ ન્યૂઝ સૌથી ઉપર
        uniqueNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        let topNews = uniqueNews.slice(0, 12); 
        
        // 🔥 ડેટાને મેમરીમાં સેવ કરો (પોપ-અપ માટે)
        window.currentNewsData = topNews;
        
        let htmlContent = "";

        topNews.forEach((news, index) => {
            let imageUrl = news.urlToImage ? news.urlToImage : 'https://via.placeholder.com/400x200/1e293b/38bdf8?text=MihirSync+Oracle';
            let newsDate = new Date(news.publishedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
            let description = news.description ? news.description.substring(0, 110) + '...' : 'Latest update from ' + news.source.name;

            // 🔥 અહીંયા લિંક ની જગ્યાએ પોપ-અપ ખોલતું બટન (onclick) મૂક્યું છે
            htmlContent += `
                <div class="news-card">
                    <img src="${imageUrl}" alt="News Image" class="news-img">
                    <div class="news-info">
                        <span class="news-meta">⚡ ${news.source.name} • ${newsDate}</span>
                        <h3 class="news-title">${news.title}</h3>
                        <p class="news-desc">${description}</p>
                        <button class="read-btn" onclick="openModal(${index})" style="cursor: pointer; border:none; text-align:left;">Read Full Story</button>
                    </div>
                </div>
            `;
        });

        newsGrid.innerHTML = htmlContent;

    } catch (error) {
        newsGrid.innerHTML = "<p style='color:#ef4444; text-align:center; grid-column: 1/-1;'>⚠️ સર્વર એરર: ડેટા લોડ થઈ શક્યો નથી.</p>";
    }
}

// 🔥 નવા ફંક્શન: પોપ-અપ ખોલવા અને બંધ કરવા
function openModal(index) {
    let news = window.currentNewsData[index];
    let imageUrl = news.urlToImage ? news.urlToImage : 'https://via.placeholder.com/800x400/1e293b/38bdf8?text=MihirSync+Oracle';
    
    // API માંથી આવતો પૂરો ડેટા અથવા ડીફોલ્ટ મેસેજ
    let fullContent = news.content ? news.content.split('[+')[0] : (news.description || "Detailed report is being compiled by MihirSync Engine.");

    document.getElementById('modal-img').src = imageUrl;
    document.getElementById('modal-source').innerText = "⚡ Sourced from: " + news.source.name;
    document.getElementById('modal-title').innerText = news.title;
    document.getElementById('modal-desc').innerText = fullContent;
    
    document.getElementById('newsModal').style.display = "block";
    document.body.style.overflow = "hidden"; // પાછળનું પેજ સ્ક્રોલ થતું અટકી જશે
}

function closeModal() {
    document.getElementById('newsModal').style.display = "none";
    document.body.style.overflow = "auto"; // સ્ક્રોલ પાછું ચાલુ
}

window.onload = () => {
    loadCategory('all_global', document.querySelector('.tab-btn.active'));
};