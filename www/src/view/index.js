import {html} from 'lit-html'
import page from 'page'
import Noty from 'noty'

// bind app
const layout = (head, content, foot) => html`
    <div class="">
        <div class="header">${head}</div>
        <div class="container">${content}</div>
        <div class="footer">${foot}</div>
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

const viewRooms = (rooms, bookARoomService) => {
    const bookCallback = (roomName, hour) => {
        new Noty({
            theme: 'light',
            type: 'success',
            layout: 'topRight',
            text: `${roomName} was booked at ${hour}:00`
        }).show();
        page('/')
    }

    const bookingHandler = {
        async handleEvent(e) {
            e.preventDefault()
            const requestedBooking = e.target
            const isBooked = requestedBooking.dataset.isbooked

            if (isBooked === 'false') {
                const roomId = requestedBooking.dataset.roomid
                const hour = requestedBooking.dataset.hour
                await bookARoomService.bookARoom(roomId, hour, bookCallback)
            }
        },
    }

    const roomsDisplay = rooms.map((room) => {
            const planningDisplay = room.planning.map((booker, hour) => {
                const isBooked = booker !== '0x0000000000000000000000000000000000000000'
                const classIsBooked = isBooked ? 'disabled' : 'enabled';
                return html`
                    <button class="hour ${classIsBooked}" ${classIsBooked} data-isbooked=${isBooked} data-roomid=${room.id}
                            data-hour=${hour} @click=${bookingHandler}>${hour}:00
                    </button>`
            });
            return html`
                <tr>
                    <td><a href="/room/${room.id}">${room.name}</a></td>
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

const viewBookings = (bookings, bookARoomService) => {
    const cancelCallback = (roomName, hour) => {
        new Noty({
            theme: 'light',
            type: 'warning',
            layout: 'topRight',
            text: `Booking for ${roomName} at ${hour}:00 was cancelled`
        }).show();
        page('/bookings')
    }

    const cancelBookingHandler = {
        async handleEvent(e) {
            e.preventDefault()
            const requestedCancelBooking = e.target
            const roomId = requestedCancelBooking.dataset.roomid
            const hour = requestedCancelBooking.dataset.hour
            await bookARoomService.cancelBooking(roomId, hour, cancelCallback)
        },
    }

    const bookingsDisplay = bookings.map((booking) => {
            return html`
                <li>
                    Room #${booking.roomId + 1} @${booking.hour}:00
                    <button class="cancel" data-roomid=${booking.roomId} data-hour=${booking.hour}
                            @click=${cancelBookingHandler}>Cancel ?
                    </button>
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

const viewRoom = (room, bookARoomService) => {
    const renameCallback = (roomName) => {
        new Noty({
            theme: 'light',
            type: 'success',
            layout: 'topRight',
            text: `Room was successfully renamed to ${roomName}`
        }).show();
        page(`/room/${room.id}`)
    }

    const renameRoomHandler = {
        async handleEvent(e) {
            e.preventDefault()
            const form = document.getElementById('name-room-form')
            const newNameInput = form.querySelector('[name="name"]')
            await bookARoomService.nameRoom(room.id, newNameInput.value, renameCallback)
        },
    }

    return html`
        <h2>Room: ${room.name}</h2>
        <form id="name-room-form">
            <div class="options">
                <div class="form-group">
                    <label class="form-label" for="name">
                        <input name="name" class="form-input" type="text" id="name" placeholder="Name"/>
                    </label>
                </div>
            </div>
            <button class="btn btn-primary" @click=${renameRoomHandler}>Rename this room</button>
        </form>`
}

export {
    layout,
    header,
    footer,
    viewLoading,
    viewNotFound,
    viewRooms,
    viewRoom,
    viewBookings,
}
