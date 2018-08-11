$(function () {
    var hasLoad=false;
    if (!hasLoad) {
        $.get('./page2.json').then((response) => {
            let items = response
            items.forEach((element, index) => {
                let $li = $(`
            <li>
            <a href="./song.html?id=${element.id}">
                <div class="order-number">
                    ${index + 1}
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
         })
        })
        hasLoad=true;
    }
})