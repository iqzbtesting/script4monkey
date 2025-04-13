// ==UserScript==
// @name         OP UNBOXING Loader
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Loader for the script yuhh
// @author       IQZB
// @match        https://cubecollector.net/*
// @grant        none
// ==/UserScript==

(function () {
    const panel = document.createElement('div')
    panel.style.position = 'fixed'
    panel.style.top = '50%'
    panel.style.left = '50%'
    panel.style.transform = 'translate(-50%, -50%)'
    panel.style.width = '260px'
    panel.style.padding = '16px'
    panel.style.background = `
        url(https://cubecollector.net/BGS/newnavbg.png) repeat,
        linear-gradient(90deg, var(--backgroundcolor, #0f0f0f) 40%, rgba(5, 5, 5, 0.7) 100%)`
    panel.style.backgroundBlendMode = 'multiply'
    panel.style.opacity = '0.95'
    panel.style.border = '2px solid #1e1e1e'
    panel.style.borderRadius = '12px'
    panel.style.zIndex = '999999'
    panel.style.boxShadow = '0 0 12px rgba(0,0,0,0.6)'
    panel.style.fontFamily = 'sans-serif'
    panel.style.userSelect = 'none'
    panel.style.color = '#c2c2c2'
    panel.style.textAlign = 'center'
    panel.style.cursor = 'move'

    const title = document.createElement('div')
    title.innerText = 'Enter Script Key'
    title.style.marginBottom = '12px'
    title.style.fontSize = '16px'
    title.style.fontWeight = '600'

    const input = document.createElement('input')
    input.placeholder = 'Your access key'
        input.style.width = '100%'
    input.style.padding = '7px 0'
    input.style.marginBottom = '5px'
    input.style.borderRadius = '6px'
    input.style.border = '1px solid #333'
    input.style.background = '#1a1a1a'
    input.style.color = '#ccc'
    input.style.textAlign = 'center'
    input.style.fontWeight = '500'


    const btn = document.createElement('button')
    btn.innerText = 'Unlock'
    btn.style.width = '100%'
    btn.style.padding = '8px 0'
    btn.style.border = '1px solid #333'
    btn.style.borderRadius = '6px'
    btn.style.background = '#1a1a1a'
    btn.style.cursor = 'pointer'
    btn.style.color = '#c2c2c2'
    btn.style.fontWeight = '500'

    const status = document.createElement('div')
    status.style.marginTop = '8px'
    status.style.fontSize = '13px'
    status.style.color = '#ff6666'

    let isDragging = false
    let offsetX, offsetY

    panel.addEventListener('mousedown', e => {
        isDragging = true
        offsetX = e.clientX - panel.getBoundingClientRect().left
        offsetY = e.clientY - panel.getBoundingClientRect().top
    })
    document.addEventListener('mousemove', e => {
        if (isDragging) {
            panel.style.left = `${e.clientX - offsetX}px`
            panel.style.top = `${e.clientY - offsetY}px`
        }
    })
    document.addEventListener('mouseup', () => {
        isDragging = false
    })

    btn.onclick = async () => {
        const key = input.value.trim()
        if (!key) return status.textContent = 'Please enter your key.'
        status.textContent = 'Validating...'

        try {
            const res = await fetch(`https://cc-loader.onrender.com/load?key=${encodeURIComponent(key)}`)
            if (!res.ok) throw new Error('Invalid key or server error.')

            const payload = await res.text()

            new Function(payload)() 
            panel.remove()
        } catch (err) {
            status.textContent = 'Failed: ' + err.message
        }
    }

    panel.appendChild(title)
    panel.appendChild(input)
    panel.appendChild(btn)
    panel.appendChild(status)
    document.body.appendChild(panel)
})()
