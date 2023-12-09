/**
 * イベント管理
 */
const handler = (() => {
    const events = {}
    return {
        addListener (target, type, listener, capture) {
            target.addEventListener(type, listener, capture)
            // console.log('addListener: ');
        },
        removeListener (k) {
            let e
            if (k in events) {
                // console.log('removeListener: '+k);
                e = events[k]
                e.target.removeEventListener(e.type, e.listener, e.capture)
            }
        }
    }
})()

/**
 * ボタン定義
 */
const btns = [
    {
        id: '_addInfoText',
        left: true,
        label: 'メッセージに[info][/info]を追加します',
        iconCls: 'btnWarning',
        iconNoLg: true,
        html: 'info',
        innerStyle: {
            fontSize: '10px',
            borderRadius: '2px',
            padding: '2px 4px',
            position: 'relative',
            top: '-1px',
            left: '-1px'
        },
        params: {
            action: 'info',
            addEndTag: true
        }
    }, {
        id: '_addInfoWithTitleText',
        left: true,
        label: 'メッセージに[title][/title]を追加します',
        iconCls: 'btnDanger',
        iconNoLg: true,
        html: 'title',
        innerStyle: {
            fontSize: '10px',
            borderRadius: '2px',
            padding: '2px 4px',
            position: 'relative',
            top: '-1px',
            left: '-1px'
        },
        params: {
            action: 'title',
            addEndTag: true
        }
    }, {
        id: '_addCodeText',
        left: true,
        label: 'メッセージに[code][/code]を追加します',
        iconCls: 'btnSuccess',
        iconNoLg: true,
        html: 'code',
        innerStyle: {
            fontSize: '10px',
            borderRadius: '2px',
            padding: '2px 4px',
            position: 'relative',
            top: '-1px',
            left: '-1px'
        },
        params: {
            action: 'code',
            addEndTag: true
        }
    },
    {
        id: '_addHrText',
        left: true,
        label: 'メッセージに[hr]を追加します',
        iconCls: 'btnPrimary',
        iconNoLg: true,
        html: 'hr',
        innerStyle: {
            fontSize: '10px',
            borderRadius: '2px',
            padding: '2px 4px',
            position: 'relative',
            top: '-1px',
            left: '-1px'
        },
        params: {
            action: 'hr',
            addEndTag: true
        }
    }
]

/**
 * メイン処理
 */
const app = {
    // ボタン
    buttons: [],

    /**
     * チャット入力エリア
     */
    getInputArea () {
        return document.getElementById('_chatText')
    },

    /**
     * チャット画面かどうか
     */
    isChat () {
        return !!document.getElementById('_chatSendArea')
    },

    /**
     * 初期化
     */
    init () {
        const me = this
        let cnt = 100,
        loadedFn = () => {
            // console.log('load check');
            if (me.isChat()) {
                // console.log('loaded');
                clearInterval(checkLoaded)

                // ボタン生成
                me.createButtons()

                // ボタン設置
                me.insert()

                const observer = new MutationObserver((list) => {
                    // console.log(list);
                    for (let mutation of list) {
                        if (
                            mutation.type === 'childList' &&
                            mutation.addedNodes.length
                        ) {
                            me.insert()
                            //// console.log('A child node has been added or removed.');
                            break
                        }
                    }
                })

                observer.observe(
                    document.getElementById('_chatSendArea'),
                    {
                        attributes: false,
                        childList: true,
                        characterData: false
                    }
                )
            }
            if (!--cnt) {
                // console.log('timeout');
                clearInterval(checkLoaded)
            }
        }
        const checkLoaded = setInterval(loadedFn, 100)
    },

    /**
     * ボタン挿入
     */
    insert () {
        // console.log('insert');
        const me = this,
            wrapRightEl = document.createElement('ul'),
            wrapLeftEl = document.getElementById('_file').closest('ul')
            // parentRightEl = document.getElementById('_chatSendArea').querySelector('ul + div'),
            // tooltipEl = document.querySelector('.messageTooltip__text')

        //if (
            // !document.getElementById('_myStatusButton') ||
            // !!document.getElementById('_addInfoText')
            //!document.getElementById('message-input-area')
        //) {
            //console.log('insert false');
            //return false
        //}
        // console.log('insert exec');

        // if (parentRightEl) {
        //    wrapRightEl.style.display = 'flex'
        //    parentRightEl.prepend(wrapRightEl)
        // }
        // if (tooltipEl) { tooltipEl.style.whiteSpace = 'pre' }

        me.buttons.forEach((btn, key) => {
            const o = btns[key]
            //if (o.left) {
                wrapLeftEl.appendChild(btn)
            ///} 
            //else if (parentRightEl) {
               // wrapRightEl.appendChild(btn)
            //}
        })

        // キーボードイベントハンドラ設定
        // me.setKeyboardEvent()
    },

    /**
     * ボタン定義からボタン生成
     */
    createButtons () {
        const me = this

        btns.forEach(o => {
            let btn, k
            btn = me.createButton(o)
            // if (o.params) {
                k = handler.addListener(btn, 'click', () => {
                    document.getElementById(o.id).blur()
                    me.clickAction(o.params)
                })
            // } 
            //else {
            //    k = handler.addListener(btn, 'click', () => {
            //        document.getElementById(o.id).blur()
            //        o.fn()
            //    })
            // }
            me.buttons.push(btn)
            // me.btnEventKeys.push(k)
        })
    },

    /**
     * ボタン生成（テキスト装飾）
     */
    createButton (args) {
        const li = document.createElement('li'),
            btn = document.createElement('button'),
            inner = document.createElement(args.src ? 'img' : 'span')

        btn.appendChild(inner)
        li.appendChild(btn)

        li.style.marginRight = '2px'

        btn.id = args.id
        btn.setAttribute('role', 'button')
        btn.setAttribute('aria-label', args.label)
        btn.classList.add('_showDescription', 'chatInput__emoticon', 'dmLRfL', 'bPTIFV', '_CWIcon')
        //btn.style.display = 'inline-block'
        btn.style.border = 'none'
        btn.style.backgroundColor = 'transparent'
        // btn.style.cursor = 'pointer'

        //if (args.src) {
        //    inner.classList.add('ui_emoticon')
        //    inner.style.height = '15px'
        //    inner.style.width = '15px'
        //    inner.style.paddingBottom = '4px'
        //    inner.src = args.src || ''
        //    inner.alt = args.alt || ''
        //} else {
            inner.classList.add(args.iconCls || null)
            inner.style.paddingBottom = '4px'
            inner.textContent = args.html || ''
        //}

        // スタイルを調整
        if (!!args.innerStyle) {
            for (let property in args.innerStyle) {
                if (args.innerStyle.hasOwnProperty(property)) {
                    inner.style[property] = args.innerStyle[property]
                }
            }
        }
        return li
    },

    /**
     * クリック時処理
     */
    clickAction (args) {
        const me = this,
            el = me.getInputArea(),
            action = args.action || 'info',
            startTag = args.startTag || '[' + action + ']',
            endTag = !!args.addEndTag ? '[/' + action + ']' : '',
            beforeText = el.value,
            start = el.selectionStart,
            end = el.selectionEnd

        let titleTag = '', titleText = '',
            cursor = start, selectText = ''

        if (args.addTitle) {
            if (!(titleText = prompt('タイトルを入力', ''))) {
                return false
            }
            titleTag = ''.concat(
                '[title]',
                    titleText,
                '[/title]'
            )
        }

        if (start !== end) {
            selectText = beforeText.substr(start, end - start)
            cursor = end + endTag.length
        }
        cursor += startTag.length + titleTag.length

        setTimeout(() => {
            el.value = ''.concat(
                beforeText.substr(0, start),
                startTag,
                titleTag,
                selectText,
                endTag,
                beforeText.substr(end)
            )

            el.setSelectionRange(cursor, cursor)
            el.focus()
        }, 1)
    }
}

window.addEventListener('load', () => {
    // console.log('load');
    app.init()
}, {
  once: true,
  passive: false,
  capture: false
})
