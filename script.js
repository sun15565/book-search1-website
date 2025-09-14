// 图书数据已移至 book_data.js 文件

// DOM 元素
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const recentUpdatesContainer = document.getElementById('recentUpdates');
const newBooksContainer = document.getElementById('newBooks');
const recommendedNewBooksContainer = document.getElementById('recommendedNewBooks');
const romanceBooksContainer = document.getElementById('romanceBooks');
const originalBooksContainer = document.getElementById('originalBooks');

// 更新阅读统计显示
function updateReadingStats() {
    const stats = getReadingStats();
    const readingCountElement = document.getElementById('readingCount');
    if (readingCountElement) {
        readingCountElement.textContent = stats.totalBooks;
        readingCountElement.style.display = stats.totalBooks > 0 ? 'inline' : 'none';
    }
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    loadRecentUpdates();
    loadNewBooks();
    loadRecommendedNewBooks();
    loadRomanceBooks();
    loadOriginalBooks();
    setupSearch();
    setupNavigation();
    updateReadingStats();
});

// 加载最近更新列表
function loadRecentUpdates() {
    const html = bookData.recentUpdates.map(book => `
        <div class="list-item">
            <span class="col-category">[${book.category}]</span>
            <span class="col-title"><a href="#" onclick="showBookDetail('${book.title}')">${book.title}</a></span>
            <span class="col-chapter">${book.chapter}</span>
            <span class="col-author">${book.author}</span>
            <span class="col-date">${book.date}</span>
        </div>
    `).join('');
    
    recentUpdatesContainer.innerHTML = html;
}

// 加载最新入库列表
function loadNewBooks() {
    const html = bookData.newBooks.map(book => `
        <div class="list-item">
            <span class="col-category">[${book.category}]</span>
            <span class="col-title"><a href="#" onclick="showBookDetail('${book.title}')">${book.title}</a></span>
            <span class="col-author">${book.author}</span>
            <span class="col-date">${book.date}</span>
        </div>
    `).join('');
    
    newBooksContainer.innerHTML = html;
}

// 加载推荐新书
function loadRecommendedNewBooks() {
    const html = bookData.recommendedNewBooks.map(book => `
        <div class="book-card" onclick="goToBookDetail(${book.id})">
            <div class="book-cover">
                <img src="${book.cover}" alt="${book.title}" onerror="this.src='https://via.placeholder.com/200x280/cccccc/666666?text=暂无封面'">
                <div class="book-tag">推荐</div>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <p class="book-description">${book.description}</p>
                <div class="book-stats">
                    <div class="book-rating">
                        <div class="stars">${'★'.repeat(Math.floor(book.rating))}${'☆'.repeat(5-Math.floor(book.rating))}</div>
                        <span class="rating-text">${book.rating}</span>
                    </div>
                    <div class="book-views">${book.views}阅读</div>
                </div>
            </div>
        </div>
    `).join('');
    
    recommendedNewBooksContainer.innerHTML = html;
}

// 加载好文
function loadRomanceBooks() {
    const html = bookData.romanceBooks.map(book => `
        <div class="book-card" onclick="goToBookDetail(${book.id})">
            <div class="book-cover">
                <img src="${book.cover}" alt="${book.title}" onerror="this.src='https://via.placeholder.com/200x280/cccccc/666666?text=暂无封面'">
                <div class="book-tag">言情</div>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <p class="book-description">${book.description}</p>
                <div class="book-stats">
                    <div class="book-rating">
                        <div class="stars">${'★'.repeat(Math.floor(book.rating))}${'☆'.repeat(5-Math.floor(book.rating))}</div>
                        <span class="rating-text">${book.rating}</span>
                    </div>
                    <div class="book-views">${book.views}阅读</div>
                </div>
            </div>
        </div>
    `).join('');
    
    romanceBooksContainer.innerHTML = html;
}

// 加载原创畅读
function loadOriginalBooks() {
    const html = bookData.originalBooks.map(book => `
        <div class="book-card" onclick="goToBookDetail(${book.id})">
            <div class="book-cover">
                <img src="${book.cover}" alt="${book.title}" onerror="this.src='https://via.placeholder.com/200x280/cccccc/666666?text=暂无封面'">
                <div class="book-tag">原创</div>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <p class="book-description">${book.description}</p>
                <div class="book-stats">
                    <div class="book-rating">
                        <div class="stars">${'★'.repeat(Math.floor(book.rating))}${'☆'.repeat(5-Math.floor(book.rating))}</div>
                        <span class="rating-text">${book.rating}</span>
                    </div>
                    <div class="book-views">${book.views}阅读</div>
                </div>
            </div>
        </div>
    `).join('');
    
    originalBooksContainer.innerHTML = html;
}

// 设置搜索功能
function setupSearch() {
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();
        
        if (query.length > 0) {
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        } else {
            hideSearchResults();
        }
    });
    
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            performSearch(query);
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                performSearch(query);
            }
        }
    });
}

// 执行搜索
function performSearch(query) {
    const results = bookData.allBooks.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.category.toLowerCase().includes(query.toLowerCase())
    );
    
    if (results.length > 0) {
        showSearchResults(results, query);
    } else {
        showNoResults(query);
    }
}

// 显示搜索结果
function showSearchResults(results, query) {
    const searchResults = document.getElementById('searchResults') || createSearchResultsContainer();
    
    const html = results.map(book => `
        <div class="suggestion-item" onclick="selectBook('${book.title}')">
            <div style="font-weight: bold; color: #333;">${highlightText(book.title, query)}</div>
            <div style="font-size: 12px; color: #666;">作者：${book.author} | 分类：${book.category}</div>
        </div>
    `).join('');
    
    searchResults.innerHTML = html;
    searchResults.style.display = 'block';
}

// 显示无结果
function showNoResults(query) {
    const searchResults = document.getElementById('searchResults') || createSearchResultsContainer();
    searchResults.innerHTML = `
        <div class="suggestion-item">
            <div style="text-align: center; color: #666;">未找到包含 "${query}" 的图书</div>
        </div>
    `;
    searchResults.style.display = 'block';
}

// 创建搜索结果容器
function createSearchResultsContainer() {
    const container = document.createElement('div');
    container.id = 'searchResults';
    container.className = 'search-suggestions';
    
    const searchBox = document.querySelector('.search-box');
    searchBox.style.position = 'relative';
    searchBox.appendChild(container);
    
    return container;
}

// 隐藏搜索结果
function hideSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

// 高亮搜索文本
function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span style="background-color: #ffeb3b; color: #333;">$1</span>');
}

// 选择图书
function selectBook(title) {
    searchInput.value = title;
    hideSearchResults();
    showBookDetail(title);
}

// 跳转到图书详情页面
function goToBookDetail(bookId) {
    // 添加阅读记录
    addReadingRecord(bookId, 1); // 点击图书卡片，记录1%的阅读进度
    window.location.href = `book_detail.html?id=${bookId}`;
}

// 阅读记录管理
class ReadingHistoryManager {
    constructor() {
        this.storageKey = 'readingHistory';
        this.favoritesKey = 'favoriteBooks';
    }
    
    loadHistory() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : [];
    }
    
    saveHistory(history) {
        localStorage.setItem(this.storageKey, JSON.stringify(history));
    }
    
    loadFavorites() {
        const stored = localStorage.getItem(this.favoritesKey);
        return stored ? JSON.parse(stored) : [];
    }
    
    saveFavorites(favorites) {
        localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    }
    
    addReadingRecord(bookId, progress = 0) {
        const history = this.loadHistory();
        const book = findBookById(bookId);
        if (!book) return false;
        
        const existingRecord = history.find(record => record.bookId === bookId);
        const now = new Date().toISOString();
        
        if (existingRecord) {
            existingRecord.progress = Math.max(existingRecord.progress, progress);
            existingRecord.lastReadTime = now;
            existingRecord.readCount = (existingRecord.readCount || 0) + 1;
        } else {
            history.unshift({
                bookId: bookId,
                title: book.title,
                author: book.author,
                cover: book.cover,
                progress: progress,
                lastReadTime: now,
                readCount: 1,
                totalChapters: book.chapters || 156,
                isCompleted: progress >= 100
            });
        }
        
        this.saveHistory(history);
        return true;
    }
    
    updateProgress(bookId, progress) {
        const history = this.loadHistory();
        const record = history.find(record => record.bookId === bookId);
        if (record) {
            record.progress = Math.min(100, Math.max(0, progress));
            record.lastReadTime = new Date().toISOString();
            record.isCompleted = record.progress >= 100;
            this.saveHistory(history);
            return true;
        }
        return false;
    }
    
    getReadingStats() {
        const history = this.loadHistory();
        const totalBooks = history.length;
        const completedBooks = history.filter(record => record.isCompleted).length;
        const readingBooks = history.filter(record => !record.isCompleted && record.progress > 0).length;
        const totalReadTime = history.reduce((sum, record) => sum + (record.readCount || 0), 0);
        
        return {
            totalBooks,
            completedBooks,
            readingBooks,
            totalReadTime
        };
    }
}

// 初始化阅读记录管理器
const historyManager = new ReadingHistoryManager();

// 查找图书
function findBookById(bookId) {
    const allBooks = [
        ...bookData.recommendedNewBooks,
        ...bookData.romanceBooks,
        ...bookData.originalBooks
    ];
    return allBooks.find(book => book.id == bookId);
}

// 添加阅读记录
function addReadingRecord(bookId, progress = 0) {
    return historyManager.addReadingRecord(bookId, progress);
}

// 更新阅读进度
function updateReadingProgress(bookId, progress) {
    return historyManager.updateProgress(bookId, progress);
}

// 获取阅读统计
function getReadingStats() {
    return historyManager.getReadingStats();
}

// 显示图书详情（保留原有功能）
function showBookDetail(title) {
    const book = bookData.allBooks.find(b => b.title === title);
    if (book) {
        alert(`图书详情：\n\n书名：${book.title}\n作者：${book.author}\n分类：${book.category}\n\n这是一个示例图书详情页面。在实际应用中，这里会跳转到图书详情页。`);
    }
}

// 开始阅读
function startReading(title) {
    alert(`开始阅读《${title}》\n\n这是一个示例阅读页面。在实际应用中，这里会跳转到阅读界面。`);
}

// 设置导航功能
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            // 添加当前活动状态
            this.classList.add('active');
            
            // 根据分类筛选图书
            const category = this.textContent.trim();
            if (category !== '首页') {
                filterBooksByCategory(category);
            } else {
                showAllBooks();
            }
        });
    });
}

// 按分类筛选图书
function filterBooksByCategory(category) {
    const filteredBooks = bookData.allBooks.filter(book => book.category === category);
    
    if (filteredBooks.length > 0) {
        showFilteredResults(filteredBooks, category);
    } else {
        showNoResults(category);
    }
}

// 显示筛选结果
function showFilteredResults(books, category) {
    const searchResults = document.getElementById('searchResults') || createSearchResultsContainer();
    
    const html = books.map(book => `
        <div class="suggestion-item" onclick="selectBook('${book.title}')">
            <div style="font-weight: bold; color: #333;">${book.title}</div>
            <div style="font-size: 12px; color: #666;">作者：${book.author} | 分类：${book.category}</div>
        </div>
    `).join('');
    
    searchResults.innerHTML = `
        <div class="suggestion-item" style="background-color: #f8f9fa; font-weight: bold;">
            分类：${category} (${books.length}本)
        </div>
        ${html}
    `;
    searchResults.style.display = 'block';
}

// 显示所有图书
function showAllBooks() {
    hideSearchResults();
    loadRecentUpdates();
    loadNewBooks();
    loadRecommendedNewBooks();
    loadRomanceBooks();
    loadOriginalBooks();
}

// 点击页面其他地方隐藏搜索结果
document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-box')) {
        hideSearchResults();
    }
});

// 添加一些交互效果
document.addEventListener('DOMContentLoaded', function() {
    // 为图书封面添加悬停效果
    const bookCovers = document.querySelectorAll('.book-cover img');
    bookCovers.forEach(cover => {
        cover.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        cover.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // 为推荐图书添加点击效果
    const featuredBooks = document.querySelectorAll('.featured-book');
    featuredBooks.forEach(book => {
        book.addEventListener('click', function() {
            const title = this.querySelector('.book-title').textContent;
            showBookDetail(title);
        });
    });
    
    // 为分类图书链接添加点击效果
    const categoryBookLinks = document.querySelectorAll('.book-link');
    categoryBookLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const title = this.textContent;
            showBookDetail(title);
        });
    });
});

// 添加滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.main-nav');
    
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        nav.style.position = 'sticky';
        nav.style.top = '0';
        nav.style.zIndex = '1000';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        nav.style.position = 'static';
    }
});

// 添加加载动画
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

// 模拟数据加载
function simulateDataLoading() {
    showLoading(recentUpdatesContainer);
    showLoading(newBooksContainer);
    
    setTimeout(() => {
        loadRecentUpdates();
        loadNewBooks();
    }, 1000);
}

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl + K 聚焦搜索框
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // ESC 键隐藏搜索结果
    if (e.key === 'Escape') {
        hideSearchResults();
        searchInput.blur();
    }
});

// 添加搜索框提示
searchInput.addEventListener('focus', function() {
    this.placeholder = '输入书名、作者或分类进行搜索...';
});

searchInput.addEventListener('blur', function() {
    this.placeholder = '快速搜索、找书、找作者';
});

// 添加响应式菜单（移动端）
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-list');
    nav.classList.toggle('mobile-open');
}

// 在移动端添加菜单按钮
if (window.innerWidth <= 768) {
    const nav = document.querySelector('.main-nav .container');
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.className = 'mobile-menu-btn';
    menuButton.onclick = toggleMobileMenu;
    nav.appendChild(menuButton);
}
