import {Signer} from "ethers";
import BookARoomContract from "./BookARoomContract";

class ContractFactory {
    private etherSigner: Signer;
    private bookARoom: BookARoomContract;

    constructor(etherSigner: Signer) {
        this.etherSigner = etherSigner
        this.bookARoom = new BookARoomContract(etherSigner)
    }

    getBookARoomContract(): BookARoomContract {
        return this.bookARoom
    }

}

export default ContractFactory
