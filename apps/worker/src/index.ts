import dotenv from 'dotenv'
dotenv.config();


import { Kafka } from 'kafkajs';
import { parse } from './parser.js'; ///
import { topicName } from '@repo/common';
import { JsonObject } from '@prisma/client/runtime/library';
import { sendEmail } from './email.js';
import { sendSolana } from './solana.js';///
import { db } from './db/db.js';


const kafka = new Kafka({
    clientId:'outbox-processor',
    brokers: ["localhost:9092"]
})

async function main(){
   
    const consumer = kafka.consumer({
        groupId: "main-worker"
    })
    const producer = kafka.producer();
    await producer.connect();

    await consumer.connect();
    await consumer.subscribe({ topic:topicName,fromBeginning:true});
    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
              partition,
              offset: message.offset,
              value: message.value?.toString(),
            })
            if(!message.value?.toString()){
                return;
            }
            const parsedValue = JSON.parse(message.value?.toString());
            const zapRunId = parsedValue.zapRunId;
            const stage = parsedValue.stage;

            const zapRunDetails = await db.zapRun.findFirst({
                where:{
                    id: zapRunId
                },
                include:{
                    zap: {
                        include:{
                        actions:{
                            include:{
                                type: true
                            }
                        }
                        }
                    }
                }
            })


            const currentAction = zapRunDetails?.zap.actions.find(x => x.sortingOrder === stage); 

            if(!currentAction) return;

            const zapRunMetadata = zapRunDetails?.metadata;  //{ comment :{ email : "grabhaymishra@gmail.com"}}
            
            console.log(currentAction);

            if(currentAction.type.id === "email"){
              const body = parse((currentAction.metadata as JsonObject)?.body as string,zapRunMetadata); // you just recieved
              const to = parse((currentAction.metadata as JsonObject)?.email as string,zapRunMetadata); // {comment.email}
              console.log(`sending out email to the ${to} body is ${body}`);
              try{
                  await sendEmail(to,body);
                  console.log("Sended");
                }catch(e){
                    console.error("error in sending email : "+  e)
               }
            }

            if(currentAction.type.id === "send-sol"){  
                const amount = parse((currentAction.metadata as JsonObject)?.amount as string,zapRunMetadata); // you just recieved
                const address = parse((currentAction.metadata as JsonObject)?.address as string,zapRunMetadata); // {comment.email}
                 console.log(`sending out SOL to amount ${amount} to address ${address}`);
                 try{
                    await sendSolana(address,amount);
                    console.log("Sended")
                  }catch(e){
                      console.error("error in sending email : "+  e)
                 }
            }
             
             const lastStage = (zapRunDetails?.zap.actions.length || 1) - 1;

             if(lastStage !== stage){
                await producer.send({
                    topic:topicName,
                    messages:[{
                        value:JSON.stringify({stage: stage+1,zapRunId})
                    }]
                })
             }

             //

            await consumer.commitOffsets([{
                topic: topicName,
                partition: partition,
                offset: (parseInt(message.offset) + 1).toString() //4 -- start with 5
            }])

        },
    })


}

main(); 