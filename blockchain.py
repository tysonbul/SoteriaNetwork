from time import time
import json
import hashlib
from urllib.parse import urlparse

class Blockchain(object):
    def __init__(self):
        self.chain = []
        self.current_transactions = []

        # genesis block creation
        self.new_block(previous_hash=1, proof=100)

        # for nodes
        self.nodes = set()


    # Create a new Block in the Blockchain
    def new_block(self, proof, previous_hash=None):

        block = {
            'index'  : len(self.chain) + 1,
            'timestamp' : time(),
            'transactions' : self.current_transactions,
            'proof' : proof,
            'previous_hash' : previous_hash or self.hash(self.chain[-1])
        }


        # reset the transactions
        self.current_transactions = []

        self.chain.append(block)
        return block


    # Creates a new transaction to go into the next mined Block
    def new_transaction(self, sender, recipient, amount):

        self.current_transactions.append({
            'sender': sender,
            'recipient' : recipient,
            'amount' : amount
        })
        return self.last_block['index'] + 1

    # Hashes a Block
    @staticmethod
    def hash(block):

        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

    # Returns the last Block in the chain
    @property
    def last_block(self):
        return self.chain[-1]



    # Simple POW algorithm
    def proof_of_work(self, last_proof):

        proof = 0

        while self.valid_proof(last_proof, proof) is False:
            proof += 1

        return proof


    # Validates the Proof
    @staticmethod
    def valid_proof(last_proof, proof):

        guess = f'{last_proof}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:4] == "0000"

    # Add a new node to the list of nodes

    def register_node(self, address):
        parsed_url = urlparse(address)
        self.nodes.add(parsed_url.netloc)