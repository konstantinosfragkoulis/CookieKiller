const denyText = ['Reject', 'Decline', 'Deny', 'Only essential', 'Decline optional', 'Decline optional cookies', 'Do not consent']
const denyButton = ['reject-all-btn', 'reject-all-button', 'W0wltc', 'onetrust-reject-all-handler', 'btn-reject', 'do-not-consent']
const moreOptionsText = ['More Options']
const moreOptionsButton = ['more-options-btn', 'more-options-button']
const popupText = ['Not now']
const popupButton = ['onesignal-slidedown-cancel-button', 'cleverpush-confirm-btn-deny']

function clickDenyButton(): Boolean {
    var flag: Boolean = false
    const buttons = Array.from(document.querySelectorAll('button, a, div, span, [role="button"]')).sort((a, b) => {
        const aText = a.textContent?.trim() || ''
        const bText = b.textContent?.trim() || ''
        return aText.length - bText.length
    })
    for(const btn of buttons) {
        const tagName = btn.tagName.toLowerCase()
        if(tagName === 'div' || tagName === 'span') {
            const style = window.getComputedStyle(btn)
            if((style.cursor !== 'pointer' && !btn.hasAttribute('onclick')) || !btn.textContent) {
                continue
            }
        }

        const text = btn.textContent?.trim().toLowerCase()
        if(text && denyText.some(deny => text.includes(deny.toLowerCase()))) {
            console.log("Clicking deny button: ", text)
            ;(btn as HTMLElement).click()
            flag = true
        }
        if(denyButton.some(deny => btn.id.toString().includes(deny.toLowerCase()))) {
            console.log('Clicking deny button: ', btn.id.toString())
            ;(btn as HTMLElement).click()
            flag = true
        }
    }
    return flag
}

function clickMoreOptionsButton(): Boolean {
    var flag: Boolean = false
    const buttons = Array.from(document.querySelectorAll('button, a, div, span, [role="button"]')).sort((a, b) => {
        const aText = a.textContent?.trim() || ''
        const bText = b.textContent?.trim() || ''
        return aText.length - bText.length
    })
    for(const btn of buttons) {
        const tagName = btn.tagName.toLowerCase()
        if(tagName === 'div' || tagName === 'span') {
            const style = window.getComputedStyle(btn)
            if(style.cursor !== 'pointer' && !btn.hasAttribute('onclick')) {
                continue
            }
        }
        
        const text = btn.textContent?.trim().toLowerCase()
        if(text && moreOptionsText.some(moreOptions => text.includes(moreOptions.toLowerCase()))) {
            console.log('Clicking more options button: ', text)
            ;(btn as HTMLElement).click()
            flag = true
        }
        if(moreOptionsButton.some(moreOptions => btn.id.toString().includes(moreOptions.toLowerCase()))) {
            console.log('Clicking more options button: ', btn.id.toString())
            ;(btn as HTMLElement).click()
            flag = true
        }
    }
    return flag
}

function hidePopups(): Boolean {
    var flag: Boolean = false
    const buttons = Array.from(document.querySelectorAll('button, a, div')).sort((a, b) => {
        const aText = a.textContent?.trim() || ''
        const bText = b.textContent?.trim() || ''
        return aText.length - bText.length
    })
    for(const btn of buttons) {
        const text = btn.textContent?.trim().toLowerCase()
        if(text && popupText.some(popup => text.includes(popup.toLowerCase()))) {
            console.log("Clicking popup button: ", text)
            ;(btn as HTMLElement).click()
            flag = true
        }
        if(popupButton.some(popup => btn.id.toString().includes(popup.toLowerCase()))) {
            console.log('Clicking popup button: ', btn.id.toString())
            ;(btn as HTMLElement).click()
            flag = true
        }
    }
    return flag
}

let tries = 0
const maxTries = 5
const interval = setInterval(() => {
    console.log("Try ", tries)
    tries++;
    var deny: Boolean = clickDenyButton()
    var moreOptions: Boolean
    if(!deny) {
        moreOptions = clickMoreOptionsButton()
        if(moreOptions) deny = clickDenyButton()
    }
    hidePopups()
    
    if(deny || tries >= maxTries) clearInterval(interval)
}, 1000)