import page from 'page'

import EtherProvider from './config/EtherProvider'

import ContractFactory from './config/ContractFactory'

import BookARoomService from "./service/BookARoomService";

import {render} from 'lit-html'
import {footer, header, layout, viewAddRoom, viewBookings, viewLoading, viewNotFound, viewRoom, viewRooms} from './view'
// notifications
import 'noty/lib/noty.css'
import 'noty/lib/themes/light.css'

// bind app
const wrapper = document.querySelector('#app')

const displayLoading = () => {
        render(layout(header(), viewLoading(), footer()), wrapper)
    }

// bootstrap
;(async function () {
    displayLoading()

    // provider
    const provider = new EtherProvider()
    const etherSigner = provider.getSigner()
    const account = await provider.getAccount()
    // factory
    const contractFactory = new ContractFactory(etherSigner)
    // services
    const bookARoomService = new BookARoomService(contractFactory)

    // Homepage
    page('/', async function () {
        displayLoading()
        const view = viewRooms(await bookARoomService.getAllRooms(), bookARoomService)
        render(layout(header(), view, footer()), wrapper)
    })

    // My Bookings
    page('/bookings', async function () {
        displayLoading()
        const view = viewBookings(await bookARoomService.getBookings(account), bookARoomService)
        render(layout(header(), view, footer()), wrapper)
    })

    // Add room
    page('/rooms/new', async function () {
        displayLoading()
        const isOwner = (await bookARoomService.getOwner()) === account
        const view = viewAddRoom(bookARoomService, isOwner)
        render(layout(header(), view, footer()), wrapper)
    })

    // Room
    page('/rooms/:roomId', async function (ctx) {
        displayLoading()
        const roomId = ctx.params.roomId
        const room = await bookARoomService.getRoom(roomId)
        const isOwner = (await bookARoomService.getOwner()) === account
        const view = viewRoom(room, bookARoomService, isOwner)
        render(layout(header(), view, footer()), wrapper)
    })

    // not found
    page('*', function () {
        render(layout(header(), viewNotFound(), footer()), wrapper)
    })

    // int router
    page({hashbang: true})
})()
