import {PrismaClient} from '@prisma/client'
import { Kafka } from 'kafkajs';
import {topicName} from "@repo/common"

const client = new PrismaClient();

const kafka = new Kafka({
    clientId: "outbox-processor",
    brokers: ["localhost:9092"]
})



async function main(){
     
    const producer =kafka.producer();
    await producer.connect();


    while(1){
        const pendingRows = await client.zapRunOutBox.findMany({
            //where:{},
            take:10
        })
        if(pendingRows){
            console.log(pendingRows)
        }
        await producer.sendBatch({
            topicMessages: [
                {
                    topic: topicName,
                    messages: pendingRows.map(r => ({
                        value: JSON.stringify({zapRunId: r.zapRunId, stage: 0})
                    }))
                }
            ]
        })

        await client.zapRunOutBox.deleteMany({
            where :{
                id: {
                    in : pendingRows.map(r=>r.id)
                }
            }
        })
    }

}

main();