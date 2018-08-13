
$(function () {
    var hasLoad=false
    var APP_ID = 'SbXRBbIvetV0WEyOEorbAwWq-gzGzoHsz';
    var APP_KEY = 'hs6avP12egyisd50f9kpQhAW';

    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
    /*
    var TestObject = AV.Object.extend('TestObject');
    var testObject = new TestObject();
    testObject.save({
      words: 'Hello World!'
    }).then(function(object) {
      alert('LeanCloud Rocks!');
    })
    */
    /*
     var query = new AV.Query('Todo')
   query.find().then(function (results) {
    // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
    }, function (error) {
    })
    
    */


    setTimeout(() => {
        $.get('./songs.json').then(function (response) {
            let items = response
            items.forEach(element => {
                let $li = $(`
                <li>
                <a href="./song.html?id=${element.id}">
                    <h3>${element.name}</h3>
                    <p>
                        <svg class="icon-sq" aria-hidden="true">
                            <use xlink:href="#icon-sq"></use>
                        </svg>
                        ${element.singer}</p>
                    <svg class="icon-play" aria-hidden="true">
                        <use xlink:href="#icon-play1"></use>
                    </svg>
                </a>
             </li>    
                `)
                $('#lastestMusic').append($li)
            })
        })
        $('#loading').remove()
    }, 1000);
    $('.siteNav').on('click', 'ol.nav>li', (e) => {
        let $currentNav = $(e.currentTarget)
        $currentNav.addClass("active").siblings().removeClass("active")
        let index = $currentNav.index()
        $('.tabContent>li').eq(index).addClass("active").siblings().removeClass("active")
        $currentNav.trigger('tabChange', index)
    })

    $('.siteNav').on('tabChange', (e, index) => {
        if (index === 1) {
            if (!hasLoad) {
                $.get('./page2.json').then((response) => {
                    let items = response
                    items.forEach((element, index) => {
                        let $li = $(`
                    <li class=”hot-list-item“>
                    <a href="./song.html?id=${element.id}">
                        <div class="order-number">
                            0${index + 1}
                        </div>
                        <div class="song-name">
                            <h3>${element.name}</h3>
                            <p>
                                <svg class="icon-sq" aria-hidden="true">
                                    <use xlink:href="#icon-sq"></use>
                                </svg>
                                ${element.singer}</p>
                            <svg class="icon-play" aria-hidden="true">
                                <use xlink:href="#icon-play1"></use>
                            </svg>
                        </div>
                    </a>
                </li>
                    `)
                        $('#hot-song-lists').append($li)
                        for(num=0;num<3;num++){
                            $('.order-number').eq(num).css("color","red");
                        }
                 })
                })
                hasLoad=true;
            }
        } else if (index === 2) {
            $.get('./page3.json').then((response) => {
                console.log("来到了第三页")
            })
        }
    })
    let timer
    $('input#searchSong').on("input", (e) => {
        $("#output").empty()
        let $input = $(e.currentTarget)
        let inputContent = $input.val().trim()
        if (!inputContent) { return }
        let searchContent = `
            <div class="search-content ">
                搜索“${inputContent}”
            </div>       
        `
        $("#output").append(searchContent)
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            search(inputContent).then((res) => {
                console.log(res)
                timer = undefined
                let song = res
                if (res.length !== 0) {
                    for (var i = 0; i < res.length; i++) {
                        let li = `
                        <li data-id="${song[i].id}" class="result">
                         <a href='./song.html?id=${song[i].id}'>
                            ${song[i].name} 
                         </a>
                        <li>
                    `
                        $("#output").append(li)
                    }
                } else {
                    //$("#output").text("没有结果")
                }
            })
        }, 1000)
    })

    function search(keyword) {
        return new Promise((resolve, reject) => {
            var database = [
                {
                    "id": 1,
                    "name": "我",
                },
                {
                    "id": 2,
                    "name": "那些花儿",
                },
                {
                    "id": 3,
                    "name": "追光者",
                },
                {
                    "id": 4,
                    "name": "匿名的好友",
                },
                {
                    "id": 5,
                    "name": "那些年",
                }
            ]
            let result = database.filter((item) => {
                return item.name.indexOf(keyword) >= 0
            })
            setTimeout(() => {
                resolve(result)
            }, (Math.random() * 200 + 500))
        })
    }
})