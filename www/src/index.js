import page from 'page'

import EtherProvider from './config/EtherProvider'

import ContractFactory from './config/ContractFactory'

import BookARoomService from "./service/BookARoomService";

import {render} from 'lit-html'
import {footer, header, layout, viewBookings, viewLoading, viewNotFound, viewRooms} from './view'
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
        const cocaRooms = await bookARoomService.getCocaRooms()
        const pepsiRooms = await bookARoomService.getPepsiRooms()
        const allRooms = [...cocaRooms, ...pepsiRooms]
        const view = viewRooms(allRooms, bookARoomService)
        render(layout(header(), view, footer()), wrapper)
    })

    // My Bookings
    page('/bookings', async function () {
        displayLoading()
        const cocaRooms = await bookARoomService.getCocaRooms()
        const pepsiRooms = await bookARoomService.getPepsiRooms()
        const allRooms = [...cocaRooms, ...pepsiRooms]
        const bookings = allRooms
            .map(room => room.planning.map((booker, hour) => {
                if (booker === account) {
                    return {roomId: room.id, hour}
                }
            }))
            .flat()
            .filter(booking => booking)
        const view = viewBookings(bookings, bookARoomService)
        render(layout(header(), view, footer()), wrapper)
    })

    // not found
    page('*', function () {
        render(layout(header(), viewNotFound(), footer()), wrapper)
    })

    // int router
    page({hashbang: true})
})()
