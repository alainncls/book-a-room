import page from 'page'

import EtherProvider from './config/EtherProvider'

import ContractFactory from './config/ContractFactory'

import {render} from 'lit-html'
import {footer, header, layout, viewLoading, viewNotFound,} from './view'

// bind app
const wrapper = document.querySelector('#app')

const displayLoading = () => {
        render(layout(header(), viewLoading(), footer()), wrapper)
    }

//bootstrap
;(async function () {
    displayLoading()

    //provider
    const provider = new EtherProvider()
    const etherSigner = provider.getSigner()
    const account = await provider.getAccount()
    //factory
    const contractFactory = new ContractFactory(etherSigner)
    // services

    // homepage
    page('/', async function () {
        displayLoading()
        render(layout(header(), '', footer()), wrapper)
    })
    // not found
    page('*', function () {
        render(layout(header(), viewNotFound(), footer()), wrapper)
    })
    // int router
    page({hashbang: true})
})()
