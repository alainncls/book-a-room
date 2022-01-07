import page from 'page'

import EtherProvider from './config/EtherProvider'

import ContractFactory from './config/ContractFactory'

import GetPlanning from "./service/GetPlanning";
import GetRooms from "./service/GetRooms";
import BookARoom from "./service/BookARoom";
import CancelBooking from "./service/CancelBooking";

import {render} from 'lit-html'
import {footer, header, layout, viewBookings, viewLoading, viewNotFound, viewRooms} from './view'

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
    const getPlanning = new GetPlanning(contractFactory)
    const bookARoom = new BookARoom(contractFactory)
    const cancelBooking = new CancelBooking(contractFactory)
    const rooms = new GetRooms(getPlanning)

    // Homepage
    page('/', async function () {
        displayLoading()
        const cocaRooms = await rooms.getCocaRooms()
        const pepsiRooms = await rooms.getPepsiRooms()
        const allRooms = [...cocaRooms, ...pepsiRooms]
        const view = viewRooms(allRooms, bookARoom)
        render(layout(header(), view, footer()), wrapper)
    })

    // My Bookings
    page('/bookings', async function () {
        displayLoading()
        const cocaRooms = await rooms.getCocaRooms()
        const pepsiRooms = await rooms.getPepsiRooms()
        const allRooms = [...cocaRooms, ...pepsiRooms]
        const bookings = allRooms
            .map(room => room.planning.map((booker, hour) => {
                if (booker === account) {
                    return {roomId: room.id, hour}
                }
            }))
            .flat()
            .filter(booking => booking)
        const view = viewBookings(bookings, cancelBooking)
        render(layout(header(), view, footer()), wrapper)
    })

    // not found
    page('*', function () {
        render(layout(header(), viewNotFound(), footer()), wrapper)
    })

    // int router
    page({hashbang: true})
})()
