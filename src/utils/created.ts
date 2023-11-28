export const create = (() => {
    var s = document.createElement('script')
    s.setAttribute('type', "text/javascript")
    s.setAttribute('src', window.location.origin + "/tinymce/tinymce.js")
    document.head.appendChild(s)
    return {  }
})