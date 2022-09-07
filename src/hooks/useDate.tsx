import dayjs from "dayjs"
 const useDate = () =>{
    const findMonth=(date:string) => {
        return dayjs(date).format('MM')
    }
     const findDay=(date:string) => {
         return dayjs(date).format('YYYY-MM-DD')
     }
    const findToday=(date:string) => {
        const tempDayValue = dayjs(date).day()
        switch (tempDayValue){
            case 1 :
                return '周一'
                break;
            case 2 :
                return '周二'
                break;
            case 3 :
                return '周三'
                break;
            case 4 :
                return '周四'
                break;
            case 5 :
                return '周五'
                break;
            case 6 :
                return '周六'
                break;
            case 0 :
                return '周日'
                break;

        }
    }
    return {findToday,findMonth,findDay};
}
export {useDate};