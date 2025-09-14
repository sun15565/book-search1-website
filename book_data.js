// 图书数据 - 图片和书名对应关系
const bookData = {
    recentUpdates: [
        { category: '玄幻', title: '万相之王', chapter: '第1234章', author: '天蚕土豆', date: '07-10' },
        { category: '都市', title: '校花的贴身高手', chapter: '第5678章', author: '鱼人二代', date: '07-10' },
        { category: '武侠', title: '盖世神医', chapter: '第901章', author: '叶辰', date: '07-10' },
        { category: '科幻', title: '道诡异仙', chapter: '第456章', author: '狐尾的笔', date: '07-10' },
        { category: '网游', title: '宇宙职业选手', chapter: '第789章', author: '我吃西红柿', date: '07-10' },
        { category: '历史', title: '万古帝婿', chapter: '第234章', author: '老鬼', date: '07-10' },
        { category: '女生', title: '一世如龙', chapter: '第567章', author: '关中老人', date: '07-10' },
        { category: '玄幻', title: '太荒吞天诀', chapter: '第890章', author: '铁马飞桥', date: '07-10' },
        { category: '都市', title: '一世独尊', chapter: '第123章', author: '月如火', date: '07-10' },
        { category: '武侠', title: '灵境行者', chapter: '第456章', author: '卖报小郎君', date: '07-10' }
    ],
    newBooks: [
        { category: '玄幻', title: '我的姐夫是太子', author: '上山打老虎额', date: '07-10' },
        { category: '武侠', title: '九星霸体诀', author: '平凡魔术师', date: '07-10' },
        { category: '都市', title: '修罗武神', author: '善良的蜜蜂', date: '07-10' },
        { category: '科幻', title: '灵境行者', author: '卖报小郎君', date: '07-10' },
        { category: '历史', title: '明天下', author: '孑与2', date: '07-10' },
        { category: '网游', title: '婚后心动', author: '明艳动人', date: '07-10' },
        { category: '女生', title: '师徒文女主认错师尊后', author: '白渺', date: '07-10' },
        { category: '玄幻', title: '都市极品医神叶辰', author: '风会笑', date: '07-10' },
        { category: '武侠', title: '恐怖复苏', author: '佛前献花', date: '07-10' },
        { category: '都市', title: '都市风云', author: '易克1', date: '07-10' }
    ],
    // 推荐新书 - 使用前8张图片
    recommendedNewBooks: [
        { id: 1, title: 'Building Web APIs with ASP.NET Core', author: '作者A', description: '...', cover: 'images/5204s.jpeg', rating: 4.8, views: '12.5万' },
        { id: 2, title: 'AI for Everyday IT', author: '作者B', description: '...', cover: 'images/5205s.jpeg', rating: 4.7, views: '10.8万' },
        { id: 3, title: 'Redis设计与实现', author: '作者C', description: '...', cover: 'images/5206s.jpeg', rating: 4.6, views: '9.2万' },
        { id: 4, title: 'Redis入门指南（第2版）', author: '作者D', description: '...', cover: 'images/5207s.jpeg', rating: 4.5, views: '8.7万' },
        { id: 5, title: 'Redis开发与运维', author: '作者E', description: '...', cover: 'images/5208s.jpeg', rating: 4.4, views: '7.9万' },
        { id: 6, title: 'React快速上手开发', author: '作者F', description: '...', cover: 'images/5209s.jpeg', rating: 4.3, views: '7.2万' },
        { id: 7, title: 'RabbitMQ实战指南', author: '作者G', description: '...', cover: 'images/5210s.jpeg', rating: 4.2, views: '6.8万' },
        { id: 8, title: 'Python自动化运维：技术与最佳实践', author: '作者H', description: '...', cover: 'images/5211s.jpeg', rating: 4.1, views: '6.3万' }
    ],
    // 言情好文 - 使用中间4张图片
    romanceBooks: [
        { id: 9, title: 'Python学习手册(第4版)', author: '作者I', description: '...', cover: 'images/5212s.jpeg', rating: 4.0, views: '5.9万' },
        { id: 10, title: 'The Quick Python Book 4th Edition', author: '作者J', description: '...', cover: 'images/5213s.jpeg', rating: 3.9, views: '5.5万' },
        { id: 11, title: 'Terraform in Depth', author: '作者K', description: '...', cover: 'images/5214s.jpeg', rating: 3.8, views: '5.1万' },
        { id: 12, title: 'Machine Learning for Tabular Data', author: '作者L', description: '...', cover: 'images/5215s.jpeg', rating: 3.7, views: '4.8万' }
    ],
    // 原创畅读 - 使用最后2张图片，避免重复
    originalBooks: [
        { id: 13, title: 'Learn SQL in a Month of Lunches', author: '作者M', description: '...', cover: 'images/5216s.jpeg', rating: 3.6, views: '4.5万' },
        { id: 14, title: 'Graph Neural Networks in Action', author: '作者N', description: '...', cover: 'images/5217s.jpeg', rating: 3.5, views: '4.2万' },
        { id: 15, title: 'Go in Practice 2nd Edition', author: '作者O', description: '...', cover: 'images/5204s.jpeg', rating: 3.4, views: '3.9万' },
        { id: 16, title: 'Effective Data Analysis', author: '作者P', description: '...', cover: 'images/5205s.jpeg', rating: 3.3, views: '3.6万' }
    ],
    allBooks: [
        { title: '我的姐夫是太子', author: '上山打老虎额', category: '历史' },
        { title: '九星霸体诀', author: '平凡魔术师', category: '武侠' },
        { title: '修罗武神', author: '善良的蜜蜂', category: '都市' },
        { title: '灵境行者', author: '卖报小郎君', category: '科幻' },
        { title: '万相之王', author: '天蚕土豆', category: '玄幻' },
        { title: '校花的贴身高手', author: '鱼人二代', category: '都市' },
        { title: '盖世神医', author: '叶辰', category: '武侠' },
        { title: '道诡异仙', author: '狐尾的笔', category: '科幻' },
        { title: '宇宙职业选手', author: '我吃西红柿', category: '网游' },
        { title: '万古帝婿', author: '老鬼', category: '历史' },
        { title: '一世如龙', author: '关中老人', category: '女生' },
        { title: '太荒吞天诀', author: '铁马飞桥', category: '玄幻' },
        { title: '一世独尊', author: '月如火', category: '都市' },
        { title: '明天下', author: '孑与2', category: '历史' },
        { title: '婚后心动', author: '明艳动人', category: '网游' },
        { title: '师徒文女主认错师尊后', author: '白渺', category: '女生' },
        { title: '都市极品医神叶辰', author: '风会笑', category: '玄幻' },
        { title: '恐怖复苏', author: '佛前献花', category: '武侠' },
        { title: '都市风云', author: '易克1', category: '都市' },
        { title: '做局', author: '易克1', category: '都市' }
    ]
};
