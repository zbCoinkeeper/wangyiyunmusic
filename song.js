$(function () {
    let id = parseInt(location.search.match(/\bid=([^&]*)/)[1])
    let url
    $.get('./songs.json').then(function (response) {
        console.log(response)
        let songs = response
        let song = songs.filter(s => s.id === id)[0]  //返回数组第一个，但其实数组就一个
        let { url, name, lyric } = song
        initPlayer(url);
        initText(name, lyric);
    })

    function initPlayer(url) {
        let audio = document.createElement("audio")
        audio.src = url
        audio.oncanplay = function () {
            audio.play();
            $(".disc-container").addClass("playing")
        }
        $('.icon-pause').on('click', function () {
            audio.pause();
            $('.disc-container').removeClass('playing')
        })
        $('.icon-play').on('click', function () {
            audio.play();
            $('.disc-container').addClass('playing')
        })

        setInterval(() => {
            let $whichLine
            let seconds = audio.currentTime;
            let munites = ~~(seconds / 60);
            let left = seconds - munites * 60
            let time = `${pad(munites)}:${pad(left)}`
            console.log(time);
            let $lines = $('.lines>p')
            for (let i = 0; i < $lines.length; i++) {
                let currentLineTime = $lines.eq(i).attr("data-time")
                let nextLineTime = $lines.eq(i + 1).attr("data-time")
                if ($lines.eq(i + 1).length !== 0 && currentLineTime <= time && time <= nextLineTime) {
                    $whichLine = $lines.eq(i)
                    break
                } else if ($lines.eq(i + 1).length === 0 && time >= currentLineTime) {
                    $whichLine = $lines.eq(i)
                }
            }
            if ($whichLine) {
                $whichLine.addClass('active').prev().removeClass();
                let currentLineTop=$whichLine.offset().top
                let linesTop=$('.lines').offset().top
                let delta=currentLineTop-linesTop-$('.lines>p').height()
                $('.lines').css('transform',`translateY(-${delta}px)`)
            }
        }, 100)

    }

    function pad(number) {
        return number > 10 ? number : '0' + number
    }

    function initText(name, lyric) {
        let $name = $(".song-description>h1")
        $name.text(name)
        let lyricArray = lyric.split("\n")
        let regex = /^\[(.+)\](.*)$/
        lyricArray = lyricArray.map(function (item, index) {
            let matches = item.match(regex)
            if (matches) {
                return {
                    time: matches[1],
                    words: matches[2],
                }
            }
        })
        let $lyric = $('.lyric')
        lyricArray.map(function (object) {
            if (!object) { return }
            let $p = $('<p>')
            $p.attr('data-time', object.time).text(object.words)
            $p.appendTo($lyric.children(".lines"))
        })
    }
})    
