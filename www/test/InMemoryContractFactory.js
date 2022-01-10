import {hexlify} from "ethers/lib/utils";
import InMemoryBookARoomContract from "./InMemoryBookARoomContract";

class InMemoryContractFactory {

    constructor() {
        this.etherSigner = hexlify(10)
        this.bookARoom = new InMemoryBookARoomContract(this.etherSigner)
    }

    getBookARoomContract() {
        return this.bookARoom
    }

}

export default InMemoryContractFactory
