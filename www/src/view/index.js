import {html} from 'lit-html'

// bind app
const layout = (header, content, footer) => html`
    <div class="">
        <div class="header">${header}</div>
        <div class="container">${content}</div>
        <div class="footer">${footer}</div>
    </div>`

const header = () => html`
    <header class="navbar">
        <section class="navbar-center">
            <a href="/" class="btn btn-link sitename">Book A Room</a>
        </section>
    </header>`

const footer = () => html`
    <footer class="text-center">
        <div>
            Book A Room built and designed with
            <span class="text-error">♥</span> by <a href="https://alainnicolas.fr" target="_blank">Alain Nicolas</a>
        </div>
    </footer>`

// views
const viewLoading = () => html`
    <div class="loading loading-lg"></div>`

const viewNotFound = () => html`
    <div>Not found !</div>`

const viewRooms = (rooms, bookARoom) => {
    const bookingHandler = {
        async handleEvent(e) {
            e.preventDefault()
            const requestedBooking = e.target
            const isBooked = requestedBooking.dataset.isbooked

            if (isBooked === 'false') {
                const roomId = requestedBooking.dataset.roomid
                const hour = requestedBooking.dataset.hour
                bookARoom.bookARoom(roomId, hour)
            }
        },
    }

    const roomsDisplay = rooms.map((room) => {
            const planningDisplay = room.planning.map((booker, hour) => {
                const isBooked = booker !== '0x0000000000000000000000000000000000000000'
                const color = isBooked ? 'red' : 'green';
                return html`
                    <button data-isbooked=${isBooked} data-roomid=${room.id} data-hour=${hour} @click=${bookingHandler} style="background-color:${color}">${hour}:00</button>`
            });
            return html`
                <li>Room #${room.id + 1}: ${planningDisplay}</li>`
        }
    )

    return html`
        <a href="bookings" class="btn btn-primary">
            My Bookings
        </a>
        <h2>Rooms</h2>
        <ul>
            ${roomsDisplay}
        </ul>
    `
}

const viewBookings = (bookings, cancelBooking) => {
    const cancelBookingHandler = {
        async handleEvent(e) {
            e.preventDefault()
            const requestedCancelBooking = e.target
            const roomId = requestedCancelBooking.dataset.roomid
            const hour = requestedCancelBooking.dataset.hour
            cancelBooking.cancelBooking(roomId, hour)
        },
    }

    const bookingsDisplay = bookings.map((booking) => {
            return html`
                <li>
                    Room #${booking.roomId + 1} @${booking.hour}:00
                    <button data-roomid=${booking.roomId} data-hour=${booking.hour} @click=${cancelBookingHandler}>Cancel ?</button>
                </li>`
        }
    )

    return html`
        <a href="/" class="btn btn-primary">
            All Rooms
        </a>
        <h2>My bookings</h2>
        <ul>
            ${bookingsDisplay}
        </ul>
    `
}

export {
    layout,
    header,
    footer,
    viewLoading,
    viewNotFound,
    viewRooms,
    viewBookings,
}
