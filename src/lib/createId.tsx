let id:number = parseInt(window.localStorage.getItem('idMAX') || '0');
let recordId:number = parseInt(window.localStorage.getItem('recordIdMAX') || '0');
const createId = () => {
    id += 1;
    window.localStorage.setItem('idMAX',id.toString())
    console.log(id)
    return id;
}
const createRecordId = () => {
    recordId+=1;
    window.localStorage.setItem('recordIdMAX',recordId.toString())
    return recordId;
}
export {createId,createRecordId};