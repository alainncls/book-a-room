const BookARoom = artifacts.require('BookARoom')

module.exports = async function (deployer) {
    await deployer.deploy(BookARoom)
    const bookARoom = await BookARoom.deployed()
    const cocaRooms = Array.from({length: 10}, (_, i) => `Coca ${i + 1}`)
    const pepsiRooms = Array.from({length: 10}, (_, i) => `Pepsi ${i + 1}`)
    const allRooms = [...cocaRooms, ...pepsiRooms]

    allRooms.forEach(function (room, index) {
        bookARoom.nameRoom(index, room)
    });
}