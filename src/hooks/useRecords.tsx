import {useEffect, useRef, useState} from "react";
import {createRecordId} from "../lib/createId";
import day from 'dayjs'
export type RecordItem = {
    tagId:number
    note:string
    category:('+'|'-')
    amount:number
    createdAt: string
    recordId:number
}
type tempRecordItem = {
    tagId:number
    note:string
    category:('+'|'-')
    amount:number
}
export const useRecords = () => {
    const [records, setRecords] = useState<RecordItem[]>([])
    const addRecord = (tempRecord:tempRecordItem) => {
        if(tempRecord.amount <= 0){return}
        if(tempRecord.tagId === 0){
            return;
        }
        const record = {...tempRecord,recordId:createRecordId(),createdAt:(day(new Date().toISOString())).format('YYYY-MM-DD')}
        setRecords([...records,record])
    };
    const findRecord = (recordId:number) => records.filter(record => record.recordId === recordId)[0]
    const deleteRecord = (id:number) => {
        setRecords(records.filter(record=>record.recordId !== id))
    }
    const updateRecord = (id:number,newCategory:('+'|'-'),newAmount:number,newNote:string) => {
        setRecords(records.map(record => {
            if(record.recordId === id){
                return {...record,
                    category:newCategory,amount:newAmount,note:newNote
                };
            }else {
                return record;
            }
        }))
    }
    useEffect(()=>{
        setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'))
    },[])
    const count = useRef(0);
    useEffect(() => {
        count.current += 1;
    })
    useEffect(()=>{
        if(count.current > 1){
            window.localStorage.setItem('records',JSON.stringify(records))
        }
    },[records])
    return{records,addRecord,findRecord,deleteRecord,updateRecord}
}