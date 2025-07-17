document.addEventListener('DOMContentLoaded', function() {
    const tabsBar = document.getElementById('tabs-bar');
    const mainFrame = document.getElementById('mainFrame');
    const closeAllBtn = document.getElementById('closeAllTabs');
    const menuLinks = document.querySelectorAll('.submenu a');
    let tabs = [];

    function openTab(title, url) {
        // 检查是否已存在
        let existing = tabs.find(tab => tab.url === url);
        if (existing) {
            setActiveTab(existing.url);
            return;
        }
        tabs.push({ title, url });
        renderTabs(url);
    }

    function setActiveTab(url) {
        renderTabs(url);
        mainFrame.src = url;
    }

    function closeTab(url) {
        let idx = tabs.findIndex(tab => tab.url === url);
        if (idx !== -1) {
            tabs.splice(idx, 1);
            let nextUrl = tabs.length ? (tabs[idx] ? tabs[idx].url : tabs[tabs.length-1].url) : 'pages/welcome.html';
            renderTabs(nextUrl);
            mainFrame.src = nextUrl;
        }
    }

    function renderTabs(activeUrl) {
        tabsBar.innerHTML = '';
        tabs.forEach(tab => {
            let tabDiv = document.createElement('div');
            tabDiv.className = 'tab' + (tab.url === activeUrl ? ' active' : '');
            tabDiv.textContent = tab.title;
            tabDiv.onclick = () => setActiveTab(tab.url);
            let closeBtn = document.createElement('span');
            closeBtn.className = 'close-btn';
            closeBtn.innerHTML = '&times;';
            closeBtn.onclick = (e) => { e.stopPropagation(); closeTab(tab.url); };
            tabDiv.appendChild(closeBtn);
            tabsBar.appendChild(tabDiv);
        });
        // 设置iframe
        if (activeUrl) mainFrame.src = activeUrl;
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let url = this.getAttribute('href');
            let title = this.getAttribute('data-title') || this.textContent.trim();
            openTab(title, url);
        });
    });

    closeAllBtn.addEventListener('click', function() {
        tabs = [];
        renderTabs();
        mainFrame.src = 'pages/welcome.html';
    });

    // 默认欢迎页
    tabs = [{ title: '欢迎页', url: 'pages/welcome.html' }];
    renderTabs('pages/welcome.html');
}); 