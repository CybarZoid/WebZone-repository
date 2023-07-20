import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
//   console.log(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const textAreaEl = document.getElementById(`tweet-input`)
const postEl = document.getElementById(`btn-post`)
const isEmpty = true

postEl.addEventListener(`click`, () => {
    if (textAreaEl.value !== ``) {
        tweetsData.unshift({
            handle: `@CyberZoid`,
            profilePic: `N/A`,
            likes: 0,
            retweets: 0,
            tweetText: textAreaEl.value,
            bookmarks: 0,
            isLiked: false,
            isRetweeted: false,
            isBookmarked: false,
            uuid: uuidv4()
        })
        getFeedHtml()
        textAreaEl.value = ``
        render()
    }
})

function getFeedHtml() {
    let feedHtml = ``

    tweetsData.forEach((tweet) => {
        let heartClass = ``

        let retweetClass = ``

        let bookmarkClass = ``

        if (tweet.isLiked) {
            heartClass = `liked`
        }

        if (tweet.isRetweeted) {
            retweetClass = `retweeted`
        }

        if (tweet.isBookmarked) {
            bookmarkClass = `bookmarked`
        }

        feedHtml += `
        <section class="post flow">
                <p class="handle">${tweet.handle}</p>
                <p>${tweet.tweetText}</p>
                <div class="btns">
                    <span class="likes">
                        <i class="icon heart ${heartClass}" data-heart="${tweet.uuid}"></i>
                        <p>${tweet.likes}</p>
                    </span>
                    <span class="retweets">
                        <i class="icon retweet ${retweetClass}" data-retweet="${tweet.uuid}"></i>
                        <p>${tweet.retweets}</p>
                    </span>
                    <span class="bookmarks">
                        <i class="icon bookmark ${bookmarkClass}" data-bookmark="${tweet.uuid}"></i>
                        <p>${tweet.bookmarks}</p>
                    </span>
                </div>
        </section>
        `
    })

    return feedHtml
}


document.addEventListener(`click`, (e) => {
    if (e.target.dataset.heart) {
        handleLikeClick(e.target.dataset.heart)
    } else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    } else if (e.target.dataset.bookmark) {
        handleBookmarkClick(e.target.dataset.bookmark)
    }
})

function handleLikeClick(postId) {
    const targetPostObj = tweetsData.filter((post) => {
        return post.uuid === postId
    })[0]

    if (targetPostObj.isLiked) {
        targetPostObj.likes--
    } else {
        targetPostObj.likes++
    }

    targetPostObj.isLiked = !targetPostObj.isLiked

    render()
}

function handleRetweetClick(postId) {
    const targetPostObj = tweetsData.filter((post) => {
        return post.uuid === postId 
    })[0]

    if (targetPostObj.isRetweeted) {
        targetPostObj.retweets--
    } else {
        targetPostObj.retweets++
    }

    targetPostObj.isRetweeted = !targetPostObj.isRetweeted

    render()
}

function handleBookmarkClick(postId) {
    const targetPostObj = tweetsData.filter((post) => {
        return post.uuid === postId
    })[0]
    
    if (targetPostObj.isBookmarked) {
        targetPostObj.bookmarks--
    } else {
        targetPostObj.bookmarks++
    }

    targetPostObj.isBookmarked = !targetPostObj.isBookmarked

    render()
}

function render() {
    document.getElementById("feed").innerHTML = getFeedHtml()
}

render()