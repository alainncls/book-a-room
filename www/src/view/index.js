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
            <a href="/" class="btn btn-link">All Rooms</a>
            <a href="/bookings" class="btn btn-link">My Bookings</a>
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
                const classIsBooked = isBooked ? 'disabled' : 'enabled';
                return html`
                    <button class="hour ${classIsBooked}" ${classIsBooked} data-isbooked=${isBooked} data-roomid=${room.id} data-hour=${hour} @click=${bookingHandler}>${hour}:00</button>`
            });
            return html`
                <tr>
                    <td>Room #${room.id + 1}</td>
                    <td>${planningDisplay}</td>
                </tr>`
        }
    )

    return html`
        <h2>All Rooms</h2>
        <table>
            <thead>
            <tr>
                <th>Room name</th>
                <th colspan="24">Hours</th>
            </tr>
            </thead>
            <tbody>
            ${roomsDisplay}
            </tbody>
        </table>
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
                    <button class="cancel" data-roomid=${booking.roomId} data-hour=${booking.hour} @click=${cancelBookingHandler}>Cancel ?</button>
                </li>`
        }
    )

    return html`
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
