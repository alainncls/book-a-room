import {html} from 'lit-html'
import page from 'page'
// notifications
import Noty from 'noty'
import 'noty/lib/noty.css'
import 'noty/lib/themes/light.css'

// bind app
const layout = (header, content, footer) => html`<div class="">
    <div class="header">${header}</div>
    <div class="container">${content}</div>
    <div class="footer">${footer}</div>
</div>`

const header = () => html` <header class="navbar">
    <section class="navbar-center">
        <a href="/" class="btn btn-link sitename">Book A Room</a>
    </section>
</header>`
const footer = () => html` <footer class="text-center">
    <div>
        Book A Room built and designed with
        <span class="text-error">♥</span> by Alain Nicolas
    </div>
</footer>`

// views
const viewLoading = () => html`<div class="loading loading-lg"></div>`

const viewNotFound = () => html`<div>Not found !</div>`


export {
    layout,
    header,
    footer,
    viewLoading,
    viewNotFound,
}
