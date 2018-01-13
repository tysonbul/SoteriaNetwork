from time import time
import json
import hashlib
from urllib.parse import urlparse
import requests


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


    def new_transaction(self, msg):

        self.current_transactions.append({
            'msg': msg
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

    # Return the chain of transactions from a current index
    def chain_since_index(self, index):
        return {"msgs" : [item for sublist in self.chain[index:] for item in sublist['transactions']], "new_index" : self.last_block['index'] }


    # get current index of chain
    @property
    def curr_chain_index(self):
        return self.last_block['index']

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


    # Determine if a given blockchain is valid
    def valid_chain(self, chain):

        last_block = chain[0]
        current_index = 1

        while current_index < len(chain):
            block = chain[current_index]
            print(f'{last_block}')
            print(f'{block}')
            print("\n-----------\n")
            # Check that the hash of the block is correct
            if block['previous_hash'] != self.hash(last_block):
                return False

            # Check that the Proof of Work is correct
            if not self.valid_proof(last_block['proof'], block['proof']):
                return False

            last_block = block
            current_index += 1

        return True


    # This is our Consensus Algorithm, it resolves conflicts
    # by replacing our chain with the longest one in the network.
    def resolve_conflicts(self):

        neighbours = self.nodes
        new_chain = None

        # We're only looking for chains longer than ours
        max_length = len(self.chain)

        # Grab and verify the chains from all the nodes in our network
        for node in neighbours:
            response = requests.get(f'http://{node}/chain')

            if response.status_code == 200:
                length = response.json()['length']
                chain = response.json()['chain']

                # Check if the length is longer and the chain is valid
                if length > max_length and self.valid_chain(chain):
                    max_length = length
                    new_chain = chain

        # Replace our chain if we discovered a new, valid chain longer than ours
        if new_chain:
            self.chain = new_chain
            return True

        return False