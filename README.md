# SoteriaNetwork
Soteria brings the latest and greatest in block chain communication. Communication networks such as email are centralized and provide no real guarantee that no one is reading and monitoring your communications. We plan to address that problem as well as preventing unsolicited emails. Soteria provides a full agreeance communication protocol with built-in encryption and message storage on the blockchain. Built as our submission for the NW Hacks Hackathon 2018.


## Inspiration
With the excitement of blockchain and the ever growing concerns regarding privacy, we wanted to disrupt one of the largest technology standards yet: Email. Email accounts are mostly centralized and contain highly valuable data, making one small breach, or corrupt act can serious jeopardize millions of people. The solution, lies with the blockchain. Providing encryption and anonymity, with no chance of anyone but you reading your email. 

Our technology is named after Soteria, the goddess of safety and salvation, deliverance, and preservation from harm, which we believe perfectly represents our goals and aspirations with this project.

## What it does
First off, is the blockchain and message protocol. Similar to PGP protocol it offers _security_, and _anonymity_, while also **ensuring that messages can never be lost**. On top of that, we built a messenger application loaded with security features, such as our facial recognition access option. The only way to communicate with others is by sharing your 'address' with each other through a convenient QRCode system. This prevents anyone from obtaining a way to contact you without your **full discretion**, goodbye spam/scam email.

## How we built it
First, we built the block chain with a simple Python Flask API interface. The overall protocol is simple and can be built upon by many applications. Next, and all the remained was making an application to take advantage of the block chain. To do so, we built a React-Native mobile messenger app, with quick testing though Expo. The app features key and address generation, which then can be shared through QR codes so we implemented a scan and be scanned flow for engaging in communications, a fully consensual agreement, so that not anyone can message anyone. We then added an extra layer of security by harnessing Microsoft Azures Face API cognitive services with facial recognition. So every time the user opens the app they must scan their face for access, ensuring only the owner can view his messages, if they so desire.

## Challenges we ran into
Our biggest challenge came from the encryption/decryption process that we had to integrate into our mobile application. Since our platform was react native, running testing instances through Expo, we ran into many specific libraries which were not yet supported by the combination of Expo and React. Learning about cryptography and standard practices also played a major role and challenge as total security is hard to find.

## Accomplishments that we're proud of
We are really proud of our blockchain for its simplicity, while taking on a huge challenge. We also really like all the features we managed to pack into our app. None of us had too much React experience but we think we managed to accomplish a lot given the time. We also all came out as good friends still, which is a big plus when we all really like to be right :)

## What we learned 
Some of us developed an appreciation for React Native while the others found it frustrating to use. We also learned about security methods involving cryptography and furthered our beliefs in the power of decentralization.

## What's next for The Soteria Network
Once we have our main application built we plan to start working on the tokens and distribution. With a bit more work and adoption we will find ourselves in a very possible position to pursue an ICO. This would then enable us to further develop and enhance our protocol and messaging app. We see lots of potential in our creation and believe privacy and consensual communication is an essential factor in our ever increasingly social networking world.
